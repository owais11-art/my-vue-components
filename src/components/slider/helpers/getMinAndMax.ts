import type { TRangeValues } from "../interfaces"
import { TOTAL_SLIDER_PERCENTAGE } from "../constants"
export function getMinAndMax(min: number, max: number, isVerticalSlider: boolean): TRangeValues{
    if(isVerticalSlider) [min, max] = [TOTAL_SLIDER_PERCENTAGE - max, TOTAL_SLIDER_PERCENTAGE - min]
    return [min, max]
}