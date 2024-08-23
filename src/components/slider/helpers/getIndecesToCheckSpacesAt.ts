export function getIndecesToCheckSpacesAt(color: string): number[]{
    let firstIndex: number
    if(color.includes("rgba") || color.includes("RGBA")) firstIndex = 4
    else firstIndex = 3
    const secondIndex: number = firstIndex + 1
    const colorLength: number = color.length - 2
    const lastIndex: number = colorLength - 1
    const thirdIndex: number = lastIndex - 1
    return [ firstIndex, secondIndex, thirdIndex ]
}