import * as VueRouter from "vue-router";

import routesInfo from "./routesInfo.ts";

const router = VueRouter.createRouter({
    // history: VueRouter.createWebHashHistory(),
    history: VueRouter.createWebHistory(),
    routes: routesInfo,
});

export default router;
