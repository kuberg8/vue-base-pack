<template>
  <div @click="click" class="radio">
    <input
      ref="radio"
      type="radio"
      :name="name"
      :value="option.value"
      v-model="inputValue"
      :checked="active"
      hidden
    />
    <span :class="['indictor', { active }]">
      <span class="checked"></span>
    </span>
    <span class="radio__title">{{ option.title }}</span>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  mounted() {
    if (!this.loading) {
      this.$refs.radio.checked = this.active;
    }
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    option: {
      type: Object,
      default: () => {},
    },
    value: {
      type: String,
      default: "",
    },
  },
  computed: {
    active() {
      return this.inputValue === this.option.value;
    },
    inputValue: {
      get() {
        return this.value;
      },
      set() {
        this.$emit("input", this.option.value);
      },
    },
  },
  methods: {
    click() {
      if (!this.loading) {
        this.$refs.radio.click();
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.radio {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
}

.indictor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  min-width: 20px;
  min-height: 20px;
  max-width: 20px;
  max-height: 20px;
  cursor: pointer;
  border: 1px solid $light-gray;
  margin-right: 12px;
  overflow: hidden;
  padding: 2px;
  box-sizing: border-box;
  transition: all 0.1s;

  &.active {
    border: 1px solid $dark-blue;

    .checked {
      display: flex;
      border-radius: 50%;
      min-width: 8px;
      min-height: 8px;
      max-width: 8px;
      max-height: 8px;
      background: $dark-blue;
      transition: all 0.1s;
    }
  }
}
</style>
