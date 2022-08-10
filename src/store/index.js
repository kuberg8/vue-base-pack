import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    windowWidth: window.innerWidth,
    isMobile: window.innerWidth < 608,
  },
  mutations: {
    SET_IS_MOBILE(state, isMobile) {
      state.isMobile = isMobile;
    },
    SET_WINDOW_WIDTH(state, width) {
      state.windowWidth = width;
    },
  },
  actions: {},
  modules: {},
});
