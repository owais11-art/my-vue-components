import type { IUseEventHandlersArgs, TDocumentEvents } from "../interfaces"
import { addEventListenersToDocument, getCoordinates, getSliderWrapperDimensions, removeEventListenersFromDocument, userSelect } from "../helpers"
import { CURSORS, EMPTY_STRING } from "../constants"

export function useEventHandlers(args: IUseEventHandlersArgs){
    function updateSliderValue(){
        if(!args.range) {
            args.sliderValue.value = Math.round(args._fill.value)
            args.emit("in-change", { stepsCompleted: args._stepsCompleted.value })
        }
        else{
            if(args.isVerticalSlider) args.sliderValue.value = [100 - Math.round(args._maxRange.value), 100 - Math.round(args._minRange.value)]
            else args.sliderValue.value = [Math.round(args._minRange.value), Math.round(args._maxRange.value)]
            args.emit("in-change", {
                stepsCompleted: args._stepsCompleted.value,
                currentMinStep: args._currentMinStep.value,
                currentMaxStep: args._currentMaxStep.value
            })
        }
    }
    function fnHandleClick(e: MouseEvent){
        if(!args._knobNotPressed.value) return
        const co_ordinate: number = getCoordinates(e, args.isVerticalSlider)
        args._sliderWrapperDimensions.value = getSliderWrapperDimensions(args._sliderWrapper.value)
        args.fnSlide(co_ordinate, args._sliderWrapperDimensions.value)
        updateSliderValue()
        args.fnChangeKnobCursor(CURSORS.grab)
        args._knobNotPressed.value = false
    }
    function fnHandleContainerPressDown(){
        args.fnChangeKnobCursor(CURSORS.grabbing)
        args._knobNotPressed.value = true
    }
    function fnHandlePressDown(from: string){
        if(args.range) args._moveFrom.value = from
        userSelect('none')
        args.fnChangeKnobCursor(CURSORS.grabbing)
        args._sliderWrapperDimensions.value = getSliderWrapperDimensions(args._sliderWrapper.value)
        addEventListenersToDocument<TDocumentEvents>(
            ['mousemove', handleMoving],
            ['touchmove', handleMoving],
            ['mouseup', fnHandlePressUp],
            ['touchend', fnHandlePressUp]
        )
    }
    function fnHandlePressUp(){
        if(args.range) args._moveFrom.value = EMPTY_STRING
        userSelect('')
        args.fnChangeKnobCursor(CURSORS.grab)
        removeEventListenersFromDocument<TDocumentEvents>(
            ['mousemove', handleMoving],
            ['touchmove', handleMoving],
            ['mouseup', fnHandlePressUp],
            ['touchend', fnHandlePressUp]
        )
    }
    function handleMoving(e: MouseEvent | TouchEvent){
        if(e.type.includes('touch')) e.preventDefault()
        const co_ordinate = getCoordinates(e, args.isVerticalSlider)
        args.fnSlide(co_ordinate, args._sliderWrapperDimensions.value)
        updateSliderValue()
    }

    return {
        fnHandlePressDown,
        fnHandlePressUp,
        fnHandleContainerPressDown,
        fnHandleClick
    }
}