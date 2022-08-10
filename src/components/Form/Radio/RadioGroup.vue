<template>
  <div class="radio-wrapper">
    <label v-if="label" class="radio__label">{{ label }}</label>
    <div class="options-wrapper">
      <Radio
        v-for="(opt, idx) in options"
        :key="idx"
        :name="name"
        :option="opt"
        :size="size"
        :loading="loading"
        v-model="inputValue"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Radio from "@/components/Form/Radio/Radio.vue";
import Base from "@/components/Form/Vinput/Base/Base.vue";

export default Vue.extend({
  extends: Base,
  components: {
    Radio,
  },
  inject: {
    formData: {
      from: "formData",
      default: null,
    },
  },
  emits: ["change"],
  props: {
    name: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: "",
    },
    size: {
      type: String,
    },
  },
  data() {
    return {
      defaultValue: this.options[0]?.value ?? "",
    };
  },
  computed: {
    inputValue: {
      get() {
        if (this.name) {
          return this.formData[this.name];
        } else {
          return this.value;
        }
      },
      set(val) {
        if (this.name) {
          this.formData[this.name] = val;
        } else {
          this.$emit("input", val);
        }
      },
    },
  },
  watch: {
    inputValue(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit("change");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.radio-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;

  .radio__label {
    align-self: flex-start;
    color: $gray;
    font-size: 12px;
    margin-bottom: 8px;
  }

  .options-wrapper {
    width: 100%;
  }
}
</style>
