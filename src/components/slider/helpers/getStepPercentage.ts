import { TOTAL_SLIDER_PERCENTAGE } from "../constants"

export function getStepPercentage(steps: number, step: number, min: number, max: number): number{
    steps = min && max ? max - min :  steps > TOTAL_SLIDER_PERCENTAGE ? TOTAL_SLIDER_PERCENTAGE : steps
    const stepPercentage = steps ? TOTAL_SLIDER_PERCENTAGE / steps : step ? step : 1
    return stepPercentage
}