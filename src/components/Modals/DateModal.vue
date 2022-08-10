<template>
  <Modal
    @close="$emit('close')"
    width="400px"
    :hasCloseButton="false"
    padding="16px"
  >
    <div :class="['date__input', { error: errorDate }]">
      <input
        v-model="inputDate"
        @input="handleDateInput"
        @blur="$v.inputDate.$touch()"
        class="input__field"
        placeholder="ДД.ММ.ГГГГ"
      />
      <svgicon icon="calendar" width="24px" class="icon" />
    </div>

    <div class="calendar">
      <div class="mounth">
        <svgicon
          icon="big_arrow"
          width="16px"
          @click="switchTimer = Math.abs(switchTimer) * -1 - 1"
        />
        {{ monthName }} {{ year }}
        <svgicon
          @click="switchTimer = Math.abs(switchTimer) + 1"
          icon="big_arrow"
          width="16px"
          style="transform: rotate(180deg)"
        />
      </div>

      <div class="calendar__table">
        <span
          class="day day__name"
          v-for="(day, i) in weekDays"
          :key="i + 'dayName'"
          >{{ day }}</span
        >

        <span
          :class="[
            'day',
            {
              other__day: !isDate(day),
              active: isCurrentDay(day),
              today: isToday(day),
            },
          ]"
          v-for="(day, i) in days"
          :key="i + 'day'"
          @click="setDate(day)"
          >{{ typeof day === "object" ? day.getDate() : day }}</span
        >
      </div>
    </div>

    <div v-if="withTime" class="time">
      <span class="title">Время:</span>
      <div
        :class="{
          error: errorTime,
        }"
      >
        <input
          type="number"
          v-model="inputHour"
          @input="handleHourInput"
          class="input__field"
          min="0"
          max="23"
        />
        :
        <input
          type="number"
          v-model="inputMinutes"
          @input="handleMinutesInput"
          class="input__field"
          min="0"
          max="59"
        />
      </div>
    </div>

    <div class="buttons">
      <Button
        @click="$emit('close')"
        width="100%"
        height="40px"
        text="Отмена"
        class="btn-secondary"
      />
      <Button
        @click="setValue"
        width="100%"
        height="40px"
        text="Применить"
        class="btn-primary"
      />
    </div>
  </Modal>
</template>

<script>
import masker from "@titou10/v-mask/dist/masker";
import moment from "moment";
import Modal from "@/components/Modals/Modal.vue";
import Button from "@/components/Button.vue";
import required from "vuelidate/lib/validators/required";

