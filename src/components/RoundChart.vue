<template>
  <div :class="$style.chart">
    <svg
      :class="$style['circular-loader']"
      :style="{ width, height }"
      viewBox="0 0 42 42"
    >
      <circle
        cx="21"
        cy="21"
        r="18.2"
        fill="#F5F7F9"
        stroke="#F5F7F9"
        stroke-width="0.2"
      ></circle>
      <circle
        cx="21"
        cy="21"
        r="13.6"
        fill="#ffffff"
        stroke="#F5F7F9"
        stroke-width="0.2"
      ></circle>
      <circle cx="21" cy="21" r="15.91549430918954" fill="transparent"></circle>
      <circle
        :class="$style['loader-path']"
        cx="21"
        cy="21"
        r="15.91549430918954"
        fill="transparent"
        :stroke="color"
        stroke-width="4.5"
        :stroke-dasharray="`${percent} 200`"
      ></circle>
    </svg>

    <span v-if="showCount" :class="$style['title']">{{ count }}{{ prefix }}</span>
    <span v-if="subtitle" :class="$style['subtitle']">{{ subtitle }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class UiRoundChart extends Vue {
  @Prop({ type: String, default: '64px' }) width!: string
  @Prop({ type: String, default: '64px' }) height!: string
  @Prop({ type: String, default: 'black' }) color!: string
  @Prop({ type: Number, default: 0 }) count!: number
  @Prop({ type: Boolean, default: true }) showCount!: string
  @Prop({ type: String, default: '' }) subtitle!: string
  @Prop({ type: String, default: '%' }) prefix!: string
  @Prop({ type: Number, default: 100 }) max!: number

  get percent() {
    if (this.max == 100) return this.count
    else {
      return Math.ceil(100 * this.count / this.max)
    }
  }
}
</script>

<style lang="scss" module>
.chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 64px;

  .circular-loader {
    transform: rotate(-90deg);
    .loader-path {
      // stroke-dasharray: 0, 200;
      stroke-dashoffset: 0;
      stroke-linecap: round;
    }
  }

  .title {
    margin-top: 12px;
    font-size: 20px;
    line-height: 172%;
    color: $color-text-2;
    white-space: nowrap;
  }
  .subtitle {
    font-size: 14px;
    line-height: 174.02%;
    color: $color-text-4;
  }
}
</style>
