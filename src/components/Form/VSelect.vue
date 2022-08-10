<template>
  <div
    class="select"
    :style="{ width }"
    @focusout="blurHandler"
    tabindex="-1"
    ref="select"
    :class="{ error: hasValidationError }"
  >
    <label
      @click="toggleDialog"
      class="input__label"
      v-if="label && readonly"
      >{{ label }}</label
    >

    <!-- readonly -->
    <div
      v-if="readonly"
      style="display: flex; font-size: 16px; margin-top: 4px"
    >
      <span v-if="shownSelected === placeholder"> - </span>
      <slot v-else-if="!multiple" name="item" :item="shownSelected">{{
        shownSelected
      }}</slot>
      <span v-else>
        <slot v-for="item in inputValue" name="item" :item="item">{{
          item
        }}</slot>
      </span>
    </div>

    <!-- selectable -->
    <div class="selectable-content" v-else>
      <!-- field -->
      <span
        :class="['select-field', { disabled }]"
        @click.stop="toggleDialog"
        :style="styleSelected"
        ref="field"
      >
        <span v-if="shownSelected">
          <span
            v-if="search && (selectDialog || shownSelected === placeholder)"
          >
            <svgicon
              color="#b8cad5"
              icon="search"
              width="20px"
              style="margin-right: 9px"
            ></svgicon>
            <input
              :placeholder="placeholder"
              @input="searchItems"
              v-model="searchName"
              ref="input"
            />
          </span>

          <slot
            v-else-if="shownSelected !== placeholder"
            name="item"
            :item="shownSelected"
            >{{ shownSelected }}</slot
          >

          <span v-else>{{ placeholder }}</span>
        </span>

        <span v-if="multiple" class="multiple">
          <span
            v-for="(item, index) in inputValue"
            :key="index"
            class="selected_item"
          >
            <span style="width: fit-content">
              <slot name="item" :item="itemText ? item[itemText] : item">{{
                itemText ? item[itemText] : item
              }}</slot>
            </span>
            <svgicon
              icon="clear"
              color="#536D86"
              width="20px"
              style="margin-left: 7px"
              @click.stop="deleteItem(item)"
            />
          </span>
        </span>

        <svgicon
          v-if="!search"
          icon="arrow"
          width="15px"
          :class="['dropdown-icon', { active: selectDialog }]"
        />
      </span>

      <!-- error message -->
      <slot v-if="hasValidationError" />

      <!-- dialog -->
      <transition :duration="200" name="select">
        <span v-show="selectDialog" class="selectDialog" ref="list">
          <span
            v-for="(item, index) in shownItems"
            :key="index"
            @click.stop="changeSelected(item)"
            :class="['item', { selected: isSelected(item) }]"
            :style="{ height: `${height}px` }"
          >
            <slot name="item" :item="item">
              <span style="width: fit-content">
                {{ itemText ? item[itemText] : item }}
              </span>
            </slot>

            <svgicon
              v-if="isSelected(item)"
              icon="jackdaw"
              color="#1867c0"
              height="10px"
            ></svgicon>
          </span>

          <div
            v-if="!shownItems || !shownItems.length"
            class="item"
            style="pointer-events: none; margin: 0 auto"
          >
            нет вариантов
          </div>
        </span>
      </transition>
    </div>
  </div>
</template>

<script>
import Base from "@/components/Form/Vinput/Base/Base.vue";
import Vue from "vue";

import Popper from "popper.js";
Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false;

