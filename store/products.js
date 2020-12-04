import ApiService from '@/services/ApiService.js'
import getAppliedFiltersFromQuery from 'assets/utils/getAppliedFiltersFromQuery'

export const state = () => ({
  products: [],
  sameRecommendations: [],
  similarRecommendations: [],
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

  SET_SAME_RECOMMENDATIONS(state, recommendations) {
    state.sameRecommendations = recommendations
  },

  SET_SIMILAR_RECOMMENDATIONS(state, recommendations) {
    state.similarRecommendations = recommendations
  },
}
export const actions = {
  fetchProductsByCategoryId({ commit }, payload) {
    return ApiService.getProducts(payload).then((response) => {
      if (!response.data || response.data.code) {
        return false
      }

      ;(response.data.productCount || response.data.productCount === 0) &&
        commit('SET_PRODUCT_COUNT', response.data.productCount)

      commit('SET_PRODUCTS', response.data.productWindow)

      commit('filters/SET_FILTERS', response.data.filters2, { root: true })
      commit('filters/SET_SORT_ORDERS', response.data.sortOrders, {
        root: true,
      })
      commit(
        'filters/SET_APPLIED_FILTERS',
        getAppliedFiltersFromQuery(payload),
        {
          root: true,
        }
      )
    })
  },

  fetchProductsByWord({ commit }, payload) {
    return ApiService.getProductsByWord(encodeURI(payload)).then((response) => {
      commit('SET_PRODUCTS', response.data.searchResultPage.productWindow)
    })
  },

  fetchProductById({ commit }, id) {
    return ApiService.getProduct(id).then((response) => {
      if (!response.data) {
        return false
      }

      commit('SET_PRODUCT', response.data)

      response.data.breadcrumbs &&
        commit('page/SET_BREADCRUMBS', response.data.breadcrumbs, {
          root: true,
        })

      return true
    })
  },

  fetchSameRecommendations({ commit, state }) {
    const id = state.product.identifier

    return ApiService.getRecommendations({
      id,
      type: 'same-category',
    }).then((response) => {
      response.status >= 200 &&
        commit('SET_SAME_RECOMMENDATIONS', response.data)
    })
  },

  fetchSimilarRecommendations({ commit, state, rootState }) {
    const id = state.product.identifier
    const { breadcrumbs } = rootState.page
    if (!breadcrumbs) {
      return false
    }

    const categoryList = breadcrumbs
      .filter((breadcrumb, index, array) => index && index !== array.length - 1)
      .map((breadcrumb) => breadcrumb.text)

    return ApiService.getRecommendations({
      id,
      type: 'similar',
      categoryList,
    }).then((response) => {
      response.status >= 200 &&
        commit('SET_SIMILAR_RECOMMENDATIONS', response.data.data)
    })
  },
}
