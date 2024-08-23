import { ref } from "vue"

function extractNumbers(...args: string[]): number[]{
    return args.map(arg => parseFloat(arg))
}

export function useStepMarkerDimensions(sliderHorizontalHeight: string, sliderVerticalWidth: string, isVerticalSlider: boolean){
    const stepMarkerHorizontalHeight = ref<number>(0)
    const stepMarkerHorizontalWidth = ref<number>(0)
    const stepMarkerVerticalHeight = ref<number>(0)
    const stepMarkerVerticalWidth = ref<number>(0)
    const [ horizontalHeight, verticalWidth ] = extractNumbers(sliderHorizontalHeight, sliderVerticalWidth)
    if(isVerticalSlider){
        stepMarkerVerticalWidth.value = verticalWidth + 5
        stepMarkerVerticalHeight.value = 3
    }
    else{
        stepMarkerHorizontalHeight.value = horizontalHeight + 5
        stepMarkerHorizontalWidth.value = 3
    }

    return {
        stepMarkerHorizontalHeight,
        stepMarkerHorizontalWidth,
        stepMarkerVerticalHeight,
        stepMarkerVerticalWidth
    }
}