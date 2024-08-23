export function getCoordinates(e: MouseEvent | TouchEvent, isVerticalSlider: boolean): number{
    if(e.type.includes('touch')) {
        return isVerticalSlider ? (e as TouchEvent).targetTouches[0].clientY : (e as TouchEvent).targetTouches[0].clientX
    }
    return isVerticalSlider ? (e as MouseEvent).clientY : (e as MouseEvent).clientX
}