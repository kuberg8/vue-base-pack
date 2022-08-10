<template>
  <div :class="$style.wrapper">
    <span v-for="part in 5" :class="$style['wrapper__part']" :key="part">
      <div
        v-if="part <= passRating"
        :class="[$style['wrapper__part-fill'], $style[color]]"
      />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class UiFormPassmeter extends Vue {
  @Prop({ type: String, default: '' }) value!: string

  public passRating: number = 0

  get color() {
    switch (this.passRating) {
      case 1:
        return 'red'
      case 2:
        return 'red'
      case 3:
        return 'orange'
      case 4:
        return 'orange'
      case 5:
        return 'green'
      default:
        return 'red'
    }
  }

  @Watch('value')
  onValueChange(value: string) {
    const containsUppercase = /[A-Z]/.test(value)
    const containsLowercase = /[a-z]/.test(value)
    const containsNumber = /[0-9]/.test(value)
    const containsSpecial = /[#?!@$%^&*-]/.test(value)
    const minLength = value.length > 4

    this.passRating = [
      containsUppercase,
      containsLowercase,
      containsNumber,
      containsSpecial,
      minLength,
    ].filter((check) => check).length
  }
}
</script>

<style lang="scss" module>
.wrapper {
  display: flex;
  padding: 0 20px;
  column-gap: 10px;

  &__part {
    height: 4px;
    border-radius: 2px;
    width: 100%;
    display: block;

    &-fill {
      border-radius: 2px;
      width: 100%;
      height: 100%;

      &.green {
        background: $color-primary-2;
      }

      &.orange {
        background: $color-primary-3;
      }

      &.red {
        background: $color-primary-4;
      }
    }
  }
}
</style>
