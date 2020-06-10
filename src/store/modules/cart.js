
const getters = {
  getTotalItems (state) {
    return state.totalItems
  },
  getCart (state) {
    return state.cart
  },
  getTotalAmount (state) {
    return state.totalAmount
  }
}
const state = {
  totalItems: 0,
  cart: [],
  totalAmount: 0
}
const mutations = {
  'SET_NEW_ORDER' (state, payload) {
    state.cart.push(payload)
    state.totalItems = state.cart.length || 0
  },
  'UPDATE_ORDER' (state, payload) {
    state.cart.splice(payload, 1)
  },
  'CALCULATE_AMOUNT' (state) {

    state.cart.forEach(item => {
      state.totalAmount += item.price * item.quantity
    })
  }

}
const actions = {
  addToCart ({commit}, order) {
    commit('SET_NEW_ORDER', order)
    commit('CALCULATE_AMOUNT')

  },
  removeFromCart ({commit}, index) {
    commit('UPDATE_ORDER', index)
    commit('CALCULATE_AMOUNT')
  }
}

module.exports = {
  getters,
  state,
  mutations,
  actions,
}