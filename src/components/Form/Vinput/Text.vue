<template>
  <div
    class="base-input"
    :class="{ error: hasValidationError && !loading }"
    :style="{ width }"
  >
    <label
      @click="() => !readonly && $refs.input.focus()"
      v-if="label"
      :class="['input__label', { readonly }]"
    >
      {{ label }}
    </label>

    <input
      autocomplete="off"
      ref="input"
      :name="name"
      v-model="inputValue"
      @blur="handleBlur"
      @focus="$emit('focus')"
      :placeholder="placeholder"
      class="input__field"
      :readonly="readonly"
      :disabled="disabled || loading"
      :maxlength="usedMask.mask.length || limitMaxLength"
      @keydown="keydown"
      @keyup="keyup"
      @keypress="keypress"
      @paste="paste"
    />
    <img
      class="loader_img"
      v-if="serverValidationPending"
      src="/img/Loader.gif"
    />
    <slot v-if="hasValidationError && !serverValidationPending" />
  </div>
</template>

<script>
import Base from "./Base/Base";

export default {
  name: "vtext",
  extends: Base,
  methods: {
    handleBlur() {
      this.$emit("blur");
      this.validate();
    },
    focus() {
      this.$refs.input.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
.loader_img {
  width: 15px;
  position: absolute;
  top: 21px;
  right: 10px;
}
</style>
