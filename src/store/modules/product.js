const axios = require('axios').default

const getters = {
  producst: () => state.productsDB,
  product: () => state.productDB,
}
const state = {
  productsDB: [],
  productDB: {}
}
const mutations = {
  'SETALLPRODUCTS' (state, payload) {
    state.productsDB = payload.data.productDB
  },
  'SETPRODUCT' (state, payload) {
    state.productDB = payload.data.productDB[0]
  }
}
const actions = {
  async getAllProducts({commit}) {
    const products = await axios.get('https://www.macalola.com/product', {
      headers: {
        'authorization': sessionStorage.getItem('adminToken'),
      }
    })
    commit('SETALLPRODUCTS', products)
  },
  async getSingleProduct({commit}, ref) {
    const product = await axios.get(`https://www.macalola.com/product/${ref}`, {
      headers: {
        'authorization': sessionStorage.getItem('adminToken'),
      }
    })
    commit('SETPRODUCT', product)
  },
  
}

module.exports = {
  getters,
  state,
  mutations,
  actions,
}