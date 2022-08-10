<template>
  <div
    class="base-input"
    :class="{
      readonly,
      loading,
      error: hasValidationError,
      'date-input': !withTime,
      'date-time-input': withTime,
    }"
  >
    <label
      @click="() => !readonly && $refs.input.focus()"
      v-if="label"
      :class="['input__label', { readonly }]"
    >
      {{ label }}
    </label>

    <input
      :value="inputValue"
      autocomplete="off"
      ref="input"
      :name="name"
      @blur="handlerBlur"
      @focus="$emit('focus')"
      :placeholder="placeholder"
      class="input__field"
      :readonly="readonly"
      :disabled="loading"
      :style="{ width: width }"
      @input="handleInput"
      @keydown="$emit('keydown')"
      @keyup="$emit('keyup')"
      @keypress="$emit('keypress')"
      @keydown.enter="$emit('enter')"
    />

    <svgicon
      icon="calendar"
      width="14px"
      class="date-input__calendar"
      v-if="!readonly"
      @click="$refs.range.focus()"
    />

    <date-picker
      ref="range"
      prefix-class="xmx"
      :format="withTime ? DATETIME_FORMAT : DATE_FORMAT"
      :lang="lang"
      class="date-picker__picker"
      :value="stringToDate"
      @input="selectDate"
      @change="dateSelected"
      tabindex="-1"
      :type="withTime ? 'datetime' : 'date'"
    />

    <slot v-if="hasValidationError && !serverValidationPending" />
  </div>
</template>

<script>
import Base from "./Base/Base.vue";
import moment from "moment";
import masker from "@titou10/v-mask/dist/masker";

const DATE_FORMAT = "DD.MM.YYYY";
const DATETIME_FORMAT = "DD.MM.YYYY HH:mm:ss";

