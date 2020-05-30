import Vue from "vue";
import Vuex from "vuex";
// Modules
import Category from './modules/category'
import Product from './modules/product'
import Login from './modules/login'
import Cart from './modules/cart'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Category,
    Login,
    Product,
    Cart
  }
});
