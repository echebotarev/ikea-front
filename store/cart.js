export const state = () => ({
  products: [],
})

const getProductById = (products, id) =>
  products.find((product) => product.identifier === id)

export const mutations = {
  ADD_PRODUCT(state, payload = {}) {
    const product = getProductById(state.products, payload.identifier)
    if (product) {
      const qnt = product.qnt + payload.qnt
      return (state.products = [
        ...state.products.filter((p) => p.identifier !== payload.identifier),
        {
          ...state.products.find((p) => p.identifier === payload.identifier),
          qnt,
        },
      ])
    }

    state.products.push(payload)
  },

  REMOVE_PRODUCT(state, payload = {}) {
    const product = getProductById(state.products, payload.identifier)
    if (!product) {
      return false
    }

    const qnt = product.qnt - payload.qnt

    if (qnt <= 0) {
      return (state.products = state.products.filter(
        (p) => p.identifier !== product.identifier
      ))
    }

    return (state.products = [
      ...state.products.filter((p) => p.identifier !== payload.identifier),
      {
        ...state.products.find((p) => p.identifier === payload.identifier),
        qnt,
      },
    ])
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
