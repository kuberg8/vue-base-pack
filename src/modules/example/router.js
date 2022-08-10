const Module = () => import("./Module.vue");
// const childrens = () => import("./")

const moduleRoute = {
  path: "/example",
  component: Module,
  beforeEnter: (to, from, next) => {
    // ...
  },
  children: [
    // ...
  ],
};

export default (router) => {
  router.addRouters([moduleRoute]);
};
