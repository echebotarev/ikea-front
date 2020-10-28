import ApiService from '@/services/ApiService.js'
export const state = () => ({
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
}
export const actions = {
  fetchCategories({ commit }, id) {
    return ApiService.getCategories(id).then((response) => {
      if (!response.data) {
        return false
      }

      commit('SET_CATEGORY', response.data)
      commit('SET_CATEGORIES', response.data.subcategories)

      response.data.breadcrumbs &&
        commit('page/SET_BREADCRUMBS', response.data.breadcrumbs, {
          root: true,
        })

      return true
    })
  },
}
