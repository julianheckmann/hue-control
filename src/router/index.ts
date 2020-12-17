import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Tabs from "../views/Tabs.vue";

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

export default router;
