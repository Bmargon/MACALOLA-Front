const axios = require('axios').default

const getters = {
  categories: () => state.categoryDB
}
const state = {
  categoryDB: []
}
const mutations = {
  'SETCATEGORIES' (state, payload) {
    state.categoryDB = payload.data.categoryDB
}
}
const actions = {
  async getCategories({commit}) {
    const categories = await axios.get('http://localhost:3000/category')
    commit('SETCATEGORIES', categories)
  }
}

module.exports = {
  getters,
  state,
  mutations,
  actions,
}