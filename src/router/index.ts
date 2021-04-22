// @ts-nocheck

import {createRouter, createWebHistory} from "@ionic/vue-router";
import {RouteRecordRaw} from "vue-router";
import Tabs from "../views/Tabs.vue";

import store from "./../store";
import {INFOS_ARE_SET} from "@/store/types";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/pages/home"
    },
    {
        path: "/pages/",
        component: Tabs,
        children: [
            {
                path: "home",
                component: () => import("@/views/pages/Home.vue")
            },
            {
                path: "settings",
                component: () => import("@/views/pages/Settings.vue")
            },
            {
                path: "/config/",
                component: Tabs,
                children: [
                    {
                        path: "rooms",
                        component: () => import("@/views/pages/config/Rooms.vue")
                    },
                    {
                        path: "lamps",
                        component: () => import("@/views/pages/config/Lamps.vue")
                    },
                    {
                        name: "Bridge",
                        path: "bridge",
                        component: () => import("@/views/pages/config/Bridge.vue")
                    }
                ]
            },
            {
                path: "/app/",
                component: Tabs,
                children: [
                    {
                        path: "about",
                        component: () => import("@/views/pages/app/About.vue")
                    }
                ]
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    const state = !store.getters[INFOS_ARE_SET];

    if (state) {
        next();
    } else {
        next({name: 'Bridge'})
    }
})

export default router;
