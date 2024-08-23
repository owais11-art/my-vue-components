import { onMounted } from "vue"
import { getTooltipCoordinateDistances } from "../helpers"
import type { IUseOnSliderMountedArgs, ITooltip } from "../interfaces"

export function useOnSliderMounted({ customKnob, customTooltip, customLeftTooltip, customRightTooltip, isVerticalSlider, _sliderKnob, _sliderWrapper, _rightTooltipXDistance, _rightTooltipYDistance, _leftTooltipXDistance, _leftTooltipYDistance, _knobXDistance, _knobYDistance }: IUseOnSliderMountedArgs){
    onMounted(() => {
        if(customKnob) {
            const { width: sliderKnobWidth, height: sliderKnobHeight } = _sliderKnob.value.getBoundingClientRect()
            _knobXDistance.value = isVerticalSlider ? `calc(50% - ${sliderKnobWidth/2}px)` : `-${sliderKnobWidth/2}px`
            _knobYDistance.value = isVerticalSlider ? `-${sliderKnobHeight/2}px` : `calc(50% - ${sliderKnobHeight/2}px)`
        }
        if(!customTooltip && !customRightTooltip && !customLeftTooltip) return
        const tooltips: ITooltip = {
            tooltip: customTooltip,
            leftTooltip: customLeftTooltip,
            rightTooltip: customRightTooltip
        }
        const tooltipCoodinateDistances = getTooltipCoordinateDistances(_sliderWrapper.value, isVerticalSlider, tooltips)
        _rightTooltipXDistance.value = tooltipCoodinateDistances.rightTooltipXDistance
        _rightTooltipYDistance.value = tooltipCoodinateDistances.rightTooltipYDistance
        _leftTooltipXDistance.value = tooltipCoodinateDistances.leftTooltipXDistance
        _leftTooltipYDistance.value = tooltipCoodinateDistances.leftTooltipYDistance
    })
}