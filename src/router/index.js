import Vue from "vue";
import VueRouter from "vue-router";
// import { state } from "@/store/";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: '/imagecaption',
    },
    {
        path: "/home",
        name: "home",
        component: () => import(/* webpackChunkName: "Results" */ "@/views/Home.vue"),
    },
    {
        path: "/imagecaption",
        name: "imagecaption",
        component: () => import(/* webpackChunkName: "Caption" */ "@/views/Captions.vue"),
    },
    {
        path: "/sensitive",
        name: "sensitive",
        component: () => import(/* webpackChunkName: "Sensitive" */ "@/views/Sensitive.vue"),
    },
    {
        path: "/datasets",
        name: "datasets",
        component: () => import(/* webpackChunkName: "Dataset" */ "@/views/Datasets.vue" )
    },
    {
        path: "*",
        redirect: "/",
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
    scrollBehavior(to, from, savedPosition) {
        // return { x: 0, y: 0 };
        if (savedPosition) {
            return savedPosition;
        } else {
            return {x: 0, y: 0};
        }
    },
});

export default router;

router.onError((err) => {
    if (err.name === "ChunkLoadError") {
        router.app.$notify.error("网络资源加载错误");
    }
});