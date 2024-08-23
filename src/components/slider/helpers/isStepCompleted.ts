export function isStepCompleted(steps: number, step: number,stepsCompleted: number, slideDirection: string): boolean{
    if(['btt', 'rtl'].includes(slideDirection)) return step >= steps - stepsCompleted
    return step <= stepsCompleted
}

export function isStepBetweenRange(step: number, min: number, max: number): boolean{
    return (step >= min && step < max)
}