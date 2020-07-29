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
          ...product,
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
        ...product,
        qnt,
      },
    ])
  },

  SET_PRODUCTS_FROM_STORAGE(state, payload) {
    state.products = payload
  },

  SAVE_CART_TO_STORAGE(state) {
    localStorage.setItem('cart', JSON.stringify(state.products))
  },
}
export const actions = {
  addProduct({ commit }, payload) {
    commit('ADD_PRODUCT', payload)
    commit('SAVE_CART_TO_STORAGE')
  },

  removeProduct({ commit }, payload) {
    commit('REMOVE_PRODUCT', payload)
    commit('SAVE_CART_TO_STORAGE')
  },

  setProducts({ commit }, payload) {
    commit('SET_PRODUCTS_FROM_STORAGE', payload)
  },
}
