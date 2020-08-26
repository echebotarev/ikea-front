export const state = () => ({
  filters: [],
  sortOrders: [],
})
export const mutations = {
  SET_FILTERS(state, filters) {
    state.filters = filters
  },

  SET_SORT_ORDERS(state, sortOrders) {
    state.sortOrders = sortOrders.values
  },

  SET_CURRENT_SORT(state, currentSort) {
    state.currentSort = currentSort
  },
}
