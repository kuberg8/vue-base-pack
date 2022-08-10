<script>
import Vue from "vue";
import { mask, unmaskText } from "@titou10/v-mask";
import masker from "@titou10/v-mask/dist/masker";

const keysWhitelist = [
  "Backspace",
  "Delete",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Control",
  "Shift",
  "Alt",
  "Tab",
  "Home",
  "End",
  "Insert",
  "PageUp",
  "PageDown",
  "Enter",
];

export default Vue.extend({
  directives: { mask },
  inject: { formData: { from: "formData", default: null } },
  props: {
    maskRegex: {
      type: [String, RegExp],
      default: "",
    },
    unmaskOnInput: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      usedMask: {
        mask: this.maskRegex || "",
        nullIfEmpty: false,
      },
    };
  },
  methods: {
    checkMask(e) {
      if (e.ctrlKey) {
        return;
      }

      if (this.usedMask?.mask && !keysWhitelist.find((key) => key === e.key)) {
        if (
          this.maskIsRegExp &&
          !this.convertMask.test(e.target.value + e.key)
        ) {
          e.preventDefault();
        } else if (!masker(e.key, this.usedMask.mask) && !this.maskIsRegExp) {
          e.preventDefault();
        }
      }
    },
    keyup(evt) {
      this.$emit("keyup", evt);
    },
    keydown(evt) {
      this.checkMask(evt);
      this.$emit("keydown", evt);
    },
    keypress(evt) {
      this.$emit("keypress", evt);
    },
    paste(evt) {
      const value = evt.clipboardData.getData("text");

      if (this.maskIsRegExp && !this.convertMask.test(value)) {
        evt.preventDefault();
      }
      this.$emit("paste", evt);
    },
  },
  computed: {
    maskIsRegExp() {
      return this.maskRegex instanceof RegExp;
    },
    convertMask() {
      let maskString = this.maskRegex?.toString();
      const braceFirst = maskString.indexOf("{");
      const braceLast = maskString.indexOf("}");
      if (braceFirst !== -1 && braceLast !== -1) {
        const interval = maskString
          .substring(braceFirst + 1, braceLast)
          .split(",");

        if (interval.length === 1) {
          interval[1] = interval[0];
        }

        interval[0] = "0";

        maskString =
          "^" +
          maskString.substring(0, braceFirst).slice(1) +
          "{" +
          interval.join(",") +
          "}" +
          "$";
        return new RegExp(maskString);
      }

      return this.maskRegex;
    },
    inputValue: {
      get() {
        if (this.usedMask?.mask && !this.maskIsRegExp) {
          return masker(this.value, this.usedMask.mask);
        } else {
          return this.value ?? "";
        }
      },
      set(val) {
        if (this.usedMask?.mask && this.unmaskOnInput && !this.maskIsRegExp) {
          this.$emit("input", unmaskText(val));
        } else {
          this.$emit("input", val);
        }
      },
    },
  },
});
</script>