export default {
  name: "DateModal",
  components: {
    Modal,
    Button,
  },
  props: {
    value: String,
    withTime: {
      type: Boolean,
      default: true,
    },
    minDate: [String, Date],
    maxDate: [String, Date],
  },
  mounted() {
    this.setDays();
  },
  data() {
    return {
      weekDays: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"],
      monthNames: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ],
      date: new Date(),
      days: [],
      switchTimer: 0,

      inputDate: this.value,
      inputHour: "00",
      inputMinutes: "00",
    };
  },
  validations() {
    return {
      inputDate: this.rules,
    };
  },
  computed: {
    month() {
      return this.date.getMonth();
    },
    year() {
      return this.date.getFullYear();
    },
    dayNumber() {
      return this.date.getDate();
    },
    monthName() {
      return this.monthNames[this.month];
    },
    errorTime() {
      return (
        this.inputHour < 0 ||
        this.inputHour > 23 ||
        this.inputMinutes > 59 ||
        this.inputMinutes < 0
      );
    },
    errorDate() {
      return this.$v?.inputDate?.$invalid && this.$v?.inputDate?.$dirty;
    },
    rules() {
      let validators = {
        required,
        isValid: (val) => moment(val, "DD.MM.YYYY").isValid(),
      };

      if (this.maxDate) {
        validators.maxDate = (value) =>
          moment(value, "DD.MM.YYYY") <= moment(this.maxDate, "DD.MM.YYYY");
      }

      if (this.minDate) {
        validators.minDate = (value) =>
          moment(value, "DD.MM.YYYY") >= moment(this.minDate, "DD.MM.YYYY");
      }

      return validators;
    },
  },
  methods: {
    daysInMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
    },
    setDays() {
      let monthDays = [];
      const daysMonthCount = this.daysInMonth(this.year, this.month);

      for (let day = 1; day <= daysMonthCount; day++) {
        const date = new Date(this.year, this.month, day);
        monthDays.push(date);

        if (day === 1 || day === daysMonthCount) {
          const weekDay = date.getDay() || 7;
          let otherDays;

          if (day === 1 && weekDay !== 1) {
            const prevMonthCountDay = this.daysInMonth(
              this.year,
              this.month - 1
            );
            otherDays = new Array(weekDay - 1)
              .fill("-")
              .map((item, i) => prevMonthCountDay - i)
              .reverse();
            monthDays = [...otherDays, ...monthDays];
          } else if (day === daysMonthCount) {
            otherDays = new Array(7 - weekDay)
              .fill("-")
              .map((item, i) => i + 1);
            monthDays = [...monthDays, ...otherDays];
          }
        }
      }

      this.days = monthDays;
    },
    handleDateInput({ target }) {
      this.inputDate = masker(target.value, "##.##.####");
    },
    handleHourInput({ target }) {
      this.inputHour = masker(target.value, "##");
    },
    handleMinutesInput({ target }) {
      this.inputMinutes = masker(target.value, "##");
    },
    setDate(day) {
      if (typeof day === "object") {
        this.inputDate = moment(day).format("DD.MM.YYYY");
      }
    },
    isCurrentDay(day) {
      if (day instanceof Date) {
        return moment(day).format("DD.MM.YYYY") === this.inputDate;
      } else return false;
    },
    isDate(day) {
      return day instanceof Date;
    },
    isToday(day) {
      if (day instanceof Date) {
        const today = new Date();
        return (
          day.getFullYear() === today.getFullYear() &&
          day.getMonth() === today.getMonth() &&
          day.getDate() === today.getDate()
        );
      } else return false;
    },
    setValue() {
      this.$emit("setValue", this.inputDate);
      this.$emit("close");
    },
  },
  watch: {
    month() {
      this.setDays();
    },
    switchTimer(val) {
      const month = this.month + Math.sign(val);
      const newDate = new Date(this.date.setMonth(month));
      this.date = newDate;
    },
    inputDate() {
      this.$v?.inputDate?.$touch();
    },
  },
};
</script>

<style scoped lang="scss">
input {
  width: 100%;
  height: 40px;
}

.date__input {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;

  .icon {
    right: 12px;
    fill: $dark-blue;
    position: absolute;
  }
}

.calendar {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 343px;
  width: 100%;
  border: 1px solid rgba(0, 65, 102, 0.2);
  border-radius: 4px;
  margin-bottom: 12px;
  padding: 0 65px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  .mounth {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-weight: 700;
    font-size: 14px;
    margin: 30px 0;

    svg {
      cursor: pointer;
    }
  }

  .calendar__table {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    row-gap: 4px;
    column-gap: 4px;
    width: 100%;
    font-size: 14px;
  }

  .day {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30.29px;
    text-align: center;
    line-height: 21px;
    font-size: 14px;
    border-radius: 50%;
    transition: background 0.2s;

    &:not(.day__name):not(.other__day) {
      cursor: pointer;

      &:not(.active):hover {
        background: $light-gray;
      }
    }

    &.active {
      background: $blue;
      color: white;
      font-weight: bold;
    }

    &.today:not(.active) {
      background: $gray;
    }
  }

  .day__name {
    font-size: 10px;
    color: $gray;
  }

  .other__day {
    color: $gray;
  }
}

.time {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  width: 100%;
  align-items: center;
  margin-bottom: 12px;

  .title {
    color: $dark-gray;
  }

  input {
    width: 90px;
    text-align: center;
    font-weight: bold;
  }
}

.buttons {
  display: flex;
  column-gap: 12px;
}
</style>
