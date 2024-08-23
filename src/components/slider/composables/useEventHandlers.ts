import type { IUseEventHandlersArgs, TDocumentEvents } from "../interfaces"
import { addEventListenersToDocument, getCoordinates, getSliderWrapperDimensions, removeEventListenersFromDocument, userSelect } from "../helpers"
import { CURSORS, EMPTY_STRING } from "../constants"

export function useEventHandlers(args: IUseEventHandlersArgs){
    function updateSliderValue(){
        if(!args.range) {
            args.sliderValue.value = Math.round(args.fill.value)
            args.emit("in-change", { stepsCompleted: args.stepsCompleted.value })
        }
        else{
            if(args.isVerticalSlider) args.sliderValue.value = [100 - Math.round(args.maxRange.value), 100 - Math.round(args.minRange.value)]
            else args.sliderValue.value = [Math.round(args.minRange.value), Math.round(args.maxRange.value)]
            args.emit("in-change", {
                stepsCompleted: args.stepsCompleted.value,
                currentMinStep: args.currentMinStep.value,
                currentMaxStep: args.currentMaxStep.value
            })
        }
    }
    function handleClick(e: MouseEvent){
        if(!args.knobNotPressed.value) return
        const co_ordinate: number = getCoordinates(e, args.isVerticalSlider)
        args.sliderWrapperDimensions.value = getSliderWrapperDimensions(args.sliderWrapper.value)
        args.slide(co_ordinate, args.sliderWrapperDimensions.value)
        updateSliderValue()
        args.changeKnobCursor(CURSORS.grab)
        args.knobNotPressed.value = false
    }
    function handleContainerPressDown(){
        args.changeKnobCursor(CURSORS.grabbing)
        args.knobNotPressed.value = true
    }
    function handlePressDown(from: string){
        if(args.range) args.moveFrom.value = from
        userSelect('none')
        args.changeKnobCursor(CURSORS.grabbing)
        args.sliderWrapperDimensions.value = getSliderWrapperDimensions(args.sliderWrapper.value)
        addEventListenersToDocument<TDocumentEvents>(
            ['mousemove', handleMoving],
            ['touchmove', handleMoving],
            ['mouseup', handlePressUp],
            ['touchend', handlePressUp]
        )
    }
    function handlePressUp(){
        if(args.range) args.moveFrom.value = EMPTY_STRING
        userSelect('')
        args.changeKnobCursor(CURSORS.grab)
        removeEventListenersFromDocument<TDocumentEvents>(
            ['mousemove', handleMoving],
            ['touchmove', handleMoving],
            ['mouseup', handlePressUp],
            ['touchend', handlePressUp]
        )
    }
    function handleMoving(e: MouseEvent | TouchEvent){
        if(e.type.includes('touch')) e.preventDefault()
        const co_ordinate = getCoordinates(e, args.isVerticalSlider)
        args.slide(co_ordinate, args.sliderWrapperDimensions.value)
        updateSliderValue()
    }

    return {
        handlePressDown,
        handlePressUp,
        handleContainerPressDown,
        handleClick
    }
}