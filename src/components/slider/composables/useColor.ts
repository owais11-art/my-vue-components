import { ref } from "vue"
import { colors, DEFAULT_OPACITY, HEX_LONG_HAND_LENGTH, HEX_LENGTH_WITH_OPACITY, HEX_SHORT_HAND_LENGTH } from "../constants"
import { removeAllSpaces, formatRGBColor, convert_RGBA_to_RGB, getOpacity } from "../helpers"
import type { IShades, TReturnShade, TUseColorReturn } from "../interfaces"

export function useColor(sliderColor: string, opacity: number=DEFAULT_OPACITY, returnShade: TReturnShade="both"): TUseColorReturn{
    const colorLight = ref<string>('')
    const colorDark = ref<string>('')
    let opacityStr: string = getOpacity(opacity)
    if(sliderColor.startsWith('rgba') || sliderColor.startsWith('RGBA')){
        sliderColor = formatRGBColor(sliderColor)
        const [ colorRGB, colorOpacity ] = convert_RGBA_to_RGB(sliderColor)
        opacityStr = getOpacity(colorOpacity)
        const color = colors.find(item => removeAllSpaces(item.rgb.toLowerCase()) === colorRGB)!
        colorDark.value = color.hex
        colorLight.value = `${color.hex}${opacityStr}`
    }else if(sliderColor.startsWith('rgb') || sliderColor.startsWith('RGB')){
        sliderColor = formatRGBColor(sliderColor)
        sliderColor = (!sliderColor.includes(",") && sliderColor.includes(" ")) ? sliderColor.split(" ").join(",") : sliderColor
        const color = colors.find(item => removeAllSpaces(item.rgb.toLowerCase()) === removeAllSpaces(sliderColor.toLowerCase()))!
        colorDark.value = color.hex
        colorLight.value = `${color.hex}${opacityStr}`
    } else if(!sliderColor.startsWith('#')){
        const color = colors.find(item => item.name.toLowerCase() === sliderColor.toLowerCase())!
        colorDark.value = color.hex
        colorLight.value = `${color.hex}${opacityStr}`
    } else if(sliderColor.startsWith('#') && sliderColor.length === HEX_SHORT_HAND_LENGTH){
        sliderColor = '#' + sliderColor.slice(1).split('').map(el => `${el}${el}`).join('')
        colorDark.value = sliderColor
        colorLight.value = `${sliderColor}${opacityStr}`
    }else if(sliderColor.startsWith('#')){
        colorDark.value = sliderColor.length === HEX_LONG_HAND_LENGTH ? sliderColor : sliderColor.slice(0, sliderColor.length-2)
        colorLight.value = sliderColor.length === HEX_LENGTH_WITH_OPACITY ? sliderColor : `${sliderColor}${opacityStr}`
    }
    const shades: IShades = {
        both: [ colorLight, colorDark ],
        light: colorLight,
        dark: colorDark
    }

    return shades[returnShade]
}
