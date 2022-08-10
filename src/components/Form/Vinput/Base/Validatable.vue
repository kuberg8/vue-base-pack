<script>
import Vue from "vue";
import validators from "@/utils/validators";

export default Vue.extend({
  props: {
    maskRegex: {
      type: [String, RegExp],
      default: null,
    },
    server: {
      type: Function,
      default: null,
    },
    pattern: {
      type: [String, RegExp],
      default: null,
    },
    minLength: {
      type: String,
      default: null,
    },
    maxLength: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    sameAs: {
      type: String,
      default: "",
    },
    not: {
      type: String,
      default: "",
    },
    maxValue: {
      type: [Number, null],
      default: null,
    },
    minValue: {
      type: [Number, null],
      default: null,
    },
    email: {
      type: Boolean,
      default: false,
    },
    customValidation: {
      type: [Function, null],
      default: null,
    },
  },
  inject: {
    validations: {
      from: "validations",
      default: null,
    },
    resets: {
      from: "resets",
      default: null,
    },
  },
  created() {
    this.validations?.push({ owner: this, callback: this.validate });
    this.resets?.push(this.reset);
  },
  data() {
    return {
      validators,
    };
  },
  computed: {
    hasValidationError() {
      return this.$v?.inputValue?.$invalid && this.$v?.inputValue?.$dirty;
    },
    serverValidationPending() {
      return this.$v?.inputValue?.$pending ?? false;
    },
    rules() {
      const validators = {};

      if (this.required) {
        validators.required = this.validators.required;
      }

      if (this.email) {
        validators.email = this.validators.email;
      }

      if (this.minLength) {
        validators.minLength = this.validators.minLength(+this.minLength);
      }

      if (this.maxLength) {
        validators.maxLength = this.validators.maxLength(+this.maxLength);
      }

      if (this.pattern) {
        validators.pattern = this.validators.helpers.regex(
          "pattern",
          new RegExp(this.pattern)
        );
      }

      if (this.server) {
        validators.server = (value) => this.server(value);
      }

      if (this.sameAs) {
        validators.sameAs = (value) => {
          const elementValue = this.sameAs ?? null;

          if (!elementValue) {
            return true;
          }

          if (typeof value === "object") {
            return JSON.stringify(value) === JSON.stringify(elementValue);
          } else {
            return value === elementValue;
          }
        };
      }

      if (this.not) {
        validators.not = (value) => value !== this.not;
      }

      if (this.maxValue) {
        validators.maxValue = this.validators.maxValue(this.maxValue);
      }

      if (this.minValue) {
        validators.minValue = this.validators.minValue(this.minValue);
      }

      if (this.customValidation) {
        validators.customValidation = (value) => this.customValidation(value);
      }

      return validators;
    },
    slots() {
      return this.$slots.default;
    },
    propToValidate() {
      return this.$v?.inputValue;
    },
  },
  validations() {
    return {
      inputValue: this.rules,
    };
  },
  methods: {
    validate() {
      this.$v.inputValue.$touch();
      return !this.hasValidationError;
    },
    reset() {
      this.$v.inputValue.$reset();
    },
  },
});
</script>
