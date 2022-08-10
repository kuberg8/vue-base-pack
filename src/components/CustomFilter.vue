<template>
  <div class="filter" @click.stop>
    <div class="filter__button" @click.stop="active = !active">
      <svg
        width="21"
        height="24"
        viewBox="0 0 21 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="6.41935" cy="3.66838" r="3.16838" stroke="currentColor" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.95021 4.66821C10.0401 4.3503 10.0882 4.01486 10.0882 3.66818C10.0882 3.32152 10.0401 2.9861 9.95023 2.66821H20.6346V4.66821H9.95021ZM2.88939 4.66821H0V2.66821H2.88937C2.79951 2.9861 2.75143 3.32152 2.75143 3.66818C2.75143 4.01486 2.79952 4.3503 2.88939 4.66821Z"
          fill="currentColor"
        />
        <circle cx="6.41935" cy="20.1762" r="3.16838" stroke="currentColor" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.95021 21.1763C10.0401 20.8584 10.0882 20.5229 10.0882 20.1762C10.0882 19.8296 10.0401 19.4942 9.95023 19.1763H20.6346V21.1763H9.95021ZM2.88939 21.1763H0V19.1763H2.88937C2.79951 19.4942 2.75143 19.8296 2.75143 20.1762C2.75143 20.5229 2.79952 20.8584 2.88939 21.1763Z"
          fill="currentColor"
        />
        <circle
          r="3.16838"
          transform="matrix(-1 0 0 1 14.2154 11.9223)"
          stroke="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.6846 12.9224C10.5947 12.6045 10.5466 12.269 10.5466 11.9223C10.5466 11.5757 10.5947 11.2403 10.6845 10.9224H0.000150681V12.9224H10.6846ZM17.7454 12.9224H20.6348V10.9224H17.7454C17.8353 11.2403 17.8833 11.5757 17.8833 11.9223C17.8833 12.269 17.8352 12.6045 17.7454 12.9224Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <transition name="fade">
      <div
        class="filter__tooltip"
        v-if="active"
        tabindex="-1"
        @focusout="handleBlur"
        ref="filter"
        :style="{ right }"
      >
        <div class="tooltip" :style="{ '--right': rightAbs }">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    right: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      active: false,
    };
  },
  computed: {
    rightAbs() {
      const onlyNumber = this.right.replace(/[^0-9.]/g, "");
      return +onlyNumber + 15 + "px";
    },
  },
  methods: {
    handleBlur(event) {
      if (event.target instanceof HTMLInputElement) {
        this.$refs.filter.focus();
      } else if (!this.$refs.filter.contains(event.relatedTarget))
        this.active = false;
    },
  },
  watch: {
    active(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.filter.focus();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.filter {
  position: relative;
  z-index: 99;

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: red;
    color: white;
    box-shadow: 0 2px 2px #51074e;
    border-radius: 3px;
    cursor: pointer;
    user-select: none;
    transition: 0.3s;

    &:hover {
      box-shadow: none;
    }

    &:active {
      box-shadow: inset 0 4px 4px rgba(44, 4, 48, 0.54);
    }
  }

  &__tooltip {
    position: absolute;
    right: -100px;
    top: calc(100% + 14px);
  }
}

.tooltip {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  background-color: white;
  border: 1px solid gray;
  border-radius: 3px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  padding: 30px;

  &__row {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 20px;
  }

  &__item {
    margin-right: 32px;

    &:last-child {
      margin-right: 0;
    }
  }

  &__buttons {
    display: flex;
    flex-flow: row nowrap;

    .button {
      margin-right: 16px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &:before {
    content: "";
    display: block;
    position: absolute;
    top: -6px;
    right: var(--right);
    margin: 0 auto;
    width: 10px;
    height: 10px;
    background: linear-gradient(
      -45deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 50%,
      $color_main 50%,
      $color_main 100%
    );
    border: 1px solid gray;
    border-bottom: none;
    border-right: none;
    transform: rotate(45deg);
  }
}
</style>
