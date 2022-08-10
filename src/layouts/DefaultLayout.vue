<template>
  <div class="default-layout">
    <transition name="sidemenu" :duration="250">
      <aside></aside>
    </transition>

    <transition name="main" :duration="250">
      <main>
        <keep-alive v-if="keepAlive" :max="6">
          <router-view />
        </keep-alive>
        <router-view v-else />
      </main>
    </transition>

    <footer></footer>
  </div>
</template>

<script>
export default {
  computed: {
    keepAlive() {
      return this.$route?.meta?.keepAlive;
    },
  },
};
</script>
