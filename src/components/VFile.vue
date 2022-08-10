<template>
  <div v-if="file" class="file">
    <svgicon icon="doc" width="21px" height="28px" />
    <span class="file__info">
      <span class="file__info-name">{{ file.name | trim(35) }}</span>
      <span class="file__info-size"
        >{{ (file.size / 1024 / 1024).toFixed(1) }} Мб
        {{ new Date(file.lastModified) | simpleDateWithTime }}</span
      >
    </span>
    <svgicon
      v-if="removable"
      @click="file = null"
      icon="clear"
      width="17"
      class="clear__icon"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [File, Object],
      default: () => {},
    },
    removable: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "value",
    event: "valueChange",
  },
  computed: {
    file: {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.$emit("valueChange", value);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.file {
  display: flex;
  align-items: center;
  fill: #75adea;
  stroke: white;

  .file__info {
    display: flex;
    flex-direction: column;
    margin-left: 8px;

    .file__info-name {
      font-size: $size_m;
    }

    .file__info-size {
      font-size: $size_xs;
      color: rgba(0, 32, 51, 0.3);
    }
  }

  .clear__icon {
    cursor: pointer;
    fill: $light-black;
    stroke: $light-black;
    transition: 0.2s;
    width: 100%;
    margin-left: auto;

    &:hover {
      fill: $red;
      stroke: $red;
    }
  }
}
</style>
