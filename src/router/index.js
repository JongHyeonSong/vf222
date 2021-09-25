import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import Error from '../views/error.v'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },

  // {
  //   path: "/board",
  //   name: "board",
  //   component: () => import("../views/board/"),
  // },

  {
    path: "/:collection/:docc/",
    name: "collection-docc",
    component: () => import("../views/renderer.vue"),
  },
  {
    path: "/:collection/:docc/:action",
    name: "collection-docc-action",
    component: () => import("../views/renderer.vue"),
  },
  {
    path: "*",
    name: "Error",
    component: () => import("../views/error.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
