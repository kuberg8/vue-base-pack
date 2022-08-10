<template>
  <div class="lds">
    <div
      class="lds__spinner"
      :style="{ color, width: size, height: size, '--long': long }"
    >
      <div
        v-for="i in 12"
        :key="i"
        :style="`transform-origin: calc(${size} / 2) calc(${size} / 2)`"
      />
    </div>
    <div v-if="withText">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: "56px",
    },
    withText: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "Загрузка",
    },
  },
  computed: {
    long() {
      return (+this.size.replace(/[^0-9]/g, "") * 26) / 100 + "px";
    },
  },
};
</script>

<style lang="scss" scoped>
.lds {
  display: flex;
  column-gap: 16px;
  align-items: center;

  .lds__spinner div {
    animation: lds-spinner 1.2s linear infinite;
  }

  .lds__spinner div::after {
    content: " ";
    position: absolute;
    left: 50%;
    top: 3px;
    display: block;
    border-radius: 20%;
    width: 2px;
    height: var(--long);
    background: currentcolor;
  }

  .lds__spinner div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }

  .lds__spinner div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }

  .lds__spinner div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }

  .lds__spinner div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }

  .lds__spinner div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }

  .lds__spinner div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }

  .lds__spinner div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }

  .lds__spinner div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }

  .lds__spinner div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }

  .lds__spinner div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }

  .lds__spinner div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }

  .lds__spinner div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }

  &__spinner {
    position: relative;
    display: inline-block;
    color: $color-blue;
  }
}

@keyframes lds-spinner {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
