import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import svgicon from "vue-svgicon";
import Vuelidate from "vuelidate";
import DatePicker from "vue2-datepicker";

import "@/assets/icons";
import "@/assets/styles/main.scss";

// Filters
import dateFilters from "@/utils/filters/dateFilters.js";
import phoneFilters from "@/utils/filters/formatFilters.js";
import { trim } from "@/utils/filters/stringFilters.js";

const filters = {
  ...dateFilters,
  ...phoneFilters,
  trim,
};

Object.entries(filters).forEach(([key, value]) => {
  Vue.filter(key, value);
});

// Plugins
Vue.use(Vuelidate);
Vue.use(DatePicker);
Vue.use(svgicon, {
  tagName: "svgicon",
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
