<template>
  <li class="accordion__item">
    <div
      class="accordion__trigger"
      :class="{ accordion__trigger_active: visible }"
      @click="open"
    >
      <slot name="trigger" />
    </div>

    <transition
      name="accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
    >
      <div v-show="visible" class="accordion__content">
        <ul>
          <slot name="content" />
        </ul>
      </div>
    </transition>
  </li>
</template>

<script>
export default {
  inject: ["accordion"],
  props: {},
  data() {
    return {
      index: null,
    };
  },
  computed: {
    visible() {
      return this.index === this.accordion.active;
    },
  },
  created() {
    this.index = this.accordion.count++;
  },
  methods: {
    open() {
      if (this.visible) {
        this.accordion.active = null;
      } else {
        this.accordion.active = this.index;
      }
    },
    start(el) {
      el.style.height = el.scrollHeight + "px";
    },
    end(el) {
      el.style.height = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.accordion {
  &__item {
    position: relative;
    border-bottom: 1px solid #ebebeb;
    padding: 10px 20px 10px 40px;
    cursor: pointer;
  }

  &__trigger {
    display: flex;
    justify-content: space-between;
  }
}

.accordion-enter-active,
.accordion-leave-active {
  overflow: hidden;
  transition: height 0.3s ease, opacity 0.3s ease;
  will-change: height, opacity;
}

.accordion-enter,
.accordion-leave-to {
  height: 0 !important;
  opacity: 0;
}
</style>
