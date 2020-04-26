import Vue from "vue";
import VueRouter from "vue-router";
// Componentes
Vue.use(VueRouter);

const routes = [
  // ==========================
  // PUBLIC ROUTES
  // =
  { path: "/", name: "Home", component: () => import('@/views/Home'), },
  // ==========================
  // PRIVATE ROUTES
  // ==========================
  { path: "/administration", name: "admin", component: () => import('@/components/shared/RouterView'), children:[
    {path: 'access', component: () => import('@/views/admin/AdminAcces')},
    {path: '', component: () => import('@/views/admin/Layout'), children: [
      {path: 'home', name: 'adminhome', component: () => import('@/views/admin/Home')},
      {path: 'orders', name: 'orders', component: () => import('@/views/admin/Orders')},
      {path: 'products', name: 'products', component: () => import('@/views/admin/Products')},
      {path: 'users', name: 'users', component: () => import('@/views/admin/Users')},
      {path: 'returns', name: 'returns', component: () => import('@/views/admin/Returns')},
    ]}
      // {path: 'orders', component: () => import('@/views/admin/Orders')}
 
  ]}
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
