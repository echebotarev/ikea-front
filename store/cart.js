export const state = () => ({
  products: [],
})

const getProductById = (products, id) =>
  products.find((product) => product.identifier === id)

export const mutations = {
  ADD_PRODUCT(state, { product, qnt }) {
    const statedProduct = getProductById(state.products, product.identifier)
    if (statedProduct) {
      qnt = statedProduct.qnt + qnt
      return (state.products = [
        ...state.products.filter((p) => p.identifier !== product.identifier),
        {
          ...state.products.find((p) => p.identifier === product.identifier),
          qnt,
        },
      ])
    }

    state.products = [...state.products, { ...product, qnt }]
  },

  REMOVE_PRODUCT(state, { product, qnt }) {
    const statedProduct = getProductById(state.products, product.identifier)
    if (!statedProduct) {
      return false
    }

    qnt = statedProduct.qnt - qnt

    if (qnt <= 0) {
      return (state.products = state.products.filter(
        (p) => p.identifier !== statedProduct.identifier
      ))
    }

    return (state.products = [
      ...state.products.filter((p) => p.identifier !== product.identifier),
      {
        ...state.products.find((p) => p.identifier === product.identifier),
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
