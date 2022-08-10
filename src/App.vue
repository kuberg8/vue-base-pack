<template>
  <div :key="appKey">
    <Modal v-if="alert" @close="alert = false" width="544px" height="174px">
      <h2 class="center">{{ alertText }}</h2>
    </Modal>

    <Modal v-if="error" @close="error = false" width="444px">
      <div class="error">
        <svgicon icon="warn" width="90px"></svgicon>
        <h2>К сожалению, произошла ошибка.</h2>
        <div>{{ errorText || "Повторите попытку позже" }}</div>
      </div>
    </Modal>

    <Modal v-if="confrim" @close="confrim = false" width="544px" height="174px">
      <h2 style="height: 100%">{{ confrimText }}</h2>
      <div class="button__wraper">
        <Button
          @click="confrimCalback"
          :loading="confrimLoading"
          class="btn-primary"
          width="121px"
          height="40px"
          :text="confrimAgreed"
          style="margin-right: 8px"
        />
        <Button
          class="btn-secondary"
          width="96px"
          height="40px"
          text="Отмена"
          @click="confrim = false"
        />
      </div>
    </Modal>

    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import AuthLayout from "@/layouts/AuthLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import { mapMutations, mapState } from "vuex";
import Modal from "@/components/Modals/Modal.vue";
import Button from "@/components/Button.vue";

export default {
  components: {
    AuthLayout,
    DefaultLayout,
    Modal,
    Button,
  },
  data() {
    return {
      appKey: "",

      alert: false,
      alertText: "",

      confrim: false,
      confrimText: "",
      confrimAgreed: "",
      confrimCalback: null,
      confrimLoading: false,

      error: false,
      errorText: "",
    };
  },
  created() {
    window.addEventListener("unhandledrejection", (evt) => {
      const err = evt.reason;
      this.errorText = err.response?.data?.message;
      this.error = true;
    });
    window.addEventListener("resize", () =>
      this.SET_WINDOW_WIDTH(window.innerWidth)
    );

    this.$root.alert = (text) => {
      this.alertText = text;
      this.alert = true;
    };

    this.$root.confrim = (text = "", callback = null, confrimAgreed = "Ок") => {
      this.confrimText = text;
      this.confrimAgreed = confrimAgreed;
      this.confrim = true;
      this.confrimCalback = async () => {
        this.confrimLoading = true;
        await callback();
        this.confrimLoading = false;
        this.confrim = false;
      };
    };
  },
  computed: {
    ...mapState(["windowWidth"]),
    layout() {
      return this.$route.meta.layout || "default-layout";
    },
  },
  methods: {
    ...mapMutations(["SET_IS_MOBILE", "SET_WINDOW_WIDTH"]),
  },
  watch: {
    windowWidth: function () {
      this.SET_IS_MOBILE(this.windowWidth < 608);
    },
  },
};
</script>

<style lang="scss"></style>
