<template>
  <button
    v-if="!hidden"
    :style="styleButton"
    :disabled="disabled || loading"
    :class="{ disabled, loading }"
    @click.stop="$emit('click')"
    :type="type"
  >
    <span v-if="loading">
      <svg
        :style="{ width, height }"
        class="circular-loader"
        width="100%"
        height="100%"
        viewBox="0 0 42 42"
      >
        <circle
          class="loader-path"
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          :stroke="dark ? 'currentColor' : 'white'"
          stroke-width="4.5"
        ></circle>
      </svg>
    </span>

    <span v-else :style="styconstextPosition">
      <span v-if="text" class="content_item" :style="styleContentItem">{{
        text
      }}</span>
      <span class="content_item" :style="styleContentItem">
        <svgicon
          v-if="icon"
          :icon="icon"
          :width="iconWidth"
          :class="['btn-icon', { disabled: disabled }]"
        />
      </span>
    </span>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    type: {
      type: String,
      default: "button",
    },
    height: {
      type: String,
      default: "fit-content",
    },
    width: {
      type: String,
      default: "fit-content",
    },
    text: {
      type: String,
      default: null,
    },
    textPosition: {
      type: String,
      default: "right",
    },
    icon: {
      type: String,
      default: null,
    },
    iconWidth: {
      type: String,
      default: "100%",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    styleButton() {
      return {
        height: this.height,
        minHeight: this.height,
        maxWidth: this.width,
        width: this.width,
        pointerEvents: this.loading ? "none" : null,
      };
    },
    styconstextPosition() {
      let direction;
      switch (this.textPosition) {
        case "top":
          direction = "column";
          break;
        case "left":
          direction = "row";
          break;
        case "right":
          direction = "row-reverse";
          break;
        case "bottom":
          direction = "column-reverse";
          break;
      }
      return {
        display: "flex",
        "align-items": "center",
        "flex-direction": direction,
        "justify-content": "center",
        height: "100%",
      };
    },
    styleContentItem() {
      if (this.icon && this.text) {
        return "margin: 5px 4px";
      }
      return null;
    },
  },
};
</script>

<style scoped lang="scss">
.btn-icon {
  fill: inherit;
}

.content_item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: inherit;
  width: fit-content;
}

.content_item_name {
  margin: 4px;
}

.circular-loader {
  -webkit-animation: rotate 2s linear infinite;
  animation: rotate 2s linear infinite;
  -webkit-transform-origin: center center;
  -ms-transform-origin: center center;
  transform-origin: center center;
  margin: auto;
}

.loader-path {
  stroke-dasharray: 150, 200;
  stroke-dashoffset: -10;
  -webkit-animation: dash 1.2s ease-in-out infinite,
    color 6s ease-in-out infinite;
  animation: dash 1.2s ease-in-out infinite, color 6s ease-in-out infinite;
  stroke-linecap: round;
}

@-webkit-keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -20;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -94;
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -20;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -94;
  }
}
</style>
