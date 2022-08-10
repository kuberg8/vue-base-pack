<template>
  <div class="base-input" :class="{ error: hasValidationError }">
    <label
      @click="() => !readonly && $refs.input.focus()"
      v-if="label"
      :class="['input__label', { readonly }]"
      >{{ label }}</label
    >
    <div class="treadonly-block" v-if="readonly">
      {{ inputValue }}
    </div>
    <textarea
      autocomplete="off"
      ref="input"
      v-model="inputValue"
      @focus="$emit('focus')"
      @blur="handleBlur"
      :name="name"
      :placeholder="placeholder"
      class="input__field"
      :readonly="readonly"
      :disabled="loading"
      :maxlength="limitMaxLength"
      v-else
    />
    <slot
      v-if="hasValidationError && !serverValidationPending"
      class="validation-messages"
    />
  </div>
</template>

<script>
import Base from "./Base/Base.vue";

export default {
  name: "vtextarea",
  extends: Base,
  methods: {
    handleBlur() {
      this.$emit("blur");
      this.validate();
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  // resize: none;
  // height: 100px;
  // overflow: hidden scroll;
  max-width: 100%;
  margin-bottom: 20px;
  scrollbar-width: none;
  scrollbar-color: transparent;
}

.readonly-block {
  word-break: break-word;
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
