import type { TUseCustomKnobNameReturn } from "../interfaces"

export function useCustomKnobName(customRightKnob: boolean, customLeftKnob: boolean): TUseCustomKnobNameReturn{
    return function (knob: string='right'): string{
        if(knob === 'right' && customRightKnob) return 'customRightKnob'
        else if(knob === 'left' && customLeftKnob) return 'customLeftKnob'
        return 'customKnob'
    }
}