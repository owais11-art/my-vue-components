import { onUpdated, ref, type ModelRef, type Ref } from "vue"
import type { TRangeValues, IUseSliderReturn, ISliderWrapperDimensions, TTriggerEvents } from "../interfaces"
import { TOTAL_SLIDER_PERCENTAGE } from "../constants"
import { getFillPercentage, triggerEvents, calculateStepsCompleted, getMinAndMax, getStepsCompleted } from "../helpers"

export function useSlider(sliderValue: ModelRef<number | TRangeValues>, stepPercentage: number, isVerticalSlider: boolean, direction: string, leftKnob: Ref<HTMLElement>, rightKnob: Ref<HTMLElement>, range: boolean, strict: boolean, moveFrom: Ref<string>): IUseSliderReturn{
    const isReverseSlider: boolean = ['rtl', 'btt'].includes(direction)

    const fill = ref<number>(0)
    const stepsCompleted = ref<number | number[]>(0)

    // States for Range Slider only👇🏻

    const min = ref<number>(0)
    const max = ref<number>(0)
    const currentMinStep = ref<number>(0)
    const currentMaxStep = ref<number>(0)

    // Functions for Range Slider👇🏻

    function moveMinKnobTo(fillPercentage: number){
        currentMinStep.value = calculateStepsCompleted(fillPercentage, stepPercentage)
        min.value = currentMinStep.value * stepPercentage
        fill.value = Math.abs(max.value - min.value)
        stepsCompleted.value = getStepsCompleted(currentMinStep.value, currentMaxStep.value)
    }

    function moveMaxKnobTo(fillPercentage: number){
        currentMaxStep.value = calculateStepsCompleted(fillPercentage, stepPercentage)
        max.value = currentMaxStep.value * stepPercentage
        fill.value = Math.abs(max.value - min.value)
        stepsCompleted.value = getStepsCompleted(currentMinStep.value, currentMaxStep.value)
    }

    function slideRangeSliderByClick(fillPercentage: number){
        if(fillPercentage < min.value) moveMinKnobTo(fillPercentage)
        else if(fillPercentage > max.value) moveMaxKnobTo(fillPercentage)
        else if(fillPercentage > min.value && fillPercentage < max.value){
            const leftDistance = Math.round(fillPercentage) - min.value
            const rightDistance = max.value - Math.round(fillPercentage)
            if(rightDistance <= leftDistance) moveMaxKnobTo(fillPercentage)
            else moveMinKnobTo(fillPercentage)
        }
    }

    function slideRangeSliderFromRightOrBottom(fillPercentage: number){
        if(fillPercentage > 99) max.value = TOTAL_SLIDER_PERCENTAGE
        else if(fillPercentage <= min.value){
            max.value = min.value
            currentMaxStep.value = currentMinStep.value
            if(strict) return
            triggerEvents<TTriggerEvents>(['mouseup', rightKnob.value], ['mousedown', leftKnob.value])
        }
        else moveMaxKnobTo(fillPercentage)
    }

    function slideRangeSliderFromLeftOrTop(fillPercentage: number){
        if(fillPercentage < 1) min.value = 0
        else if(fillPercentage >= max.value){
            min.value = max.value
            currentMinStep.value = currentMaxStep.value
            if(strict) return
            triggerEvents<TTriggerEvents>(['mouseup', leftKnob.value], ['mousedown', rightKnob.value])
        }
        else moveMinKnobTo(fillPercentage)
    }

    function getMoveFromFunction(moveFrom: string): (fillPercentage: number) => void{
        const rightOrBottom: boolean = moveFrom === 'right' || moveFrom === 'bottom'
        const leftOrTop: boolean = moveFrom === 'left' || moveFrom === 'top'
        if(rightOrBottom) return slideRangeSliderFromRightOrBottom
        if(leftOrTop) return slideRangeSliderFromLeftOrTop
        return slideRangeSliderByClick
    }

    function slideRangeSlider(fillPercentage: number){
        getMoveFromFunction(moveFrom.value)(fillPercentage)
    }

    // End of functions for Range Slider👆🏻

    function slideSlider(fillPercentage: number, fromOnUpdatedHook: boolean=false){
        stepsCompleted.value = calculateStepsCompleted(fillPercentage, stepPercentage)
        const fillValue: number = stepsCompleted.value * stepPercentage
        if(isReverseSlider && !fromOnUpdatedHook) fill.value = TOTAL_SLIDER_PERCENTAGE - fillValue
        else fill.value = fillValue
    }

    function slide(co_ordinate: number, sliderWrapperDimensions: ISliderWrapperDimensions){
        const { top, bottom, left, right, width, height } = sliderWrapperDimensions
        const fillPercentage: number = isVerticalSlider ? getFillPercentage((co_ordinate-top), height) : getFillPercentage((co_ordinate-left), width)
        const returnCondition: boolean = isVerticalSlider ? (co_ordinate<top || co_ordinate>bottom) : (co_ordinate<left || co_ordinate>right)
        if(returnCondition) return
        if(range) slideRangeSlider(fillPercentage)
        else slideSlider(fillPercentage)
    }

    function __initSlider(){
        stepsCompleted.value = calculateStepsCompleted(sliderValue.value as number, stepPercentage)
        fill.value = stepsCompleted.value * stepPercentage
    }

    function __initRangeSlider(){
        const [minValue, maxValue] = getMinAndMax(...sliderValue.value as TRangeValues, isVerticalSlider)
        min.value = minValue
        max.value = maxValue
        currentMinStep.value = calculateStepsCompleted(min.value, stepPercentage)
        currentMaxStep.value = calculateStepsCompleted(max.value, stepPercentage)
        fill.value = Math.abs(max.value - min.value)
        stepsCompleted.value = getStepsCompleted(currentMinStep.value, currentMaxStep.value)
    }
    if(range) __initRangeSlider()
    else __initSlider()

    onUpdated(() => {
        if(!range) slideSlider(sliderValue.value as number, true)
        else{
            const [minValue, maxValue] = getMinAndMax(...sliderValue.value as TRangeValues, isVerticalSlider)
            moveMinKnobTo(minValue)
            moveMaxKnobTo(maxValue)
        }
    })

    return {
        fill,
        stepsCompleted,
        min,
        max,
        currentMinStep,
        currentMaxStep,
        slide
    }
}