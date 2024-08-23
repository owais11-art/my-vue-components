import type {ISliderWrapperDimensions} from '../interfaces'
export function getSliderWrapperDimensions(sliderWrapper: HTMLElement): ISliderWrapperDimensions{
    const { top, bottom, left, right, width, height } = sliderWrapper.querySelector('.in-slider-container')!.getBoundingClientRect()
    return { top, bottom, left, right, width, height }
}