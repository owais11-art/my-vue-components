# Usage of InSlider

## Download
To use this component create a folder in src directory of your project and then download the component from the link below and put it inside the folder you created.

Download the component folder [HERE](https://github.com/owais11-art/my-vue-components/tree/dev/src/in-components/in-slider&filename=in-slider)

## Basic Use
```html
    <script setup lang="ts">
        import { ref } from 'vue'
        import { InSlider } from '@/<Folder-Name>/in-slider/InSlider.vue' // Importing InSlider component.

        const val = ref<number>(0)
    </script>
    <template>
        <in-slider v-model="val" /> <!-- Using InSlider component -->
    </template>
```

# Props

## color
This props sets the color to the slider.

default: `#41B883`

type: `string`
```html
    <template>
        <in-slider 
            v-model="val"
            color="#000" 👈🏻
        /> 
    </template>
```

## trackColor
This prop sets color to the track of slider.

default: `""`

type: `string`
```html
    <template>
        <in-slider 
            v-model="val"
            color="#000"
            track-color="yellow" 👈🏻
        /> 
    </template>
```

## trackColorOpacity
This prop sets opacity to the track color of slider.

default: `""`

type: `string` | `number`
```html
    <template>
        <in-slider 
            v-model="val"
            color="#000"
            track-color="yellow"
            track-color-opacity="50" 👈🏻
        /> 
    </template>
```

## knobColor
This props sets color to the knob(handle) of the slider

default: `""`

type: `string`
```html
    <template>
        <in-slider 
            v-model="val"
            color="#000"
            knob-color="purple" 👈🏻
        /> 
    </template>
```

## fillColor
It sets color to the filled part of slider.

default: `""`

type: `string`
```html
    <template>
        <in-slider 
            v-model="val"
            color="#000"
            fill-color="blue" 👈🏻
        /> 
    </template>
```

## orientation
This specifes the orientation of the slider.

value: `horizontal` | `vertical`

default: `horizontal`

type: `string`
```html
    <template>
        <in-slider 
            v-model="val"
            color="#000"
            orientation="vertical" 👈🏻
        /> 
    </template>
```

## direction
This specifies the direction from where the knob will be dragged.

value: `default` | `reverse`

default: `default`

when `orientaion` is `horizontal` and `direction` is `reverse` then knob of slider is dragged from `right` to `left`

when `orientaion` is `vertical` and `direction` is `reverse` then knob of slider is dragged from `top` to `bottom`.

type: `string`
```html
    <template>
        <in-slider 
            v-model="val"
            color="#000"
            orientation="vertical"
            direction="reverse" 👈🏻
        /> 
    </template>
```

## step
This specifies the percentage of each step in step slider.

default: `0`

type: `number`
```html
    <template>
        <in-slider 
            v-model="val"
            color="#000"
            :step="25" 👈🏻
        /> 
    </template>
```

## steps
This specifies the number of steps in step slider.

default: `0`

type: `number`
```html
    <template>
        <in-slider 
            v-model="val"
            color="#000"
            :steps="4" 👈🏻
        /> 
    </template>
```

## stepMarkers
This specifies whether to show step markers or not.

default: `false`

type: `boolean`
```html
    <template>
        <in-slider 
            v-model="val"
            color="#000"
            :steps="4" 
            step-markers 👈🏻
        /> 
    </template>
```

## stepMarkerColor
This sets color to stepMarkers.

default: `""`

type: `string`
```html
    <template>
        <in-slider 
            v-model="val"
            color="#000"
            :steps="4" 
            step-markers
            step-marker-color="#DDD" 👈🏻
        /> 
    </template>
```

## tooltip
This specifies whether to show tooltip or not.

default: `false`

type: `boolean`
```html
    <template>
        <in-slider 
            v-model="val"
            color="#000"
            tooltip 👈🏻
        /> 
    </template>
```

## min and max
These specifies the custom minimun and maximum values which are by default `0` and `100` respectively.

default: `0`

type: `number`
```html
    <template>
        <in-slider 
            v-model="val"
            color="#000"
            tooltip
            :min="15" 👈🏻
            :max="75" 👈🏻
        /> 
    </template>
```

## sliderHeightHorizontal
This sets the height of the horizontal slider.

default: `10px`

type: `string`
```html
    <template>
        <in-slider 
            v-model="val"
            color="#000"
            slider-height-horizontal="10px" 👈🏻
        /> 
    </template>
```

## sliderWidthHorizontal
This sets the width of the horizontal slider.

default: `90%`

type: `string`
```html
    <template>
        <in-slider 
            v-model="val"
            color="#000"
            slider-width-horizontal="10px" 👈🏻
        /> 
    </template>
```

## sliderHeightVertical
This sets the height of the vertical slider.

default: `400px`

type: `string`
```html
    <template>
        <in-slider 
            v-model="val"
            color="#000"
            orientation="vertical"
            slider-height-vertical="10px" 👈🏻
        /> 
    </template>
```

## sliderWidthVertical
This sets the width of the vertical slider.

default: `10px`

type: `string`
```html
    <template>
        <in-slider 
            v-model="val"
            color="#000"
            orientation="vertical"
            slider-width-vertical="10px" 👈🏻
        /> 
    </template>
```

## sliderCorners
This sets styles to corners of the slider.

value: `smooth` | `solid`

default: `smooth`

type: `string`
```html
    <template>
        <in-slider 
            v-model="val"
            color="#000"
            slider-corners="solid" 👈🏻
        />
    </template>
```

## range
This is used to create a range slider.

default: `false`

type: `boolean`
```html
    <script setup lang="ts">
        import { ref } from 'vue'
        import { InSlider } from '@/<Folder-Name>/in-slider/InSlider.vue' // Importing InSlider component.
        const rangeVal = ref([10, 45])
    </script>
    <template>
        <in-slider 
            v-model="rangeVal"
            color="#000"
            range 👈🏻
        /> 
    </template>
```

## strict
Prevents knobs in range slider from crossing over each other.

default: `false`

type: `boolean`
```html
    <template>
        <in-slider 
            v-model="rangeVal"
            color="#000"
            range
            strict 👈🏻
        /> 
    </template>
```

# Events

## inChange
This event passes an object as an argument to handler function and the value of object depends on the type of slider(`step slider` or `range step slider`).

For `range step slider` the object contains three properties:

- `stepsCompleted` list of steps that are between the range.

- `currentMinStep` step number of minimum range value.

- `currentMaxStep` step number of maximum range value.

For `step slider` the object contains only one property:

- `stepsCompleted` number of steps completed.
```html
<script setup lang="ts">
    import { ref } from 'vue'
    import { InSlider } from '@/<Folder-Name>/in-slider/InSlider.vue' // Importing InSlider component.
    import { IPayload } from '@/<Folder-Name>/in-slider/interfaces' // Importing IPayload interface.

    const val = ref<number>(0)
    const rangeVal= ref([10, 45])

    function handleChangeStep(payload: IPayload){
        console.log(payload.stepsCompleted)
    }
    function handleChangeRange(payload: IPayload){
        console.log(payload.stepsCompleted)
        console.log(payload.currentMinStep)
        console.log(payload.currentMaxStep)
    }
</script>
<template>
    <in-slider
        v-model="val"
        :steps="4"
        step-markers
        @in-change="handleChangeStep" 👈🏻
    />

    <in-slider
        v-model="rangeVal"
        :steps="10"
        step-markers
        range
        @in-change="handleChangeRange" 👈🏻
    />
</template>
```

# Slots

## customKnob, customLeftKnob and customRightKnob
These are used to create a custom knob(s).

`customKnob` slot for knob of  normal or step slider.

`customLeftKnob` slot for (left knob or top knob) of  range and range step slider.

`customRightKnob` slot for (right knob or bottom knob) of range and range step slider.

```html
    <template>
        <in-slider v-model="val">
            <template #customKnob> 👈🏻
                <div class="custom-knob"></div>
            <template>
        </in-slider>
        <!-- Custom Knobs for range slider 👇🏻 -->
        <in-slider v-model="rangeVal" range>
            <template #customLeftKnob> 👈🏻
                <div class="custom-left-knob"></div>
            <template>
            <template #customRightKnob> 👈🏻
                <div class="custom-right-knob"></div>
            <template>
        </in-slider> 
        </in-slider> 
    <template>
```

## customTooltip, customLeftTooltip, customRightTooltip
These are used to create a custom tooltip(s).

`customTooltip` slot for tooltip of normal or step slider.

`customLeftTooltip` slot for (left tooltip or top tooltip) of  range and range step slider.

`customRightTooltip` slot for (right tooltip or bottom tooltip) of range and range step slider.

```html
    <template>
        <in-slider v-model="val">
            <template #customTooltip> 👈🏻
                <div class="custom-tooltip"></div>
            <template>
        </in-slider>
        <!-- Custom tooltips for range slider 👇🏻 -->
        <in-slider v-model="rangeVal" range>
            <template #customLeftTooltip> 👈🏻
                <div class="custom-left-tooltip"></div>
            <template>
            <template #customRightTooltip> 👈🏻
                <div class="custom-right-tooltip"></div>
            <template>
        </in-slider> 
        </in-slider> 
    <template>
```