import { HEX_LENGTH_WITH_OPACITY, HEX_LONG_HAND_LENGTH, HEX_SHORT_HAND_LENGTH } from "../constants"
import type { TReturnShade } from "../interfaces"

export function getShadeArg(color: string, opacity: string): TReturnShade{
    if(
        !color ||
        (color.startsWith('#') && color.length === HEX_LENGTH_WITH_OPACITY) ||
        (color.startsWith('#') && 
        (color.length === HEX_LONG_HAND_LENGTH || color.length === HEX_SHORT_HAND_LENGTH) && opacity) ||
        (color.startsWith('rgba') || color.startsWith('RGBA')) ||
        (!color.startsWith('#') && opacity)

    ) return 'light'
    else if(
        ((color.startsWith('rgb') || color.startsWith('RGB')) && !opacity) ||
        (!color.startsWith('#') && !opacity) ||
        (color.startsWith('#') && 
        ((color.length === HEX_LONG_HAND_LENGTH || color.length === HEX_SHORT_HAND_LENGTH) && !opacity))
    ) return 'dark'

    return 'both'
}