export default {
  name: "Select",
  inject: { formData: { from: "formData", default: null } },
  extends: Base,
  props: {
    value: {
      type: [Object, Array],
      default: null,
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    itemText: {
      type: String,
      default: null,
    },
    items: {
      type: Array,
      default: null,
    },
    search: {
      type: [Boolean, String],
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    resetIfSame: {
      type: Boolean,
      default: false,
    },
    sort: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "value",
    event: "change",
  },
  data() {
    return {
      defaultValue: this.multiple ? [] : this.value,
      selectDialog: false,
      searchName: "",
      shownItems: this.items,

      poper: null,
    };
  },
  mounted() {
    this.popper = new Popper(this.$refs["field"], this.$refs["list"], {
      placement: "bottom-start",
      modifiers: {
        offset: {
          offset: "0, 10px",
        },
        preventOverflow: {
          enabled: "hide",
        },
        computeStyle: {
          gpuAcceleration: false,
        },
      },
    });
  },
  beforeDestroy() {
    if (this.popper) {
      this.popper.destroy();
    }
  },
  updated() {
    if (!this.searchName) {
      this.shownItems = this.items;
    }
  },
  computed: {
    inputValue: {
      get() {
        if (this.formData && this.name) {
          return this.formData[this.name] || this.defaultValue;
        } else {
          return this.value || this.defaultValue;
        }
      },
      set(val) {
        if (this.formData && this.name) {
          Vue.set(this.formData, this.name, val);
        }
        this.$emit("change", val);
      },
    },
    shownSelected() {
      if (this.multiple) {
        return this.inputValue.length ? null : this.placeholder;
      }

      if (!this.inputValue || !this.hasSelected) {
        return this.placeholder;
      }

      if (this.itemText) {
        return this.inputValue[this.itemText];
      }

      return this.inputValue;
    },
    styleSelect() {
      return {
        width: this.width,
        height: this.height,
      };
    },
    hasSelected() {
      if (this.inputValue instanceof Object) {
        return Object.keys(this.inputValue).length;
      } else if (this.inputValue instanceof Array) {
        return this.inputValue.length;
      } else {
        return !!this.inputValue;
      }
    },
    styleSelected() {
      return {
        color: !this.hasSelected || this.disabled ? "#B8CAD5" : null,
        width: this.width,
        height: this.height,
      };
    },
    rules() {
      const validators = {};

      if (this.required) {
        if (!this.inputValue) {
          validators.required = () => false;
        }

        if (this.inputValue && this.inputValue instanceof Object) {
          validators.required = (val) => val && Object.keys(val).length;
        }
        if (this.inputValue && this.inputValue instanceof Array) {
          validators.required = (val) => val && val.length;
        }
      }

      return validators;
    },
  },
  methods: {
    toggleDialog() {
      if (!this.loading && !this.readonly && !this.disabled) {
        if (!this.search) this.selectDialog = !this.selectDialog;
        else {
          this.selectDialog = true;
          this.$nextTick(() => {
            this.search && this.selectDialog && this.$refs.input?.focus();
          });
        }
      }
    },
    isSelected(item) {
      if (!this.inputValue) {
        return false;
      }

      if (Array.isArray(this.inputValue)) {
        return this.inputValue.some((el) => el === item);
      } else {
        return this.inputValue === item;
      }
    },
    changeSelected(item) {
      if (this.multiple) {
        let copy = this.inputValue;

        if (copy.find((el) => el === item)) {
          copy = copy.filter((el) => el !== item);
        } else {
          copy = [...copy, item];
        }
        if (this.inputValue !== copy) {
          this.inputValue = copy;
        }
      } else {
        if (this.inputValue !== item) {
          this.inputValue = item;
        } else if (this.resetIfSame) {
          this.inputValue = {};
        }
      }
      this.selectDialog = false;
    },
    searchItems() {
      if (this.searchName === "") {
        this.shownItems = this.items; // this.sortedItems;
      } else {
        this.shownItems = this.items.filter((item) => {
          let value = "";
          if (typeof this.search === "string" && item[this.search]) {
            value = item[this.search];
          } else if (this.itemText) value = item[this.itemText];
          else value = item;

          return value.toLowerCase().includes(this.searchName.toLowerCase());
        });
      }
    },
    sortedItems() {
      let items = this.items;
      if (this.sort) {
        if (this.itemText) {
          return items.sort((a, b) => a[this.itemText] > b[this.itemText]);
        } else {
          return items.sort();
        }
      } else {
        return items;
      }
    },
    deleteItem(item) {
      this.inputValue = this.inputValue.filter((el) => el !== item);
    },
    blurHandler(event) {
      const enteringParent = this.$refs.select.contains(event.relatedTarget);

      if (!enteringParent) {
        this.selectDialog = false;

        if (this.search) this.searchName = "";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.select-enter,
.select-leave-to {
  transform: translateY(5px);
  opacity: 0;
}

.select-enter-active,
.select-leave-active {
  transition: all 0.2s;
}

.select-enter-to,
.select-leave {
  transform: translateY(0);
  opacity: 1;
}

.select {
  position: relative;
  outline: none;
  text-align: left;

  .validation-error {
    color: $red;
    font-size: 12px;
    position: absolute;
  }

  .dropdown-icon {
    position: absolute;
    right: 10px;
    fill: #536d86;
    transition: transform 0.2s;

    &.active {
      transform: rotate(180deg);
    }
  }

  &.error {
    .select-field {
      border-color: red;
    }
  }
}

.select-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 48px;
  font-size: $size_l;
  transition: all 0.2s;

  border: 1px solid $gray;
  background: white;
  border-radius: 4px;
  // margin-bottom: 20px;
  padding: 0px 13px;

  // min-height: 40px;
  // font-family: Montserrat;
  // font-size: 14px;
  // line-height: 20px;

  outline: none;
  box-sizing: border-box;
  cursor: pointer;

  .multiple {
    display: flex;
    flex-shrink: 1;
    flex-wrap: wrap;
    // margin: -6px;
    margin-right: 20px;
    overflow: hidden;

    .selected_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // padding: 3px 8px;
      // color: ;
      // background: #f3f6f8;
      // border-radius: 6px;
      margin: 2px 8px 2px 0;
    }
  }

  input::placeholder {
    color: #b8cad5;
    font-size: 16px;
  }

  &.disabled {
    background: $light-gray;
    border: none;
  }
}

.selectDialog {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  background: white;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2), 0px 2px 6px rgba(0, 0, 0, 0.04),
    0px 0px 1px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  max-height: 264px;
  overflow: auto;
  width: 100%;
  z-index: 10;
  animation: showing 0.2s linear;
  border-radius: 4px;
  // font-size: 14px;

  @keyframes showing {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    border-top: 1px solid rgba(83, 109, 134, 0.1);
    min-height: 46px;
    padding: 0px 12px;

    &:hover {
      background: $light-gray;
      color: $blue;
    }

    &.selected {
      color: $blue;
      background: $light-gray;
    }
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 9px 20px;
  }

  &::-webkit-scrollbar {
    width: 8px;
    background-color: #ebeeed;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 66, 105, 0.24);
    border-radius: 4px;
  }
}
</style>
