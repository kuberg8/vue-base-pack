<template>
  <component
    :is="tag"
    :style="styleButton"
    :disabled="disabled || loading"
    :class="[variant, { disabled, loading }]"
    :type="type"
    class="btn"
    @click.stop="$emit('click')"
  >
    <VLoader
      v-if="loading"
      :color="variant == 'primary' ? 'white' : 'currentColor'"
      :size="height"
    />

    <div v-if="!loading && text" style="width: 100%">
      {{ text }}
    </div>
    <svg-icon
      v-if="!loading && icon"
      :name="icon"
      :class="{ btn__icon: text }"
      :style="{ width: iconSize || width, height: iconSize || height }"
    />
  </component>
</template>

<script>
import VLoader from "~/components/VLoader.vue";

export default {
  name: "VButton",
  components: { VLoader },
  props: {
    type: {
      type: String,
      default: "button",
    },
    tag: {
      type: String,
      default: "button",
    },
    height: {
      type: String,
      default: "56px",
    },
    width: {
      type: String,
      default: "100%",
    },
    iconSize: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "primary",
    },
    // must be full hex
    color: {
      type: String,
      default: "#025ea1",
    },
  },
  computed: {
    rbaColor() {
      return this.color
        .replace("#", "")
        .match(/.{1,2}/g)
        .map((i) => parseInt(i, 16))
        .join(",");
    },
    styleButton() {
      return {
        height: this.height,
        minHeight: this.height,
        maxWidth: this.width,
        width: this.width,
        "--color": this.color,
        "--color-rgb": this.rbaColor,
        pointerEvents: this.loading ? "none" : null,
      };
    },
  },
};
</script>

<style scoped lang="scss">
/* stylelint-disable */
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 90px;
  padding: 0 12px;
  background: none;
  transition: 0.2s;
  cursor: pointer;

  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.primary {
    color: #fff;
    background-color: var(--color);

    .btn__icon {
      color: var(--color);
      background: #fff;
    }

    &:hover {
      opacity: 0.6;
    }
  }

  &.outline {
    border: 1px solid rgba(var(--color-rgb), 0.3);
    color: var(--color);

    &:hover {
      border: 1px solid var(--color);
    }

    .btn__icon {
      color: #fff;
      background: var(--color);
    }
  }

  &.link {
    color: var(--color);

    &:hover {
      opacity: 0.6;
    }
  }

  &.white {
    background: #fff;
    color: var(--color);
  }

  &__icon:not(.link) {
    border-radius: 50%;
    padding: 7px;
    min-width: 32px;
    min-height: 32px;
    max-width: 32px;
    max-height: 32px;
  }
}
</style>
