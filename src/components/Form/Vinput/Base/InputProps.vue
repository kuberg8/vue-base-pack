<script>
export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: [Object, Array, String, Number],
      default: null,
    },
    label: String,
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    loading: Boolean,
    name: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: "100%",
    },
    limitMaxLength: {
      type: Number,
      default: Infinity,
    },
  },
};
</script>