// Has following validations: isValidDate, minDate, maxDate, birthDate
export default {
  name: "VDate",
  extends: Base,
  props: {
    minDate: {
      type: [String, Date],
      default: null,
    },
    maxDate: {
      type: [String, Date],
      default: null,
    },
    birthDate: {
      type: [String, Date],
      default: null,
    },
    withTime: {
      type: [Boolean],
      default: false,
    },
  },
  data() {
    return {
      usedMask: {
        mask: this.withTime ? "##.##.#### ##:##:##" : "##.##.####",
        nullIfEmpty: false,
      },
      lang: {
        formatLocale: {
          monthsShort: [
            "Янв",
            "Фев",
            "Мар",
            "Апр",
            "Май",
            "Июн",
            "Июл",
            "Авг",
            "Сен",
            "Окт",
            "Ноя",
            "Дек",
          ],
          weekdaysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
          firstDayOfWeek: 1,
        },
      },
      DATE_FORMAT,
      DATETIME_FORMAT,
    };
  },
  validations() {
    return {
      inputValue: this.dateRules,
    };
  },
  methods: {
    handleInput({ target }) {
      if (target.selectionStart !== target.value.length) {
        const correctDate = target.value
          .split(" ")[0]
          .split(".")
          .every((section, index) => {
            if (index < 2) return section.length <= 2;
            return section.length <= 4;
          });

        if (this.withTime) {
          const correctTime = (target) =>
            target.value
              .split(" ")[1]
              .split(":")
              .every((section) => {
                return section.length <= 2;
              });
          if (
            target.value.split(" ").length !== 2 ||
            !correctDate ||
            !correctTime(target)
          ) {
            let cursorPlace;
            if (
              target.selectionStart === 3 ||
              target.selectionStart === 6 ||
              target.selectionStart === 10 ||
              target.selectionStart === 14 ||
              target.selectionStart === 17
            ) {
              cursorPlace = target.selectionStart + 1;
            } else cursorPlace = target.selectionStart;

            target.value =
              target.value.slice(0, cursorPlace) +
              target.value.slice(cursorPlace + 1);
            target.value = masker(target.value, this.usedMask.mask);
            this.inputValue = target.value;
            target.setSelectionRange(cursorPlace, cursorPlace);
          }
        } else {
          if (!correctDate) {
            let cursorPlace;
            if (target.selectionStart === 3 || target.selectionStart === 6) {
              cursorPlace = target.selectionStart + 1;
            } else cursorPlace = target.selectionStart;

            target.value =
              target.value.slice(0, cursorPlace) +
              target.value.slice(cursorPlace + 1);
            target.value = masker(target.value, this.usedMask.mask);
            this.inputValue = target.value;
            target.setSelectionRange(cursorPlace, cursorPlace);
          }
        }
      } else {
        target.value = masker(target.value, this.usedMask.mask);
        this.inputValue = target.value;
      }
    },
    handlerBlur({ target }) {
      const dateSections = target.value.split(" ")[0].split(".");
      const correctDate =
        dateSections.length < 2
          ? dateSections[0]
          : dateSections
              .map((section, index) => {
                if (index < 2 && section.length < 2) return "0" + section;
                if (index == 2 && section.length == 3)
                  return section.slice(0, 2);
                return section;
              })
              .join(".");
      target.value = masker(correctDate, this.usedMask.mask);

      if (this.withTime) {
        if (target.value.split(" ").length !== 2) {
          target.value = masker(`${correctDate} 00:00:00`, this.usedMask.mask);
        }
        const timeSections = target.value.split(" ")[1].split(":");
        const correctTime =
          timeSections.length < 2
            ? `${timeSections[0]}:00:00`
            : timeSections
                .map((section, index) => {
                  if (index < 2 && section.length < 2) return "0" + section;
                  return section;
                })
                .join(":");
        target.value = masker(
          `${correctDate} ${correctTime}`,
          this.usedMask.mask
        );
      }
      this.inputValue = target.value;
      this.$emit("blur");
      this.validate();
      this.$nextTick(() => {
        this.$emit("change");
      });
    },
    focus() {
      this.$refs.input.focus();
    },
    selectDate(date) {
      this.inputValue = moment(date).format(this.dateFormat);
      this.$v?.$touch();
    },
    dateSelected() {
      this.$emit("change");
    },
  },
  computed: {
    dateFormat() {
      return this.withTime ? DATETIME_FORMAT : DATE_FORMAT;
    },
    dateRules() {
      const validators = { ...this.rules };

      validators.isValidDate = (date) => {
        const newDate = moment(date, this.dateFormat);

        let dateSplit;
        if (this.withTime) {
          const dateParts = date.split(" ");
          dateSplit = dateParts[0].split(".");
        } else {
          dateSplit = date.split(".");
        }

        if (dateSplit.length > 2) {
          const year = +dateSplit.pop();

          return !isNaN(newDate) && year > 1900 && year < 2100;
        } else return !date.length;
      };

      if (this.minDate) {
        validators.minDate = (date) => {
          if (!date) return true;
          return (
            moment(date, this.dateFormat) >
            moment(this.minDate, this.dateFormat)
          );
        };
      }

      if (this.maxDate) {
        validators.maxDate = (date) =>
          moment(date, this.dateFormat) < moment(this.maxDate, this.dateFormat);
      }

      if (this.birthDate) {
        validators.birthDate = (date) => {
          const dateIn = moment(date, this.dateFormat);
          const dateNow = moment(this.today);
          const birthDate = +this.birthDate;

          return dateNow.subtract(birthDate, "y") > dateIn;
        };
      }

      return validators;
    },
    stringToDate() {
      const parsed = moment(this.inputValue, this.dateFormat).toDate();

      if (isNaN(parsed)) {
        return this.today;
      } else {
        return parsed;
      }
    },
    today() {
      return new Date();
    },
  },
};
</script>

<style lang="scss" scoped>
.date-input {
  display: flex;
  flex-direction: column;
}

.date-picker__picker {
  position: absolute;
  display: flex;
  width: 0px;
  height: 0px;
  bottom: 20px;
  left: 0px;
}

.input-content {
  position: relative;
}

.date-input__calendar {
  max-width: 24px;
  max-height: 24px;
  position: absolute;
  transition: all 0.2s;
  background: transparent;
  fill: gray;
  right: 8px;
  bottom: 24px;
  cursor: pointer;
}
</style>
