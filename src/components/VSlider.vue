<template>
  <Swiper ref="slider" :options="options" @slideChange="() => {}">
    <SwiperSlide
      v-for="(item, n) in items"
      :key="`${_uid}_${n}`"
      :class="{ scale }"
    >
      <slot :item="item" />
    </SwiperSlide>

    <slot name="navigation" />
  </Swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default {
  components: { Swiper, SwiperSlide },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => ({
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev'
        // }
      }),
    },
    scale: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.swiper-container {
  position: relative;
  width: 100%;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 200ms linear;

  &.swiper-slide-active {
    transform: scale(1);
  }

  &.scale:not(.swiper-slide-active) {
    transform: scale(0.8);
  }
}
</style>
