export const state = () => ({
  filters: [],
  sortOrders: {},

  currentSort: 'RELEVANCE',
})
export const mutations = {
  SET_FILTERS(state, filters) {
    state.filters = filters
  },

  SET_SORT_ORDERS(state, sortOrders) {
    state.sortOrders = sortOrders
  },

  SET_CURRENT_SORT(state, currentSort) {
    state.currentSort = currentSort
  },
}
export const actions = {
  setCurrentSort({ commit, dispatch, rootState }, currentSort) {
    commit('SET_CURRENT_SORT', currentSort)
  },
}
