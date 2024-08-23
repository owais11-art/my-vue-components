import type { IGetTooltipCoordinateDistancesReturn, ITooltip } from "../interfaces"

function computeCoordinates(el: HTMLElement, isVerticalSlider: boolean){
    const { width, height } = el.getBoundingClientRect()
    const x: string = !isVerticalSlider ? `calc(50% - ${width/2}px)` : `-${width+10}px`
    const y: string = !isVerticalSlider ? `-${height+10}px` : `calc(50% - ${height/2}px)`
    return {x, y}
}

export function getTooltipCoordinateDistances(sliderWrapper: HTMLElement, isVerticalSlider: boolean, { tooltip, leftTooltip, rightTooltip }: ITooltip): IGetTooltipCoordinateDistancesReturn{
    const leftTooltipEl = sliderWrapper.querySelector('.tooltip.left-tooltip') as HTMLElement
    const rightTooltipEl = sliderWrapper.querySelector('.tooltip.right-tooltip') as HTMLElement
    let rightTooltipXDistance: string = ''
    let rightTooltipYDistance: string = ''
    let leftTooltipXDistance: string = ''
    let leftTooltipYDistance: string = ''

    function updateRightTooltipDistance(x: string, y: string){
        rightTooltipXDistance = x
        rightTooltipYDistance = y
    }
    function updateLeftTooltipDistance(x: string, y: string){
        leftTooltipXDistance = x
        leftTooltipYDistance = y
    }
    if(rightTooltip || tooltip){
        const { x, y } = computeCoordinates(rightTooltipEl, isVerticalSlider)
        updateRightTooltipDistance(x, y)
        if(!leftTooltip) updateLeftTooltipDistance(x, y)
    }
    if(leftTooltip){
        const { x, y } = computeCoordinates(leftTooltipEl, isVerticalSlider)
        updateLeftTooltipDistance(x, y)
    }

    return {
        rightTooltipXDistance,
        rightTooltipYDistance,
        leftTooltipXDistance,
        leftTooltipYDistance
    }
}