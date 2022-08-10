<template>
  <div
    class="base-input"
    :class="{ error: hasValidationError }"
    :style="{ width }"
  >
    <label
      @click="() => !readonly && $refs.input.focus()"
      v-if="label"
      :class="['input__label', { readonly }]"
      >{{ label }}</label
    >

    <input
      autocomplete="off"
      ref="input"
      v-model="inputValue"
      @blur="handleBlur"
      @focus="$emit('focus')"
      :name="name"
      :placeholder="placeholder"
      :type="typeInput"
      class="input__field"
      :readonly="readonly"
      :disabled="disabled"
      @keydown="(evt) => $emit('keydown', evt)"
      @keyup="(evt) => $emit('keyup', evt)"
      @keypress="(evt) => $emit('keypress', evt)"
    />

    <svgicon
      @click="show = !show"
      :class="['icon', { show }]"
      :icon="'eye'"
      width="22px"
    />

    <slot v-if="hasValidationError && !serverValidationPending" />
  </div>
</template>

<script>
import Base from "./Base/Base";

export default {
  name: "vpassword",
  extends: Base,
  data() {
    return {
      show: false,
    };
  },
  computed: {
    typeInput() {
      return !this.show && this.inputValue.length ? "password" : "text";
    },
  },
  methods: {
    handleBlur() {
      this.$emit("blur");
      this.validate();
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  position: absolute;
  right: 10px;
  bottom: calc(100% / 2 - 2px);
  fill: $gray;
  transition: fill 0.2s;
  cursor: pointer;
}

.show {
  fill: $black;
}

.error {
  .icon {
    fill: $red;
  }
}
</style>
