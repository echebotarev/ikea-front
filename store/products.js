import ApiService from '@/services/ApiService.js'
export const state = () => ({
  products: [],
  product: {},
  productCount: 0,
})
export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },

  SET_PRODUCT(state, product) {
    state.product = product
  },

  SET_PRODUCT_COUNT(state, count) {
    state.productCount = count
  },
}
export const actions = {
  fetchProductsByCategoryId({ commit }, { id, page }) {
    return ApiService.getProducts(id, page).then((response) => {
      response.data.productCount &&
        commit('SET_PRODUCT_COUNT', response.data.productCount)
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
