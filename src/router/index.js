import Vue from "vue";
import VueRouter from "vue-router";
import Finding from "../views/finding/finding.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/finding"
  },
  {
    path: "/finding",
    name: "finding",
    component: Finding
  },
  {
    path: "/radio",
    name: "radio",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/radio/radio.vue")
  },
  {
    path: "/mine",
    name: "mine",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/mine/mine.vue")
  },
  {
    path: "/cloud",
    name: "cloud",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/cloud/cloud.vue")
  },
  {
    path: "/account",
    name: "account",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/account/account.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
