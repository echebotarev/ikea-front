import ApiService from '@/services/ApiService.js'
export const state = () => ({
  products: [],
  product: {},
})
export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },

  SET_PRODUCT(state, product) {
    state.product = product
  },
}
export const actions = {
  fetchProductsByCategoryId({ commit }, id) {
    return ApiService.getProducts(id).then((response) => {
      commit('SET_PRODUCTS', response.data.productWindow)
    })
  },

  fetchProductById({ commit }, id) {},
}
