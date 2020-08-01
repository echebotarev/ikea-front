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

  fetchProductsByWord({ commit }, payload) {
    return ApiService.getProductsByWord(encodeURI(payload)).then((response) => {
      commit('SET_PRODUCTS', response.data.searchResultPage.productWindow)
    })
  },

  fetchProductById({ commit }, id) {
    return ApiService.getProduct(id).then((response) => {
      commit('SET_PRODUCT', response.data)

      response.data.breadcrumbs &&
        commit('page/SET_BREADCRUMBS', response.data.breadcrumbs, {
          root: true,
        })
    })
  },
}
