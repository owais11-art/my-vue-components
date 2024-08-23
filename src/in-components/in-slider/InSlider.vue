<script setup lang="ts">
    import { ref, useSlots } from 'vue'
    import type { ModelRef } from 'vue'
    import { CURSORS, DEFAULT_OPACITY, TOTAL_SLIDER_PERCENTAGE, slideDirections } from './constants'
    import type { ISliderProps, ISliderWrapperDimensions, TRangeValues,  IEmit, TUseColorValueReturn, TUseColorListReturn, TReturnShade } from './interfaces'
    import { useSlider, useColor, useOnSliderMounted, useCursor, useCustomKnobName, useEventHandlers, useTooltipValue, useStepMarkerDimensions } from './composables'
    import { isStepBetweenRange, isStepCompleted, getStepPercentage, getShadeArg } from './helpers'

    /*
        Note:

        👉🏻 Identifiers starting with "_" represents reactive states of any reactive type like 
            Ref, ComputedRef, ModelRef etc.

        👉🏻 Identifiers starting with "use" are composables.

        👉🏻 Identifiers starting with "fn" are functions returned from composables.
    */
    
    const props = withDefaults(defineProps<ISliderProps>(), {
        color: "#41B883",
        trackColor: "",
        trackColorOpacity: '',
        fillColor: "",
        knobColor: "",
        steps: 0,
        step: 0,
        stepMarkers: false,
        stepMarkerColor: "",
        direction: "default",
        orientation: "horizontal",
        range: false,
        tooltip: false,
        sliderHeightHorizontal: '10px',
        sliderWidthHorizontal: '90%',
        sliderHeightVertical: '400px',
        sliderWidthVertical: '10px',
        sliderCorners: 'smooth',
        min: 0,
        max: 0,
        strict: false
    })
    const emit = defineEmits<IEmit>()

    const slots = useSlots()

    // Variables👇🏻

    const sliderSteps: number = Math.round(props.min && props.max ? props.max - props.min : props.steps ? props.steps : props.step ? TOTAL_SLIDER_PERCENTAGE / props.step : 0)
    const stepPercentage: number = getStepPercentage(props.steps, props.step, props.min, props.max)
    const isVerticalSlider: boolean = props.orientation === 'vertical'
    const slideDirection = slideDirections.get(`${props.orientation}-${props.direction}`)
    const useColorArgsForStepMarkerColor: [string, number] = [props.stepMarkerColor ? props.stepMarkerColor : props.trackColor ? props.trackColor : props.color, DEFAULT_OPACITY]
    const useColorArgsForSliderTrackColor: [string, number, TReturnShade] = [props.trackColor || props.color, props.trackColorOpacity ? Number(props.trackColorOpacity) : DEFAULT_OPACITY, getShadeArg(props.trackColor, props.trackColorOpacity.toString())]
    const useColorArgsForSliderFillColor: [string, number] = [props.fillColor || props.color, DEFAULT_OPACITY]
    const useColorArgsForSliderKnobColor: [string, number] = [props.knobColor || props.color, DEFAULT_OPACITY]

    // States👇🏻

    const _sliderValue = defineModel() as ModelRef<number | TRangeValues>
    const _moveFrom = ref<string>("")
    const _sliderKnob = ref()
    const _sliderLeftKnob = ref()
    const _knobXDistance = ref<string>(isVerticalSlider ? 'calc(50% - 10px)' : '-10px')
    const _knobYDistance = ref<string>(isVerticalSlider ? '-10px' : 'calc(50% - 10px)')
    const _sliderWrapper = ref()
    const _sliderWrapperDimensions = ref<ISliderWrapperDimensions>({ top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 })
    const _knobNotPressed = ref<boolean>(false)
    const _rightTooltipXDistance = ref<string>(!isVerticalSlider ? "calc(50% - 20px)" : "-50px")
    const _rightTooltipYDistance = ref<string>(!isVerticalSlider ? "-30px" : "calc(50% - 10px)")
    const _leftTooltipXDistance = ref<string>(!isVerticalSlider ? "calc(50% - 20px)" : "-50px")
    const _leftTooltipYDistance = ref<string>(!isVerticalSlider ? "-30px" : "calc(50% - 10px)")

    // Using Composables👇🏻

    const { _fill, _stepsCompleted, _min: _minRange, _max: _maxRange, _currentMinStep, _currentMaxStep, fnSlide } = useSlider(_sliderValue, stepPercentage, isVerticalSlider, slideDirection as string, _sliderLeftKnob, _sliderKnob, props.range, props.strict, _moveFrom)
    const _sliderTrackColor = useColor(...useColorArgsForSliderTrackColor) as TUseColorValueReturn
    const [ _stepMarkLightColor, _stepMarkDarkColor ] = useColor(...useColorArgsForStepMarkerColor) as TUseColorListReturn
    const _sliderFillColor = useColor(...useColorArgsForSliderFillColor, 'dark') as TUseColorValueReturn
    const _sliderKnobColor = useColor(...useColorArgsForSliderKnobColor, 'dark') as TUseColorValueReturn
    const [ _knobCursor, fnChangeKnobCursor ] = useCursor(CURSORS.grab)
    const fnGetCustomKnobName = useCustomKnobName(Boolean(slots.customRightKnob), Boolean(slots.customLeftKnob))
    const fnGetTooltipValue = useTooltipValue(_sliderValue, _minRange, _maxRange, _stepsCompleted, props.min, props.max, props.range, isVerticalSlider)
    const { _stepMarkerHorizontalHeight, _stepMarkerHorizontalWidth, _stepMarkerVerticalHeight, _stepMarkerVerticalWidth } = useStepMarkerDimensions(props.sliderHeightHorizontal, props.sliderWidthVertical, isVerticalSlider)
    const { fnHandlePressDown, fnHandlePressUp, fnHandleContainerPressDown, fnHandleClick } = useEventHandlers({
        _sliderValue,
        _fill,
        _stepsCompleted,
        _minRange,
        _maxRange,
        _currentMinStep,
        _currentMaxStep,
        _knobNotPressed,
        _moveFrom,
        _sliderWrapper,
        _sliderWrapperDimensions,
        range: props.range,
        isVerticalSlider,
        emit,
        fnSlide,
        fnChangeKnobCursor
    })

    useOnSliderMounted({
        customKnob: Boolean(slots.customKnob),
        customTooltip: Boolean(slots.customTooltip),
        customLeftTooltip: Boolean(slots.customLeftTooltip),
        customRightTooltip: Boolean(slots.customRightTooltip),
        isVerticalSlider,
        _sliderKnob,
        _sliderWrapper,
        _rightTooltipXDistance,
        _rightTooltipYDistance,
        _leftTooltipXDistance,
        _leftTooltipYDistance,
        _knobXDistance,
        _knobYDistance
    })
