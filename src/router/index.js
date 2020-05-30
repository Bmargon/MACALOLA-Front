import Vue from "vue";
import VueRouter from "vue-router";

// Componentes
Vue.use(VueRouter);

const routes = [
  // ==========================
  // PUBLIC ROUTES
  // =
  { path: "/", name: "", component: () => import('@/views/public/Layout'), children: [
    {path: '', name: 'home', component: () => import('@/views/public/Home')},
    {path: '/c/:cat', name: 'category', component: () => import('@/views/public/Category')},
    {path: '/i/:cat/:ref', name: 'product', component: () => import('@/views/public/Product')},
    {path: 'contact', name: 'contact', component: () => import('@/views/public/Contact')},
  ] },
  // ==========================
  // PRIVATE ROUTES
  // ==========================
  { path: "/administration", name: "admin", component: () => import('@/components/shared/RouterView'), children:[
    {path: 'access', component: () => import('@/views/admin/AdminAcces')},
    {path: '', component: () => import('@/views/admin/Layout'),  beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem('adminToken')) {
        next()
      } else {
        next({path: '/administration/access'})
      }
    }, children: [
      {path: 'home', name: 'adminhome', component: () => import('@/views/admin/Home')},
      {path: 'orders', name: 'orders', component: () => import('@/views/admin/Orders')},
      {path: 'products', name: 'products', component: () => import('@/views/admin/Products')},
      {path: 'product/:ref', name: 'product', component: () => import('@/views/admin/GetSingleProduct')},
      {path: 'users', name: 'users', component: () => import('@/views/admin/Users')},
      {path: 'returns', name: 'returns', component: () => import('@/views/admin/Returns')},
      {path: 'template', name: 'template', component: () => import('@/views/admin/Template')},
    ]}
      // {path: 'orders', component: () => import('@/views/admin/Orders')}
 
  ]},
  { path: "*", redirect: '/'}
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
