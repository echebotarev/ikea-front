export const state = () => ({
  suggestionProducts: [],
})

export const mutations = {
  SET_SUGGESTION_PRODUCTS(state, products) {
    state.suggestionProducts = products
  },
}

export const actions = {
  fetchSuggestionProducts({ commit }, productId) {
    return this.app.$services.api
      .getSuggestionProducts(productId)
      .then((response) => {
        commit('SET_SUGGESTION_PRODUCTS', response.data)
      })
  },

  cleanSuggestionProducts({ commit }) {
    commit('SET_SUGGESTION_PRODUCTS', [])
  },
}
