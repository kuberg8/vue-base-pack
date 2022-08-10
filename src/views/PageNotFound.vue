<template>
  <div class="not__found">
    <img draggable="false" src="@/assets/img/404.svg" alt="404" />
    <h1 class="title">Такой страницы нет</h1>
    <span class="subtitle"
      >Возможно, эту страницу уже удалили, или в вашей ссылке ошибка</span
    >
    <Button
      width="160px"
      height="40px"
      text="Вернуться назад"
      class="btn-secondary"
      style="font-size: 16px"
      @click="$router.go(-1)"
    />
  </div>
</template>

<script>
import Button from "@/components/Button";

export default {
  components: {
    Button,
  },
};
</script>

<style scoped lang="scss">
.not__found {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;

  .title {
    margin: 24px 0 8px;
  }

  .subtitle {
    text-align: center;
    color: $dark-gray;
    max-width: 350px;
    margin-bottom: 24px;
  }

  img {
    max-width: 415px;
  }
}
</style>
