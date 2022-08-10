<template>
  <div :class="$style.stage__block">
    <span
      v-for="stage in stageCount"
      :key="stage + 'stage'"
      :class="$style.section"
    >
      <span
        :class="[$style.stage, { [$style.active]: stage <= currentStage }]"
      />
      <span
        v-if="stage !== stageCount"
        :class="[$style.line, { [$style.active]: stage < currentStage }]"
      />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class UiChartStages extends Vue {
  @Prop({ type: Number, default: 0 }) stageCount!: number
  @Prop({ type: Number, default: 0 }) currentStage!: number
}
</script>

<style lang="scss" module>
.stage__block {
  display: flex;
  align-items: center;
  width: 100%;
  //   justify-content: space-between;

  .section {
    display: flex;
    align-items: center;
    width: 100%;

    &:last-of-type {
      width: auto;
    }

    .stage {
      display: flex;
      min-width: 23px;
      min-height: 23px;
      border-radius: 50%;
      border: 4px solid white;
      background: $color-bg-1;
      box-shadow: 0px 4px 4px rgba(176, 183, 195, 0.17);
      position: relative;

      &.active {
        background: $color-primary-1;
      }
    }
    .line {
      display: flex;
      min-width: 100%;
      height: 5px;
      background: $color-bg-1;

      &.active {
        background: $color-primary-1;
      }
    }
  }
}
</style>
