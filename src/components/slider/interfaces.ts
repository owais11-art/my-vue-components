import type { ComputedRef, ModelRef, Ref } from "vue"

export interface IRangeSliderProps{
    name?: string
    step?: number
    steps?: number,
    stepMarkers?: boolean,
    orientation?: string,
    knobXDistance?: string,
    knobYDistance?: string,
    isVerticalSlider?: boolean,
    tooltip?: boolean,
    rightKnobStyles?: IStyles,
    leftKnobStyles?: IStyles,
    rightTooltipStyles?: IStyles,
    leftTooltipStyles?: IStyles,
    strict?: boolean
}

export interface ISliderProps{
    name?: string,
    color?: string,
    trackColor?: string,
    trackColorOpacity?: number | string,
    fillColor?: string,
    knobColor?: string,
    steps?: number,
    step?: number,
    stepMarkers?: boolean,
    stepMarkerColor?: string;
    direction?: string,
    orientation?: string,
    range?: boolean,
    tooltip?: boolean,
    sliderHeightHorizontal?: string,
    sliderWidthHorizontal?: string,
    sliderHeightVertical?: string,
    sliderWidthVertical?: string
    sliderCorners?: string,
    min?: number,
    max?: number,
    knobStyles?: IStyles,
    rightKnobStyles?: IStyles,
    leftKnobStyles?: IStyles,
    tooltipStyles?: IStyles,
    rightTooltipStyles?: IStyles,
    leftTooltipStyles?: IStyles,
    strict?: boolean
}

export interface ISliderWrapperDimensions{
    top: number,
    bottom: number,
    left: number,
    right: number,
    width: number,
    height: number
}

export interface IUseSliderReturn{
    fill: Ref<number>,
    stepsCompleted: Ref<number | number[]>,
    min: Ref<number>,
    max: Ref<number>,
    currentMinStep: Ref<number>,
    currentMaxStep: Ref<number>
    slide: TSlide
}

export interface IUseEventHandlersArgs{
    sliderValue: ModelRef<number |TRangeValues>,
    fill: Ref<number>,
    stepsCompleted: Ref<number | number[]>,
    minRange: Ref<number>,
    maxRange: Ref<number>,
    currentMinStep: Ref<number>,
    currentMaxStep: Ref<number>,
    knobNotPressed: Ref<boolean>,
    moveFrom: Ref<string>,
    sliderWrapper: Ref<HTMLElement>,
    sliderWrapperDimensions: Ref<ISliderWrapperDimensions>,
    range: boolean,
    isVerticalSlider: boolean,
    emit: IEmit,
    slide: TSlide,
    changeKnobCursor: TChangeKnobCursor
}

export interface IStepSliderPayload{
    stepsCompleted: number,
    currentStep: number
}

export interface IStepRangeSliderPayload{
    minStep: number,
    maxStep: number,
    completedStepsList: number[],
    // Getters
    stepsCompleted: number
}

export interface IStyles{
    [key: string]: string
}

export interface ITooltip{
    tooltip: boolean,
    leftTooltip: boolean,
    rightTooltip: boolean
}

export interface IGetTooltipCoordinateDistancesReturn{
    rightTooltipXDistance: string,
    rightTooltipYDistance: string,
    leftTooltipXDistance: string,
    leftTooltipYDistance: string
}

export interface IPayload{
    stepsCompleted: number[] | number,
    currentMinStep?: number,
    currentMaxStep?: number
}

export interface IEmit{
    (e: 'in-change', payload: IPayload): void
}

export interface IUseOnSliderMountedArgs{
    customKnob: boolean,
    customTooltip: boolean,
    customLeftTooltip: boolean,
    customRightTooltip: boolean,
    isVerticalSlider: boolean,
    sliderKnob: Ref<HTMLElement>,
    sliderWrapper: Ref<HTMLElement>,
    rightTooltipXDistance: Ref<string>,
    rightTooltipYDistance: Ref<string>,
    leftTooltipXDistance: Ref<string>,
    leftTooltipYDistance: Ref<string>,
    knobXDistance: Ref<string>,
    knobYDistance: Ref<string>,
}
export interface IShades{
    both: TUseColorListReturn,
    light: TUseColorValueReturn,
    dark: TUseColorValueReturn
}

export type TUseColorListReturn = [Ref<string>, Ref<string>]
export type TUseColorValueReturn = Ref<string>
export type TReturnShade = "light" | "dark" | "both"
export type TUseColorReturn = [Ref<string>, Ref<string>] | Ref<string>
export type TSlide = (co_ordinate: number, sliderWrapperDimensions: ISliderWrapperDimensions) => void
export type TChangeKnobCursor = (cursorValue: string) => void
export type TUseCursorReturn = [Ref<string>, TChangeKnobCursor]
export type TUseCustomKnobNameReturn = (knob?: string) => string
export type TUseTooltipValueReturn = (tooltip?: string) => number

export type TRangeValues = [number, number]
export type TRangeValuesReactive = [Ref<number>, Ref<number>]

export type TDocumentMouseEvents = [string, ((e: MouseEvent) => void)|(() => void)]
export type TDocumentTouchEvents = [string, ((e: TouchEvent) => void)|(() => void)]
export type TDocumentEvents = [string, ((e: MouseEvent | TouchEvent) => void)|(() => void)]
export type TTriggerEvents = [string, HTMLElement]