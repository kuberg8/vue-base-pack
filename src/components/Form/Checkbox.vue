<template>
  <div :class="['checkbox', { error: hasValidationError }]" ref="parent">
    <div
      class="checkbox__indicator"
      :class="{ checkbox__indicator__active: inputValue }"
      @click="(e) => !passive && click(e)"
    >
      <svgicon class="indicator__icon" icon="checkmark" v-if="inputValue" />
    </div>
    <input
      type="hidden"
      ref="checkbox"
      v-model="inputValue"
      class="checkbox__value"
      :name="name"
      :disabled="disabled"
    />
    <label
      :class="['checkbox__label', { small: smallText }]"
      v-if="label"
      v-html="label"
      @click.self="(e) => !passive && click(e)"
    />
    <slot v-if="hasValidationError" class="validation-messages" />
  </div>
</template>

<script>
import Vue from "vue";
import Base from "@/components/Form/Vinput/Base/Base.vue";

export default Vue.extend({
  name: "checkbox",
  inject: { formData: { from: "formData", default: null } },
  extends: Base,
  validations() {
    return {
      inputValue: this.rules,
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    passive: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    smallText: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      defaultValue: false,
    };
  },
  computed: {
    rules() {
      const validators = {};

      if (this.required) {
        validators.required = (val) => val == true;
      }

      return validators;
    },
    inputValue: {
      get() {
        if (this.name && this.formData[this.name] !== undefined) {
          return this.formData[this.name];
        } else {
          return this.value;
        }
      },
      set(val) {
        if (this.name && this.formData[this.name] !== undefined) {
          Vue.set(this.formData, this.name, val);
        } else {
          this.$emit("input", val);
        }
      },
    },
  },
  methods: {
    click() {
      if (!this.disabled) {
        this.inputValue = !this.inputValue;
      }
    },
  },
});
</script>

<style lang="scss">
.checkbox {
  display: flex;
  flex-direction: row !important;
  position: relative;
  padding-bottom: 20px;
  max-height: 36px;

  &.error {
    .checkbox__indicator {
      border: 1px solid red;
    }
    .checkbox__label {
      color: red;
    }
  }

  .checkbox__indicator {
    transition: border 0.2s;
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    min-width: 16px;
    min-height: 16px;
    border-radius: 10%;
    border: 1px solid #7b8996;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;

    .indicator__icon {
      position: absolute;
      width: 10px;
      height: 10px;
      fill: white;
    }
  }

  .checkbox__indicator__active {
    border-color: #0094ff;
    background: #0094ff;
  }

  .checkbox__label {
    margin-left: 8px;
    transition: color 0.2s;
    cursor: inherit;
    &.small {
      font-size: 12px;
      color: gray;
    }
  }
  .checkbox__value {
    display: none;
  }
}
</style>
