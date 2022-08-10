<template>
  <div ref="modal" class="modal" @click.stop>
    <div class="field" @click.stop="$emit('close')"></div>
    <div class="window" :style="windowStyle">
      <button
        @click.stop="$emit('close')"
        class="close-modal"
        v-if="hasCloseButton"
      ></button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  name: "Modal",
  emits: ["close"],
  props: {
    height: {
      type: String,
      default: "fit-content",
    },
    width: {
      type: String,
      default: "fit-content",
    },
    padding: {
      type: String,
      default: "35px 40px",
    },
    hasCloseButton: {
      type: Boolean,
      default: true,
    },
    desktopStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    if (this.$refs.modal.style.display !== "none")
      document.querySelector("body").style.overflow = "hidden";
  },
  beforeDestroy() {
    document.querySelector("body").style.overflow = "auto";
  },
  computed: {
    windowStyle() {
      // return this.modalForMobile ? mobileStyle : desktopStyle;
      return {
        width: this.width,
        height: this.height,
        padding: this.padding,
        ...this.style,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;

  .field {
    position: fixed;
    left: -50%;
    top: -50%;
    display: block;
    width: 1000%;
    height: 1000%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(15px);
    z-index: 1000;
    animation: backOpacity 0.2s linear;
  }
  @keyframes backOpacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .window {
    display: flex;
    flex-direction: column;
    width: 200px;
    height: auto;
    background: #ffffff;
    box-shadow: 0 28px 30px -20px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    z-index: 1001;
    position: relative;
    animation: windowAnime 0.2s ease-in-out;
    color: black;
    box-sizing: border-box;

    @media screen and (max-width: 320px) {
      // $xs-breakpoint
      position: absolute;
      bottom: 0;
      overflow: auto;
    }
  }

  @keyframes windowAnime {
    0% {
      opacity: 0;
      transform: translate3d(0px, 100%, 0px);
    }
    100% {
      opacity: 1;
      transform: translate3d(0px, 0px, 0px);
    }
  }

  .close-modal {
    background: none;
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    width: 20px;
    height: 20px;
    line-height: 15px;
    font-size: 22px;
    font-weight: bold;
    cursor: pointer;
    outline: none;

    &:hover:before,
    &:hover:after {
      background: #666871;
    }

    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 8px;
      right: 0;
      width: 18px;
      height: 4px;
      background: #aaa;
    }

    &:before {
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }

    &:after {
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }
  }
}
</style>
