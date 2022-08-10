<template>
  <div class="dev">
    <h1>Dev</h1>
    <hr />
    <section>
      <h2>Форма</h2>

      <Form :value="formData">
        <VInput name="disabled" value="sss" disabled />
        <VInput
          name="phone"
          value="9273385377"
          maskRegex="+7 (###) ### ##-##"
        />
        <VInput
          placeholder="Password"
          name="password"
          type="password"
          required
        />

        <VInput name="required" required placeholder="Required">
          <Validation for="required">Поле обязательно</Validation>
        </VInput>

        <VInput
          name="minmax"
          :minValue="3"
          :maxValue="10"
          placeholder="Min & Max value for numbers"
          maskRegex="##"
        >
          <Validation for="minValue">min value - 3</Validation>
          <Validation for="maxValue">max value - 10</Validation>
        </VInput>

        <VInput
          name="length"
          minLength="3"
          maxLength="5"
          :limitMaxLength="9"
          placeholder="Min & Max length value"
          :maskRegex="/^\d+$/"
        >
          <Validation for="minLength">min length - 3</Validation>
          <Validation for="maxLength">max length - 5</Validation>
        </VInput>

        <VInput name="pattern" :pattern="/^\d+$/" placeholder="pattern">
          <Validation for="pattern">pattern - only numbers</Validation>
        </VInput>

        <VInput name="not" not="not" placeholder="not">
          <Validation for="not">Value === 'not'</Validation>
        </VInput>

        <VInput name="sameAs" sameAs="sameAs" placeholder="sameAs">
          <Validation for="sameAs">Value !== 'sameAs'</Validation>
        </VInput>

        <VInput
          name="custom"
          :customValidation="(val) => val % 2 === 0"
          placeholder="Custom Validation"
        >
          <Validation for="customValidation">Только четные числа</Validation>
        </VInput>

        <VInput
          name="server"
          :server="promise"
          placeholder="Server validate"
          :loading="serverValidatorLoading"
        >
          <Validation for="server">серверная валидация не прошла</Validation>
        </VInput>

        <VInput name="email" email placeholder="email">
          <Validation for="email">email is not valid</Validation>
        </VInput>

        <VSelect
          placeholder="Выберите вариант"
          name="select"
          item-text="name"
          multiple
          search
          resetIfSame
          :items="[
            { id: 1, name: 'Вариант 1' },
            { id: 2, name: 'Вариант 2' },
            { id: 3, name: 'Вариант 3' },
            { id: 4, name: 'Вариант 4' },
            { id: 1, name: 'Вариант 1' },
            { id: 2, name: 'Вариант 2' },
            { id: 3, name: 'Вариант 3' },
            { id: 4, name: 'Вариант 4' },
            { id: 1, name: 'Вариант 1' },
            { id: 2, name: 'Вариант 2' },
            { id: 3, name: 'Вариант 3' },
            { id: 4, name: 'Вариант 4' },
            { id: 1, name: 'Вариант 1' },
            { id: 2, name: 'Вариант 2' },
            { id: 3, name: 'Вариант 3' },
            { id: 4, name: 'Вариант 4' },
          ]"
          required
        >
          <Validation for="required">Поле обязательно</Validation>
        </VSelect>

        <VText
          v-model="inputValue"
          placeholder="VText without VInput and with v-model"
        />

        <VInput type="textarea" name="textarea" required placeholder="Textarea">
          <Validation for="required">Поле обязательно</Validation>
        </VInput>

        <Checkbox label="Чекбокс" name="agreeToChangeData" required>
          <Validation for="required"
            >Необходимо подтвердить согласие</Validation
          >
        </Checkbox>

        <VInput type="date" name="date" required placeholder="Date">
          <Validation for="required">Поле обязательно</Validation>
        </VInput>

        <div></div>

        <RadioGroup :options="radioOptions" size="small" name="radio" />

        <div></div>

        <Button
          type="submit"
          width="228px"
          height="48px"
          text="Submit"
          class="btn-primary"
        />
        <Button
          width="228px"
          height="48px"
          text="Not Submit"
          class="btn-success"
        />
        <Button
          width="228px"
          height="48px"
          text="loading"
          class="btn-outline-primary"
          loading
          dark
        />
        <Button
          width="228px"
          height="48px"
          text="Not Submit"
          class="btn-secondary"
          icon="edit"
          iconWidth="20px"
        />
        <Button class="btn-primary" width="228px" height="48px" loading />
        <Button
          icon="edit"
          iconWidth="20px"
          class="btn-primary"
          width="48px"
          height="48px"
        />
        <Button
          icon="cancel"
          text="Отказаться"
          iconWidth="20px"
          class="custom__class"
        />
        <Button
          icon="cancel"
          text="Отказаться"
          iconWidth="20px"
          class="custom__class"
          disabled
        />
        <Button
          class="btn-primary"
          width="228px"
          height="48px"
          disabled
          text="Disabled"
        />
        <Button
          class="btn-outline-primary"
          width="228px"
          height="48px"
          disabled
          text="Disabled"
        />
      </Form>
    </section>

    <hr />

    <section>
      <h2>Элементы</h2>
      <Preloader />
      <Preloader2 />
      <Preloader3 />
      <VSwitch
        v-model="switchValue"
        label="Modal"
        @click.native="switchValue = !switchValue"
      />
      <Modal v-if="switchValue" @close="switchValue = false">Modal</Modal>
    </section>

    <hr />
  </div>
