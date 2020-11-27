import ApiService from '@/services/ApiService.js'
export const state = () => ({
  isCategoryLoading: false,
  products: [],
  categories: [],
  category: {},
})
export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },

  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },

  SET_CATEGORY(state, category) {
    state.category = category
  },

  SET_CATEGORY_LOADING(state, value) {
    state.isCategoryLoading = value
  },
}
export const actions = {
  fetchCategories({ commit }, id) {
    commit('SET_CATEGORY_LOADING', true)
    commit('SET_CATEGORIES', [])
    commit('SET_PRODUCTS', [])

    return ApiService.getCategories(id).then((response) => {
      if (!response.data) {
        commit('SET_CATEGORY_LOADING', false)
        return false
      }

      commit('SET_CATEGORY', response.data)
      commit('SET_CATEGORIES', response.data.subcategories || [])
      commit('SET_CATEGORY_LOADING', false)

      response.data.breadcrumbs &&
        commit('page/SET_BREADCRUMBS', response.data.breadcrumbs, {
          root: true,
        })

      return true
    })
  },
}
