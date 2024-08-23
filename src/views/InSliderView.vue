<script setup lang="ts">
  import InSlider from '@/in-components/in-slider/InSlider.vue'
  import { ref, type Ref } from 'vue'
  import type {TRangeValues } from '@/in-components/in-slider/interfaces'

  const val = ref<number>(45)
  const rangeValues: Ref<TRangeValues> = ref([10, 50])
  const tooltipVal = ref<number>(0)
  const val1 = ref(0)

  interface IStyle{
    [key: string]: string
  }

  const knobStyles: IStyle = {
    width: '20px',
    height: '20px',
    backgroundColor: 'purple',
    borderRadius: '5px'
  }
  const tooltipStyles: IStyle = {
    backgroundColor: "yellow"
  }

  function changeVal(v: number){
    val.value = v
  }
</script>

<template>
  <div class="main">
    <div class="container">
        <h2 class="heading">Horizontal Slider</h2>
        <div class="component">
            <in-slider
                v-model="val"
                color="#000"
                @change="changeVal"
            />
        </div>
    </div>
    <div class="container">
        <h2 class="heading">Horizontal Reverse Slider</h2>
        <div class="component">
            <in-slider
                v-model="val"
                color="#000"
                direction="reverse"
                
            />
        </div>
    </div>
    <div class="container">
        <h2 class="heading">Vertical Slider</h2>
        <div class="component">
            <in-slider
                v-model="val"
                color="#000"
                orientation="vertical"
                
            />
        </div>
    </div>
    <div class="container">
        <h2 class="heading">Vertical Reverse Slider</h2>
        <div class="component">
            <in-slider
                v-model="val"
                color="#000"
                orientation="vertical"
                direction="reverse"
                
            />
        </div>
    </div>
    <div class="container">
        <h2 class="heading">Horizontal Step Slider</h2>
        <div class="component">
            <in-slider
                v-model="val"
                color="#000"
                :steps="60"
                :step-markers="true"             
            />
        </div>
    </div>
    <div class="container">
        <h2 class="heading">Horizontal Step Reverse Slider</h2>
        <div class="component">
            <in-slider
                v-model="val"
                color="#000"
                direction="reverse"
                :steps="10"
                :step-markers="true"               
            >
                
            </in-slider>
        </div>
    </div>
    <div class="container">
        <h2 class="heading">Vertical Step Slider</h2>
        <div class="component">
            <in-slider
                v-model="val"
                color="#000"
                orientation="vertical"
                :steps="10"
                :step-markers="true"
                
            />
        </div>
    </div>
    <div class="container">
        <h2 class="heading">Vertical Step Reverse Slider</h2>
        <div class="component">
            <in-slider
                v-model="val"
                color="#000"
                orientation="vertical"
                direction="reverse"
                :steps="10"
                :step-markers="true"
                
            />
        </div>
    </div>
    <div class="container">
        <h2 class="heading">Horizontal Range Slider</h2>
        <div class="component">
            <in-slider
                v-model="rangeValues"
                color="#000"
                :range="true"
                slider-height-horizontal="5px"
                slider-corners="solid"
            />
        </div>
    </div>
    <div class="container">
        <h2 class="heading">Vertical Range Slider</h2>
        <div class="component">
            <in-slider
                v-model="rangeValues"
                color="#000"
                orientation="vertical"
                :range="true"
                slider-width-vertical="5px"
                slider-corners="solid"
            />
        </div>
    </div>
    <div class="container">
        <h2 class="heading">Horizontal Step Range  Slider</h2>
        <div class="component">
            <in-slider
                v-model="rangeValues"
                color="#000"
                :steps="10"
                :step-markers="true"
                :range="true"
            />
        </div>
    </div>
    <div class="container">
        <h2 class="heading">Vertical Step Range  Slider</h2>
        <div class="component">
            <in-slider
                v-model="rangeValues"
                color="#000"
                :steps="10"
                :step-markers="true"
                orientation="vertical"
                :range="true"
                :knob-styles="knobStyles"
            />
        </div>
    </div>
    <div class="container">
        <h2 class="heading">Sliders with Tooltip</h2>
        <div class="component">
            <in-slider
                v-model="tooltipVal"
                color="#000"
                tooltip
                :tooltip-styles="tooltipStyles"
            />
        </div>
        <div class="component">
            <in-slider
                color="#000"
                v-model="rangeValues"
                range
                tooltip
                :steps="10"
                step-markers
                :tooltip-styles="tooltipStyles"
            />
        </div>
    </div>
    <div class="container">
        <h2 class="heading">Horizontal Slider Custom Knob</h2>
        <div class="component">
            <in-slider
                v-model="val"
                color="#000"
                :knob-styles="knobStyles"
            />
        </div>
    </div>
    <div class="container">
        <h2 class="heading">Horizontal Slider witn Min and Max value</h2>
        <div class="component">
            <in-slider
            v-model="val"
                color="#000"
                :min="15"
                :max="75"
                step-markers
                tooltip            
            />
        </div>
    </div>
  </div>
</template>

<style scoped>
  .main{
    padding: 30px;
  }

  .container{
    & .component{
        display: grid;
        place-items: center;
        margin: 10% 0;
    }
  }

  .custom-knob{
    width: 20px;
    height: 20px;
    background-color: purple;
    border-radius: 5px;
  }
</style>