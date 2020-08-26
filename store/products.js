import ApiService from '@/services/ApiService.js'
export const state = () => ({
  products: [],
  recommendations: [],
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

  SET_RECOMMENDATIONS(state, recommendations) {
    state.recommendations = recommendations
  },
}
export const actions = {
  fetchProductsByCategoryId({ commit }, { id, page = 1, sort = 'RELEVANCE' }) {
    return ApiService.getProducts(id, page, sort).then((response) => {
      response.data.productCount &&
        commit('SET_PRODUCT_COUNT', response.data.productCount)

      commit('SET_PRODUCTS', response.data.productWindow)

      commit('filters/SET_FILTERS', response.data.filters2, { root: true })
      commit('filters/SET_SORT_ORDERS', response.data.sortOrders, {
        root: true,
      })
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

  fetchRecommendations({ commit, state, rootState }) {
    const id = state.product.identifier
    const { breadcrumbs } = rootState.page
    if (!breadcrumbs) {
      return false
    }

    const categoryList = breadcrumbs
      .filter((breadcrumb, index, array) => index && index !== array.length - 1)
      .map((breadcrumb) => breadcrumb.text)

    return ApiService.getRecommendations({ id, categoryList }).then(
      (response) => {
        response.data.success &&
          commit('SET_RECOMMENDATIONS', response.data.data)
      }
    )
  },
}
