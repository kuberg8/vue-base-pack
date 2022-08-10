<template>
  <li :class="['node-tree', { dashed: isOpen }]">
    <div class="subdivision">
      <button
        v-if="node.children && node.children.length"
        @click="isOpen = !isOpen"
      >
        <svgicon :icon="isOpen ? 'minus' : 'plus'" width="20px"></svgicon>
      </button>
      <span style="margin-left: 13px">{{ node.text }}</span>
    </div>

    <transition name="slide-fade">
      <ul
        v-if="node.children && node.children.length && isOpen"
        class="children"
      >
        <node
          v-for="child in node.children"
          :node="child"
          :key="child.id"
          class="children__item"
        ></node>
      </ul>
    </transition>
  </li>
</template>

<script>
export default {
  name: "node",
  props: {
    node: Object,
  },
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.node-tree {
  position: relative;

  .subdivision {
    display: flex;
    align-items: center;
    border: 1px solid #b8cad5;
    border-radius: 4px;
    height: 100%;
    margin-bottom: 12px;
    width: 472px;
    height: 48px;

    button {
      height: 100%;
      width: 45px;
      color: $blue;
      border-right: 1px solid #b8cad5;
      border-radius: 0px;
    }
  }

  &.dashed::after {
    content: "";
    position: absolute;
    top: 48px;
    left: 22.5px;
    border: 1px dashed $gray;
    height: calc(100% - 72px);
  }

  .children {
    margin-left: 45px;

    .children__item {
      &::before {
        content: "";
        position: absolute;
        top: 24px;
        right: 100%;
        width: 22.5px;
        border: 1px dashed $gray;
      }
    }
  }
}
</style>
