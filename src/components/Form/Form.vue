<template>
  <form ref="form" @submit.prevent="send">
    <slot />
  </form>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Form",
  emits: ["request", "before-destroy"],
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    clearOnDestroy: {
      type: Boolean,
      default: false,
    },
    isNeedResets: {
      type: Boolean,
      default: true,
    },
    scrollWhenInvalid: {
      type: Boolean,
      default: false,
    },
  },
  beforeDestroy() {
    this.$emit("before-destroy");

    if (this.clearOnDestroy) {
      this.$emit("input", {});
    }
  },
  provide() {
    return {
      validations: this.validations,
      resets: this.resets,
      formData: this.formData,
    };
  },
  data() {
    return {
      validations: [],
      resets: [],
      formData: { ...this.value },
    };
  },
  methods: {
    send() {
      let firstFailed = null;
      const validationSuccess = !this.validations.filter((validator) => {
        const failed = !validator.callback();

        if (!firstFailed && failed) {
          firstFailed = validator.owner.$el;
        }

        return failed;
      }).length;

      if (validationSuccess) {
        const data = { ...this.formData };

        this.$emit("request", data);
        if (this.isNeedResets) this.resets.forEach((callback) => callback());
      } else {
        this.scrollWhenInvalid && this.scrollToInvalidField(firstFailed);
      }
    },
    scrollToInvalidField(el) {
      el.scrollIntoView({ block: "center", behavior: "smooth" });
    },
    hasValidationErrors(ignore = null) {
      let failedValidators = [];

      if (!ignore) {
        failedValidators = this.validations.filter(
          (validator) => !validator.callback()
        );
      } else {
        failedValidators = this.validations
          .filter((validator) => !ignore.some((ign) => ign === validator.owner))
          .filter((validator) => !validator.callback());
      }

      if (failedValidators.length) {
        const firstFailed = failedValidators[0];

        this.scrollWhenInvalid &&
          this.scrollToInvalidField(firstFailed.owner.$el);
      }

      return !!failedValidators.length;
    },
    resetForm() {
      this.resets.forEach((callback) => callback());
    },
  },
  watch: {
    value: {
      handler(val) {
        for (const key in val) {
          Vue.set(this.formData, key, val[key]);
        }
      },
      deep: true,
      immediate: true,
    },
    formData: {
      handler(val) {
        this.$emit("input", val);
      },
      deep: true,
    },
  },
});
</script>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  width: 100%;
  height: auto;
}
</style>
