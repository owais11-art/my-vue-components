import { onUpdated, ref, type ModelRef, type Ref } from "vue"
import type { TRangeValues, IUseSliderReturn, ISliderWrapperDimensions, TTriggerEvents } from "../interfaces"
import { TOTAL_SLIDER_PERCENTAGE } from "../constants"
import { getFillPercentage, triggerEvents, calculateStepsCompleted, getMinAndMax, getStepsCompleted } from "../helpers"

export function useSlider(_sliderValue: ModelRef<number | TRangeValues>, stepPercentage: number, isVerticalSlider: boolean, direction: string, _leftKnob: Ref<HTMLElement>, _rightKnob: Ref<HTMLElement>, range: boolean, strict: boolean, _moveFrom: Ref<string>): IUseSliderReturn{
    const isReverseSlider: boolean = ['rtl', 'btt'].includes(direction)

    const _fill = ref<number>(0)
    const _stepsCompleted = ref<number | number[]>(0)

    // States for Range Slider only👇🏻

    const _min = ref<number>(0)
    const _max = ref<number>(0)
    const _currentMinStep = ref<number>(0)
    const _currentMaxStep = ref<number>(0)

    // Functions for Range Slider👇🏻

    function moveMinKnobTo(fillPercentage: number){
        _currentMinStep.value = calculateStepsCompleted(fillPercentage, stepPercentage)
        _min.value = _currentMinStep.value * stepPercentage
        _fill.value = Math.abs(_max.value - _min.value)
        _stepsCompleted.value = getStepsCompleted(_currentMinStep.value, _currentMaxStep.value)
    }

    function moveMaxKnobTo(fillPercentage: number){
        _currentMaxStep.value = calculateStepsCompleted(fillPercentage, stepPercentage)
        _max.value = _currentMaxStep.value * stepPercentage
        _fill.value = Math.abs(_max.value - _min.value)
        _stepsCompleted.value = getStepsCompleted(_currentMinStep.value, _currentMaxStep.value)
    }

    function slideRangeSliderByClick(fillPercentage: number){
        if(fillPercentage < _min.value) moveMinKnobTo(fillPercentage)
        else if(fillPercentage > _max.value) moveMaxKnobTo(fillPercentage)
        else if(fillPercentage > _min.value && fillPercentage < _max.value){
            const leftDistance = Math.round(fillPercentage) - _min.value
            const rightDistance = _max.value - Math.round(fillPercentage)
            if(rightDistance <= leftDistance) moveMaxKnobTo(fillPercentage)
            else moveMinKnobTo(fillPercentage)
        }
    }

    function slideRangeSliderFromRightOrBottom(fillPercentage: number){
        if(fillPercentage > 99) _max.value = TOTAL_SLIDER_PERCENTAGE
        else if(fillPercentage <= _min.value){
            _max.value = _min.value
            _currentMaxStep.value = _currentMinStep.value
            if(strict) return
            triggerEvents<TTriggerEvents>(['mouseup', _rightKnob.value], ['mousedown', _leftKnob.value])
        }
        else moveMaxKnobTo(fillPercentage)
    }

    function slideRangeSliderFromLeftOrTop(fillPercentage: number){
        if(fillPercentage < 1) _min.value = 0
        else if(fillPercentage >= _max.value){
            _min.value = _max.value
            _currentMinStep.value = _currentMaxStep.value
            if(strict) return
            triggerEvents<TTriggerEvents>(['mouseup', _leftKnob.value], ['mousedown', _rightKnob.value])
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
        getMoveFromFunction(_moveFrom.value)(fillPercentage)
    }

    // End of functions for Range Slider👆🏻

    function slideSlider(fillPercentage: number, fromOnUpdatedHook: boolean=false){
        _stepsCompleted.value = calculateStepsCompleted(fillPercentage, stepPercentage)
        const fillValue: number = _stepsCompleted.value * stepPercentage
        if(isReverseSlider && !fromOnUpdatedHook) _fill.value = TOTAL_SLIDER_PERCENTAGE - fillValue
        else _fill.value = fillValue
    }

    function fnSlide(co_ordinate: number, sliderWrapperDimensions: ISliderWrapperDimensions){
        const { top, bottom, left, right, width, height } = sliderWrapperDimensions
        const fillPercentage: number = isVerticalSlider ? getFillPercentage((co_ordinate-top), height) : getFillPercentage((co_ordinate-left), width)
        const returnCondition: boolean = isVerticalSlider ? (co_ordinate<top || co_ordinate>bottom) : (co_ordinate<left || co_ordinate>right)
        if(returnCondition) return
        if(range) slideRangeSlider(fillPercentage)
        else slideSlider(fillPercentage)
    }

    function __initSlider(){
        _stepsCompleted.value = calculateStepsCompleted(_sliderValue.value as number, stepPercentage)
        _fill.value = _stepsCompleted.value * stepPercentage
    }

    function __initRangeSlider(){
        const [minValue, maxValue] = getMinAndMax(..._sliderValue.value as TRangeValues, isVerticalSlider)
        _min.value = minValue
        _max.value = maxValue
        _currentMinStep.value = calculateStepsCompleted(_min.value, stepPercentage)
        _currentMaxStep.value = calculateStepsCompleted(_max.value, stepPercentage)
        _fill.value = Math.abs(_max.value - _min.value)
        _stepsCompleted.value = getStepsCompleted(_currentMinStep.value, _currentMaxStep.value)
    }
    if(range) __initRangeSlider()
    else __initSlider()

    onUpdated(() => {
        if(!range) slideSlider(_sliderValue.value as number, true)
        else{
            const [minValue, maxValue] = getMinAndMax(..._sliderValue.value as TRangeValues, isVerticalSlider)
            moveMinKnobTo(minValue)
            moveMaxKnobTo(maxValue)
        }
    })

    return {
        _fill,
        _stepsCompleted,
        _min,
        _max,
        _currentMinStep,
        _currentMaxStep,
        fnSlide
    }
}