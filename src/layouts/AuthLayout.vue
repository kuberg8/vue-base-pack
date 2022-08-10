<template>
  <div class="auth-layout">
    <header></header>
    <div class="container">
      <main>
        <router-view />
      </main>

      <footer></footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
