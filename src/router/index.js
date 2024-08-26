import { createRouter, createWebHashHistory } from "vue-router";
import eurcardView from "@/components/eurcard.vue";
import usdcardView from "@/components/usdcard.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: usdcardView,
  },
  { path: "/usd", component: usdcardView, name: "usdcard" },

  { path: "/eur", component: eurcardView, name: "eurcard" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
