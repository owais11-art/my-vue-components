<script setup lang="ts">
  import InSlider from '@/in-components/in-slider/InSlider.vue'
  import { ref, type Ref } from 'vue'
  import type {IPayload, TRangeValues } from '@/in-components/in-slider/interfaces'

  const val = ref<number>(0)
  const rangeValues: Ref<TRangeValues> = ref([10, 50])
  const tooltipVal = ref<number>(0)
  interface IStyle{
    [key: string]: string
  }

  const r = ref()

  const knobStyles: IStyle = {
    width: '20px',
    height: '20px',
    backgroundColor: 'purple',
    borderRadius: '5px'
  }
  const tooltipStyles: IStyle = {
    backgroundColor: "yellow"
  }
  function c(v:number){
    val.value = v
  }
  function $handleChange(payload: IPayload){
    // console.log(payload.currentMinStep)
  }
</script>

<template>
    <div class="main">
      <div class="container">
            <h2 class="heading">Horizontal Slider</h2>
            <div class="component">
                <in-slider
                    v-model="val"
                    color="rgba(0, 0, 0, 0.5)"
                    track-color="rgba(255, 255, 0, 0.5)"
                    fill-color="brown"
                    :steps="4"
                    step-markers
                >
                  <template #customKnob>
                    <div class="custom-knob"></div>
                  </template>
                </in-slider>
            </div>
        </div>
        <div class="container">
            <h2 class="heading">Horizontal Slider</h2>
            <div class="component">
                <in-slider
                    v-model="rangeValues"
                    color="#000"
                    :steps="10"
                    step-markers
                    range
                    tooltip
                    @in-change="$handleChange"
                >
                  <template #customLeftKnob>
                    <div class="custom-knob"></div>
                  </template>
                  <template #customRightKnob>
                    <div class="custom-knob"></div>
                  </template>
                  <template #customTooltip="{tooltipValue}">
                    <p :class="['custom-tooltip']">{{ tooltipValue }}</p>
                  </template>
                  <template #customLeftTooltip="{tooltipValue}">
                    <p :class="['custom-tooltip', 'custom-tooltip-left']">{{ tooltipValue }}</p>
                  </template>
                </in-slider>
            </div>
        </div>
        <div class="container">
            <h2 class="heading">Horizontal Slider</h2>
            <div class="component">
                <in-slider
                    v-model="rangeValues"
                    color="#000"
                    name="split"
                    range
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

  .custom-tooltip{
    padding: 10px 20px;
    text-align: center;
    background-color: blueviolet;
  }

  .custom-tooltip-left{
    background-color: yellowgreen;
  }
</style>