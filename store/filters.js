export const state = () => ({
  filters: [],
  sortOrders: [],

  appliedFilters: [],
})
export const mutations = {
  SET_FILTERS(state, filters) {
    state.filters = filters
  },

  SET_SORT_ORDERS(state, sortOrders) {
    state.sortOrders = sortOrders.values
  },

  SET_APPLIED_FILTERS(state, payload) {
    state.appliedFilters = payload
  },
}
