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
    meta: { index: 0, keepAlive: true },
    component: Finding
  },
  {
    path: "/singer",
    name: "singer",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: { index: 1, keepAlive: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/singer/singer.vue")
  },
  {
    path: "/mine",
    name: "mine",
    meta: { index: 1, keepAlive: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/mine/mine.vue")
  },
  {
    path: "/cloud",
    name: "cloud",
    meta: { index: 1, keepAlive: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/cloud/cloud.vue")
  },
  {
    path: "/account",
    name: "account",
    meta: { index: 1 },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/account/account.vue")
  },
  {
    path: "/songMenu/:id",
    name: "song-menu",
    meta: { index: 2, keepAlive: false },
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/finding/song-menu/songMenu.vue"
      )
  },
  {
    path: "/playing/:songId/:songPic",
    name: "playing",
    meta: { index: 2 },
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/finding/song-menu/playing.vue"
      )
  },
  {
    path: "/singer-detail/:singerId/:singerPic/:singerName",
    name: "singer-detail",
    meta: { index: 2, keepAlive: true },
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/singer/singer-detail/singerDetail.vue"
      )
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
