import ApiService from '@/services/ApiService.js'
export const state = () => ({
  categories: [],
  category: {},
})
export const mutations = {
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
      commit('SET_CATEGORY', response.data)
      commit('SET_CATEGORIES', response.data.subcategories)
    })
  },
}
