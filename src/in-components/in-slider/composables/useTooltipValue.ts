import type { ModelRef, Ref } from "vue"
import { TOTAL_SLIDER_PERCENTAGE } from "../constants"
import type { TRangeValues, TUseTooltipValueReturn } from "../interfaces"
export function useTooltipValue(_sliderValue: ModelRef<number | TRangeValues>, minRange: Ref<number>, maxRange: Ref<number>, stepsCompleted: Ref<number | number[]>, min: number, max: number, range: boolean, isVerticalSlider: boolean): TUseTooltipValueReturn{
    return function (tooltip: string="right"): number{
        if(!range) return min && max ? min + (stepsCompleted.value as number): _sliderValue.value as number

        if(tooltip === 'left') return isVerticalSlider ? TOTAL_SLIDER_PERCENTAGE - minRange.value :  minRange.value

        return isVerticalSlider ? TOTAL_SLIDER_PERCENTAGE - maxRange.value :  maxRange.value
    }
}