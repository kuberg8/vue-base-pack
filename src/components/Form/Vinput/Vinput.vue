<template>
  <component
    v-model.trim="inputValue"
    ref="input"
    :is="componentType"
    :type="type"
    v-bind="{ ...$props, ...$attrs }"
    v-on="$listeners"
  >
    <slot />
  </component>
</template>

<script>
import Vue from "vue";
import InputProps from "./Base/InputProps";

import VText from "./Text.vue";
import VPassword from "./Password.vue";
import VTextArea from "./Textarea.vue";
import VDate from "./Date.vue";

const componentMap = {
  password: "VPassword",
  textarea: "VTextArea",
  date: "VDate",
  // currency: 'VCurrency'
  // phone: 'VPhone',
  // file: "VFile",
};

export default Vue.extend({
  name: "vinput",
  emits: ["enter"],
  extends: InputProps,
  components: {
    VPassword,
    VText,
    VTextArea,
    VDate,
    // VCurrency,
    // VPhone,
    // VFile,
  },
  props: {
    maskRegex: [String, RegExp],
    required: Boolean,
    server: Function,
    pattern: [String, RegExp],
    minLength: String,
    maxLength: String,
    sameAs: String,
    not: String,
    maxValue: [Number, null],
    minValue: [Number, null],
    email: Boolean,
    unmaskOnInput: {
      type: Boolean,
      default: true,
    },
    customValidation: {
      type: [Function, null],
      default: null,
    },

    // for file type input
    fileName: {
      type: String,
      default: "",
    },
    maxFileSize: {
      type: Number,
      default: Infinity,
    },
    maxFileCount: {
      type: Number,
      default: Infinity,
    },
    accept: {
      type: String,
      default: "",
    },
    multiple: {
      type: Boolean,
      default: false,
    },

    // for datepicker
    minDate: {
      type: [String, Date],
      default: null,
    },
    maxDate: {
      type: [String, Date],
      default: null,
    },
    withTime: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "value",
    event: "valueChange",
  },
  computed: {
    componentType() {
      const componentKey = Object.keys(componentMap).find(
        (key) => this.type === key
      );

      if (!componentKey) {
        return "VText";
      } else {
        return componentMap[componentKey];
      }
    },
    inputValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("valueChange", val);
      },
    },
    hasValidationError() {
      return this.$refs.input.hasValidationError;
    },
  },
  methods: {
    touch() {
      const touchValidator = this.$refs.input.$v?.$touch;
      touchValidator && touchValidator();
    },
  },
});
</script>
