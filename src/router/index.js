import Vue from "vue";
import VueRouter from "vue-router";
// import { state } from "@/store/";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/*webpackChunkName: "Home" */ "@/views/Home.vue"),
  },
  // {
  //   path: "/result",
  //   name: "result",

  //   component: () => import(/* webpackChunkName: "Results" */ "@/views/Results.vue"),
  // },
  {
    path: "/captions",
    name: "captions",

    component: () => import(/* webpackChunkName: "Caption" */ "@/views/Captions.vue"),
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  // base:
  //   process.env.NODE_ENV !== "production"
  //     ? process.env.BASE_URL
  //     : process.env.BASE_URL  ,
  routes,
  scrollBehavior(to, from, savedPosition) {
    // return { x: 0, y: 0 };
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;

router.onError((err) => {
  if (err.name === "ChunkLoadError") {
    router.app.$notify.error("网络资源加载错误");
  }
});
// router.beforeEach((to, from, next) => {
//   console.log(to.path, state.isLogin);
//   if (to.path === "/user" && state.isLogin) {
//     return next("/");
//   }
//   if (to.meta.loginRequired && !state.isLogin) {
//     return next("/user");
//   }

//   next();
// });
