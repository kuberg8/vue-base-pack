<template>
  <div class="switch" :style="!loading ? 'cursor: pointer' : null">
    <div class="block" @click.stop="switchValue" :style="blockStyle">
      <div v-if="!loading" class="circle"></div>
    </div>
    <div @click.stop="switchValue" class="label" :style="labelStyle">
      <span v-if="!loading">{{ label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "value",
    event: "valueChange",
  },
  computed: {
    componentValue: {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.$emit("valueChange", value);
      },
    },
    blockStyle() {
      return {
        "justify-content": this.componentValue ? "flex-end" : "flex-start",
        background: this.loading
          ? "#DCE7F0"
          : this.componentValue
          ? "#0094ff"
          : "#7B8996",
      };
    },
    labelStyle() {
      if (this.loading) {
        return {
          display: "block",
          "border-radius": "8px",
          width: "88px",
          height: "12px",
          background: "#DCE7F0",
        };
      }
      return {
        color: this.componentValue ? "#536d86" : "rgba(83, 109, 134, 0.5)",
      };
    },
  },
  methods: {
    switchValue() {
      this.componentValue = !this.componentValue;
      this.$emit("click");
    },
  },
};
</script>

<style scoped lang="scss">
.switch {
  display: flex;
  align-items: center;

  .block {
    display: flex;
    align-items: center;
    width: 32px;
    height: 16px;
    border-radius: 12px;
    padding: 2px;
    transition: all 0.2s;

    .circle {
      display: block;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      background: #ffffff;
      box-shadow: 0px 1px 4px -2px rgba(0, 0, 0, 0.25);
    }
  }

  .label {
    margin-left: 8px;
    transition: all 0.2s;
    user-select: none;
  }
}
</style>
