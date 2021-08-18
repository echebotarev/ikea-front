export const state = () => ({
  isCategoryLoading: false,
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

  SET_CATEGORY_LOADING(state, value) {
    state.isCategoryLoading = value
  },
}
export const actions = {
  fetchCategories({ commit }, id) {
    commit('SET_CATEGORIES', [])

    return this.app.$services.api.getCategories(id).then((response) => {
      if (!response.data) {
        return false
      }

      commit('SET_CATEGORY', response.data)
      commit('SET_CATEGORIES', response.data.subcategories || [])

      response.data.breadcrumbs &&
        commit('page/SET_BREADCRUMBS', response.data.breadcrumbs, {
          root: true,
        })

      return true
    })
  },
}
