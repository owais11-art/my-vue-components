export function getStepsCompleted(minStep: number, maxStep: number): number[]{
    const array: number[] = []
    const limit: number = maxStep - minStep
    for(let i = 0; i < limit; i++) array.push(minStep + i + 1)
    return array
}