</script>

<template>
    <div :class="['in-slider-wrapper', range && 'in-range-slider-wrapper', orientation, direction]" ref="_sliderWrapper">
        <div :class="['in-slider-container', range && 'in-range-slider-container']" @click="fnHandleClick" @mousedown="fnHandleContainerPressDown">
            <div class="in-step-markers" v-if="steps && stepMarkers">
                <div
                    v-for="step in steps"
                    :key="step"
                    :class="['in-step-mark', (range ? isStepBetweenRange(step, _currentMinStep, _currentMaxStep): isStepCompleted(sliderSteps, step, _stepsCompleted as number, slideDirection!)) && 'completed']"
                ></div>
            </div>
            <div :class="['in-slider-fill', range && 'in-range-slider-fill']">
                <div
                    :class="['in-slider-knob-wrapper',  isVerticalSlider ? 'in-slider-top-knob' : 'in-slider-left-knob']"
                    @mousedown.stop="() => fnHandlePressDown(isVerticalSlider ? 'top' : 'left')"
                    @mouseup.stop="fnHandlePressUp"
                    @touchstart="() => fnHandlePressDown(isVerticalSlider ? 'top' : 'left')"
                    @touchend="fnHandlePressUp"
                    @click.stop=""
                    ref="_sliderLeftKnob"
                    v-if="range"
                >
                    <slot :name="fnGetCustomKnobName('left')">
                        <div class="in-slider-knob"></div>
                    </slot>
                    <div v-if="tooltip && $slots.customLeftTooltip" class="tooltip left-tooltip">
                        <slot
                            name="customLeftTooltip"
                            :tooltip-value="fnGetTooltipValue('left')"
                        />
                    </div>
                    <div v-else-if="tooltip && $slots.customTooltip" class="tooltip left-tooltip">
                        <slot
                            name="customTooltip"
                            :tooltip-value="fnGetTooltipValue('left')"
                        />
                    </div>
                    <div class="tooltip default" :style="leftTooltipStyles" v-else-if="tooltip">{{ fnGetTooltipValue('left') }}</div>
                </div>
                <div
                    :class="['in-slider-knob-wrapper',  range && (isVerticalSlider ? 'in-slider-bottom-knob' : 'in-slider-right-knob')]"
                    @mousedown.stop="() => fnHandlePressDown(isVerticalSlider ? 'bottom' : 'right')"
                    @mouseup.stop="fnHandlePressUp"
                    @touchstart="() => fnHandlePressDown(isVerticalSlider ? 'bottom' : 'right')"
                    @touchend="fnHandlePressUp"
                    @click.stop=""
                    ref="_sliderKnob"
                >
                    <slot :name="fnGetCustomKnobName()">
                        <div class="in-slider-knob"></div>
                    </slot>
                    <div v-if="tooltip && $slots.customRightTooltip" class="tooltip right-tooltip">
                        <slot
                            name="customRightTooltip"
                            :tooltip-value="fnGetTooltipValue()"
                        />
                    </div>
                    <div v-else-if="tooltip && $slots.customTooltip" class="tooltip right-tooltip">
                        <slot
                            name="customTooltip"
                            :tooltip-value="fnGetTooltipValue()"
                        />
                    </div>
                    <div class="tooltip default" :style="rightTooltipStyles" v-else-if="tooltip">{{ fnGetTooltipValue() }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .in-slider-wrapper{
        width: 100%;
        &.vertical{
            width: max-content;
        }
    }
    .in-step-markers{
        display: flex;
        flex-direction: v-bind('isVerticalSlider ? "column" : "row"');
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;

        & .in-step-mark{
            flex-basis: v-bind('`${100/sliderSteps}%`');
            position: relative;

            &:first-child{
                border: v-bind('isVerticalSlider ? "50px 50px 0 0" : "50px 0 0 50px"');
            }
            &:last-child{
                border: v-bind('isVerticalSlider ? "0 0 50px 50px" : "0 50px 50px 0"');
            }
            &:last-child::before{
                display: none;
            }
            &::before{
                content: '';
                position: absolute;
                background-color: v-bind(_stepMarkLightColor);
                z-index: 1;
            }
            &.completed::before{
                background-color: v-bind(_stepMarkDarkColor);
            }
        }
    }

    .in-slider-wrapper.horizontal .in-step-mark::before{
        top: -2.5px;
        right: -1.5px;
        height: v-bind('`${_stepMarkerHorizontalHeight}px`');
        width: v-bind('`${_stepMarkerHorizontalWidth}px`');
    }
    .in-slider-wrapper.vertical .in-step-mark::before{
        bottom: -1.5px;
        left: -2.5px;
        height: v-bind('`${_stepMarkerVerticalHeight}px`');
        width: v-bind('`${_stepMarkerVerticalWidth}px`');
    }
    .in-slider-container{
        background-color: v-bind(_sliderTrackColor);
        border-radius: v-bind('sliderCorners === "smooth" ? "50px" : "0"');
        cursor: v-bind(_knobCursor);
        position: relative;
        & .in-slider-fill{
            border-radius: inherit;
            position: relative;
            background-color: v-bind('_sliderFillColor');
        }
    }
    .in-slider-wrapper.horizontal .in-slider-container{
        width: v-bind(sliderWidthHorizontal);
        height: v-bind(sliderHeightHorizontal);

        & .in-slider-fill{
            width: v-bind('`${_fill}%`');
            height: 100%;

            & .in-slider-knob-wrapper{
                position: absolute;
                right: v-bind(_knobXDistance);
                top: v-bind(_knobYDistance);
                cursor: v-bind(_knobCursor);
                z-index: 2;

                & .tooltip{
                    position: absolute;
                    user-select: none;
                }

                & .tooltip,
                & .tooltip.right-tooltip{
                    top: v-bind(_rightTooltipYDistance);
                    left: v-bind(_rightTooltipXDistance);
                }

                & .tooltip.left-tooltip{
                    top: v-bind(_leftTooltipYDistance);
                    left: v-bind(_leftTooltipXDistance);
                }

                & .tooltip.default{
                    width: 40px;
                    height: 20px;
                    display: grid;
                    place-items: center;
                    border-radius: 50px;
                    background-color: aquamarine;
                    color: #000;
                }
            }

            & .in-slider-knob{
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: v-bind('_sliderKnobColor');
                box-shadow: 0 0 8px v-bind('_sliderKnobColor');
            }
        }
    }
    .in-slider-wrapper.horizontal.reverse .in-slider-container{
        & .in-slider-fill{
            width: v-bind('`${_fill}%`');
            height: 100%;
            position: absolute;
            right: 0;
            top: 0;

            & .in-slider-knob-wrapper{
                position: absolute;
                left: v-bind(_knobXDistance);
                top: v-bind(_knobYDistance);
                cursor: v-bind(_knobCursor);
                width: max-content
            }

            & .in-slider-knob{
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: v-bind('_sliderKnobColor');
                box-shadow: 0 0 8px v-bind('_sliderKnobColor');
            }
        }
    }
    .in-slider-wrapper.vertical .in-slider-container{
        width: v-bind(sliderWidthVertical);
        height: v-bind(sliderHeightVertical);
        & .in-slider-fill{
            position: absolute;
            width: 100%;
            height: v-bind('`${_fill}%`');
            bottom: 0;
            left: 0;

            & .in-slider-knob-wrapper{
                position: absolute;
                cursor: v-bind(_knobCursor);
                top: v-bind(_knobYDistance);
                left: v-bind(_knobXDistance);

                & .tooltip{
                    position: absolute;
                    user-select: none;
                }

                & .tooltip,
                & .tooltip.right-tooltip{
                    top: v-bind(_rightTooltipYDistance);
                    right: v-bind(_rightTooltipXDistance);
                }

                & .tooltip.left-tooltip{
                    top: v-bind(_leftTooltipYDistance);
                    right: v-bind(_leftTooltipXDistance);
                }

                & .tooltip.default{
                    width: 40px;
                    height: 20px;
                    display: grid;
                    place-items: center;
                    border-radius: 50px;
                    background-color: aquamarine;
                    color: #000;
                }
            }

            & .in-slider-knob{
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: v-bind('_sliderKnobColor');
                box-shadow: 0 0 8px v-bind('_sliderKnobColor');
            }
        }
    }
    .in-slider-wrapper.vertical.reverse .in-slider-container{
        & .in-slider-fill{
            position: absolute;
            width: 100%;
            height: v-bind('`${_fill}%`');
            top: 0;
            left: 0;

            & .in-slider-knob-wrapper{
                position: absolute;
                width: max-content;
                height: max-content;
                cursor: v-bind(_knobCursor);
                top: calc(100% - v-bind('_knobYDistance.slice(1)'));
                left: v-bind(_knobXDistance);
            }

            & .in-slider-knob{
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: v-bind('_sliderKnobColor');
                box-shadow: 0 0 8px v-bind('_sliderKnobColor');
            }
        }
    }

    /* Range Slider Styles */

    .in-range-slider-wrapper.horizontal{
        & .in-slider-fill.in-range-slider-fill{
            width: v-bind('`${_fill}%`');
            left: v-bind('`${_minRange}%`');

            .in-slider-knob-wrapper.in-slider-left-knob .tooltip{
                background-color: greenyellow;
            }
            .in-slider-knob-wrapper.in-slider-right-knob .tooltip{
                background-color: orangered;
            }
        }
        .in-slider-knob-wrapper.in-slider-left-knob{
            width: max-content;
            left: v-bind(_knobXDistance);
        }
    }
    .in-range-slider-wrapper.vertical .in-slider-fill.in-range-slider-fill{
        height: v-bind('`${_fill}%`');
        top: v-bind('`${_minRange}%`');
        width: 100%;
        .in-slider-knob-wrapper.in-slider-top-knob{
            width: max-content;
            top: v-bind(_knobYDistance);
        }
        .in-slider-knob-wrapper.in-slider-bottom-knob{
            width: max-content;
            top: calc(100% - v-bind('_knobYDistance?.slice(1)'));
        }
        .in-slider-knob-wrapper.in-slider-bottom-knob .tooltip{
            background-color: greenyellow;
        }
        .in-slider-knob-wrapper.in-slider-top-knob .tooltip{
            background-color: orangered;
        }
    }
</style>