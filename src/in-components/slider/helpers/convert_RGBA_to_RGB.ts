export function convert_RGBA_to_RGB(color: string): [string, number]{
    color = color.split("(")[1]
    color = color.slice(0, color.length-1)
    const [r, g, b, a] = color.includes(",") ?
                            color.split(",") :
                            color.split(" ")
    const rgb = `rgb(${r.trim()},${g.trim()},${b.trim()})`
    return [ rgb, Number(a.trim()) * 100 ]
}