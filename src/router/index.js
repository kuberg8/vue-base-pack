import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/views/Index.vue";
import Login from "@/views/Auth/Login.vue";
import auth from "@/utils/auth";
import PageNotFound from "@/views/PageNotFound.vue";

Vue.use(VueRouter);

const routes = [
  { path: "*", component: PageNotFound },
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/dev",
    name: "Dev",
    component: () => import("@/views/Dev.vue"),
    meta: {
      layout: "default-layout",
      allowAnonymous: true,
      keepAlive: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      layout: "auth-layout",
      allowAnonymous: true,
    },
  },
  // { path: "*", component: PageNotFound }, // page 404
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.allowAnonymous && !auth.isAuthenticated()) {
    auth.unauthorizedTo = to.fullPath;
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
