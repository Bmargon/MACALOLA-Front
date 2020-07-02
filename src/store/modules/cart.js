
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
  'REMOVE_ITEM_CART' (state, payload) {
    state.cart.splice(payload, 1)
    state.totalItems = state.cart.length || 0
  },
  'CALCULATE_AMOUNT' (state) {
    state.cart.forEach(item => {
      state.totalAmount = item.price * item.quantity
    })
  },
  'REFRESH_CART' (state, payload) {
    state.cart[payload.index] = payload.item
  }

}
const actions = {
  addToCart ({commit}, order) {
    commit('SET_NEW_ORDER', order)
    commit('CALCULATE_AMOUNT')
  },
  removeFromCart ({commit}, index) {
    commit('REMOVE_ITEM_CART', index)
    commit('CALCULATE_AMOUNT')
  },
  refreshCart ( {commit}, order) {
    commit('REFRESH_CART', order)
    commit('CALCULATE_AMOUNT')
  }
}

module.exports = {
  getters,
  state,
  mutations,
  actions,
}