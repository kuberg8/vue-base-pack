<template>
  <span v-show="showError" class="error-message">
    <slot />
  </span>
</template>

<script>
export default {
  name: "validation",
  props: {
    for: {
      type: String,
      default: "",
    },
  },
  computed: {
    showError() {
      if (this.$parent?.propToValidate) {
        const input = this.$parent.propToValidate;
        const possibleErrors = Object.keys(input.$params);

        const firstError = Object.keys(input).find(
          (item) =>
            possibleErrors.some((error) => error === item) &&
            input[item] === false
        );

        return firstError === this.for;
      }
      return false;
    },
  },
};
</script>
