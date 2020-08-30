export const state = () => ({
  filters: [],
  sortOrders: [],

  appliedFilters: [],
  openPanels: [],
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

  SET_OPEN_PANELS(state, payload) {
    state.openPanels = payload
  },
}

export const actions = {
  setOpenPanels({ commit }, payload) {
    commit('SET_OPEN_PANELS', payload)
  },
}
