import Vue from "vue";
import VueRouter from "vue-router";
// Componentes
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  // ==========================
  // PUBLIC ROUTES
  // =
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "macalola",
    }
  },
  // ==========================
  // PRIVATE ROUTES
  // ==========================
  {
    path: "/administration",
    name: "admin",
    meta: {
      title: "administracion",
    },
    component: () => import('@/views/admin/AdminDashboard')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
