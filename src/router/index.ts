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
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
