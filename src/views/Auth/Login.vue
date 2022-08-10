<template>
  <Form class="form__container">
    <VInput name="login" required placeholder="Логин">
      <Validation for="required">Поле обязательно</Validation>
    </VInput>

    <VInput name="password" type="password" required placeholder="Пароль">
      <Validation for="required">Поле обязательно</Validation>
    </VInput>

    <Checkbox label="Запомнить на этом устройстве" small-text name="remember" />

    <Button width="228px" height="48px" text="ВХОД" class="btn-primary" />
  </Form>
</template>

<script>
import Form from "@/components/Form/Form";
import VInput from "@/components/Form/Vinput/Vinput";
import Validation from "@/components/Form/Validation";
import Button from "@/components/Button";
import Checkbox from "@/components/Form/Checkbox";

export default {
  data() {
    return {
      login: "",
      password: "",
    };
  },
  components: {
    Form,
    VInput,
    Validation,
    Button,
    Checkbox,
  },
};
</script>

<style scoped lang="scss">
.form__container {
  max-width: 228px;
}
</style>