</template>

<script>
import Form from "@/components/Form/Form.vue";
import VInput from "@/components/Form/Vinput/Vinput.vue";
import Validation from "@/components/Form/Validation.vue";
import VSelect from "@/components/Form/VSelect.vue";
import Button from "@/components/Button.vue";
import VText from "@/components/Form/Vinput/Text.vue";
import Checkbox from "@/components/Form/Checkbox.vue";
import RadioGroup from "@/components/Form/Radio/RadioGroup.vue";

import VSwitch from "@/components/VSwitch.vue";
import Modal from "@/components/Modals/Modal.vue";
import Preloader from "@/components/Loaders/Preloader.vue";
import Preloader2 from "@/components/Loaders/Preloader2.vue";
import Preloader3 from "@/components/Loaders/Preloader3.vue";

export default {
  components: {
    Form,
    VInput,
    VSelect,
    Validation,
    Button,
    VText,
    Checkbox,
    RadioGroup,

    VSwitch,
    Modal,
    Preloader,
    Preloader2,
    Preloader3,
  },
  data() {
    return {
      // form
      formData: {
        minmax: "0",
        length: "12",
        not: "not",
        pattern: "буквы",
        sameAs: "not sameAs",
        custom: "3",
        email: "неправильный email.ru",
      },
      serverValidatorLoading: false,
      inputValue: "VText",

      radioOptions: [
        { value: "1", title: "первый" },
        { value: "2", title: "второй" },
        { value: "3", title: "третий" },
      ],

      // elements
      switchValue: false,
      modal: false,
    };
  },
  methods: {
    alert(text) {
      alert(text);
    },
    async promise(val) {
      if (val.length === 1) {
        const prom = () => {
          return new Promise((resolve) => setTimeout(resolve, 3000));
        };
        this.serverValidatorLoading = true;
        await prom();
        this.serverValidatorLoading = false;
        console.log(val + " не прошло серверную валидацию");
        return false;
      }

      return true;
    },
  },
};
</script>

<style scoped lang="scss">
.dev {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 20px;
}

hr {
  width: 100%;
  border: 2px dashed black;
  margin: 40px 0;
}

section {
}

form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
  row-gap: 16px;
}

.custom__class {
  color: $dark-blue;

  &:hover:not(:disabled) {
    color: $blue;
  }
}
</style>
