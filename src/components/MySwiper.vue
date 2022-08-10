<template>
  <div class="swiper">
    <button class="slide__control" @click="prevSlide">
      <svgicon icon="big_arrow" width="30px"></svgicon>
    </button>

    <div
      class="swiper__container"
      :style="`transform: translateX(-${
        currentSlide * 100
      }%); transition: ${transiton}s ease-in-out;`"
    >
      <span v-for="(slide, i) in slides" :key="i" class="slide" ref="slides">
        <slot name="item" :item="slide">{{ slide }}</slot>
      </span>
    </div>

    <button class="slide__control" @click="nextSlide">
      <svgicon icon="big_arrow" width="30px"></svgicon>
    </button>

    <div class="counter">
      <span
        :class="['counter__item', { active: i === currentSlide + 1 }]"
        v-for="i in slides.length"
        :key="i + 'couter'"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    slides: {
      type: Array,
      default: () => [],
    },
    transiton: {
      type: [Number, String],
      default: 0.4,
    },
    loop: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentSlide: 0,
    };
  },
  computed: {
    slideCount() {
      return this.slides.length;
    },
    currentItem() {
      return this.slides[this.currentSlide];
    },
    currentItemNode() {
      return this.$refs?.slides[this.currentSlide];
    },
  },
  methods: {
    nextSlide() {
      if (this.currentSlide < this.slideCount - 1) this.currentSlide += 1;
      else if (this.loop) {
        // this.currentSlide = 0;
        console.log("loop");
      }
    },
    prevSlide() {
      if (this.currentSlide > 0) this.currentSlide -= 1;
      else if (this.loop) {
        // this.currentSlide = 0;
        console.log("loop");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.swiper {
  display: flex;
  overflow: hidden;
  position: relative;
  height: 100%;

  .swiper__container {
    display: flex;
    width: 100%;

    .slide {
      display: flex;
      flex: 0 0 100%;
      max-width: 100%;
      width: 100%;
      word-break: break-all;
    }
  }

  .slide__control {
    position: absolute;
    top: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    color: #fff;
    text-align: center;
    height: 50px;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.2);
    z-index: 100;

    &:first-of-type {
      left: 0;
    }
    &:last-of-type {
      right: 0;
      transform: rotate(180deg) translateY(50%);
    }

    &:hover {
      background: black;
    }
  }

  .counter {
    display: flex;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;

    .counter__item {
      display: flex;
      background: #ccc;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin: 0 3px;
      transition: all 0.2s;

      &.active {
        width: 15px;
        background: $blue;
        border-radius: 8px;
      }
    }
  }
}
</style>
