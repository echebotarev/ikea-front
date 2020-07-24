export const state = () => ({
  products: [],
})
export const mutations = {
  ADD_PRODUCT(state, payload = {}) {
    const product = getters.getProductById(payload.identifier)
    if (product) {
      return (product.qnt += payload.qnt)
    }

    state.products.push(payload)
  },

  REMOVE_PRODUCT(state, payload = {}) {
    const product = getters.getProductById(payload.identifier)
    if (!product) {
      return false
    }

    product.qnt -= payload.qnt

    if (product.qnt <= 0) {
      state.products = state.products.filter(
        (item) => item.identifier !== product.identifier
      )
    }
  },
}
export const actions = {
  addProduct({ commit }, payload) {
    commit('ADD_PRODUCT', payload)
  },

  removeProduct({ commit }, payload) {
    commit('REMOVE_PRODUCT', payload)
  },
}

export const getters = {
  getProductById: (state) => (id) =>
    state.products.find((product) => product.identifier === id),
}
