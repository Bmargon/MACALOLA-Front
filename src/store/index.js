import Vue from "vue";
import Vuex from "vuex";
// Modules
import Category from './modules/category'
import Login from './modules/login'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Category,
    Login
  }
});
