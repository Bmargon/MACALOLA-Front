import Vue from "vue";
import Vuex from "vuex";
// Modules
import Category from './modules/category'
import Product from './modules/product'
import Login from './modules/login'
import Cart from './modules/cart'

Vue.use(Vuex);

export default new Vuex.Store({
  getters: {
    getGlobalConfig (state) {
      return state.globalConfig
    }
  },
  state: {
    globalConfig : ''
  },
  mutations: {
    'SET_GLOBAL_CONFIG' (state, payload) {
      console.log('global config', payload);
      state.globalConfig = payload
    }
  },
  actions: {
    setGloablConfig({commit}, config) {
      commit('SET_GLOBAL_CONFIG', config)
    }
  },
  modules: {
    Category,
    Login,
    Product,
    Cart
  }
});
