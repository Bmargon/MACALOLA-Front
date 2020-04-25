import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import '@/assets/scss/main.scss'
import { BootstrapVue } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
Vue.config.productionTip = false;

Vue.use(Vuelidate)
Vue.use(BootstrapVue)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
