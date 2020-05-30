
const getters = {
  getTotalItems (state) {
    return state.totalItems
  }
}
const state = {
  totalItems: 0,
  cart: []
}
const mutations = {
  'SET_NEW_ORDER' (state, payload) {
    state.cart.push(payload)
    state.totalItems = state.cart.length || 0
  }
}
const actions = {
  addToCart ({commit}, order) {
    console.log(order);
    commit('SET_NEW_ORDER', order)
  }
}

module.exports = {
  getters,
  state,
  mutations,
  actions,
}