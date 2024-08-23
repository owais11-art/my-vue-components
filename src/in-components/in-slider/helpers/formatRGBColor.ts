import { getIndecesToCheckSpacesAt } from "."
export function formatRGBColor(color: string): string{
    const indices = getIndecesToCheckSpacesAt(color)
    indices.forEach((index: number) => {
        if(color[index] === " ") color = color.slice(0, index) + color.slice(index + 1)
    })
    return (!color.includes(",") && color.includes(" ")) ? color.split(" ").join(",") : color
}