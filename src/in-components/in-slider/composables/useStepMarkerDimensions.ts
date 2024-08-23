import { ref } from "vue"
import type { IUseStepMarkerDimensionsReturn } from "../interfaces"

function extractNumbers(...args: string[]): number[]{
    return args.map(arg => parseFloat(arg))
}

export function useStepMarkerDimensions(sliderHorizontalHeight: string, sliderVerticalWidth: string, isVerticalSlider: boolean): IUseStepMarkerDimensionsReturn{
    const _stepMarkerHorizontalHeight = ref<number>(0)
    const _stepMarkerHorizontalWidth = ref<number>(0)
    const _stepMarkerVerticalHeight = ref<number>(0)
    const _stepMarkerVerticalWidth = ref<number>(0)
    const [ horizontalHeight, verticalWidth ] = extractNumbers(sliderHorizontalHeight, sliderVerticalWidth)
    if(isVerticalSlider){
        _stepMarkerVerticalWidth.value = verticalWidth + 5
        _stepMarkerVerticalHeight.value = 3
    }
    else{
        _stepMarkerHorizontalHeight.value = horizontalHeight + 5
        _stepMarkerHorizontalWidth.value = 3
    }

    return {
        _stepMarkerHorizontalHeight,
        _stepMarkerHorizontalWidth,
        _stepMarkerVerticalHeight,
        _stepMarkerVerticalWidth
    }
}