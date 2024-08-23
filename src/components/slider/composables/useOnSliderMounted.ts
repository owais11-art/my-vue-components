import { onMounted } from "vue"
import { getTooltipCoordinateDistances } from "../helpers"
import type { IUseOnSliderMountedArgs, ITooltip } from "../interfaces"

export function useOnSliderMounted({ customKnob, customTooltip, customLeftTooltip, customRightTooltip, isVerticalSlider, sliderKnob, sliderWrapper, rightTooltipXDistance, rightTooltipYDistance, leftTooltipXDistance, leftTooltipYDistance, knobXDistance, knobYDistance }: IUseOnSliderMountedArgs){
    onMounted(() => {
        if(customKnob) {
            const { width: sliderKnobWidth, height: sliderKnobHeight } = sliderKnob.value.getBoundingClientRect()
            knobXDistance.value = isVerticalSlider ? `calc(50% - ${sliderKnobWidth/2}px)` : `-${sliderKnobWidth/2}px`
            knobYDistance.value = isVerticalSlider ? `-${sliderKnobHeight/2}px` : `calc(50% - ${sliderKnobHeight/2}px)`
        }
        if(!customTooltip && !customRightTooltip && !customLeftTooltip) return
        const tooltips: ITooltip = {
            tooltip: customTooltip,
            leftTooltip: customLeftTooltip,
            rightTooltip: customRightTooltip
        }
        const tooltipCoodinateDistances = getTooltipCoordinateDistances(sliderWrapper.value, isVerticalSlider, tooltips)
        rightTooltipXDistance.value = tooltipCoodinateDistances.rightTooltipXDistance
        rightTooltipYDistance.value = tooltipCoodinateDistances.rightTooltipYDistance
        leftTooltipXDistance.value = tooltipCoodinateDistances.leftTooltipXDistance
        leftTooltipYDistance.value = tooltipCoodinateDistances.leftTooltipYDistance
    })
}