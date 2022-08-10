<script>
import Vue from "vue";
import Validatable from "./Validatable.vue";
import Maskable from "./Maskable.vue";
import InputProps from "./InputProps.vue";

export default Vue.extend({
  mixins: [InputProps, Validatable, Maskable],
  inject: { formData: { from: "formData", default: null } },
  mounted() {
    this.defineProp(this.name);
  },
  computed: {
    inputValue: {
      get() {
        if (this.name && this.formData) {
          return this.formData[this.name];
        } else {
          return this.value;
        }
      },
      set(val) {
        if (this.name && this.formData) {
          Vue.set(this.formData, this.name, val);
        }
        this.$emit("valueChange", val);
      },
    },
  },
  methods: {
    defineProp(propName) {
      if (propName && this.formData) {
        const formValue = this.formData[propName];
        if (
          !Object.prototype.hasOwnProperty.call(this.formData, propName) ||
          !formValue
        ) {
          Vue.set(this.formData, propName, this.value);
        }
      }
    },
  },
});
</script>
