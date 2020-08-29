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
    const appliedFilters = []

    payload.map((filter) => {
      if (filter.type === 'CLASS_FILTER') {
        filter.values.map(
          (value) => value.selected && appliedFilters.push(value.id)
        )
      } else if (filter.type === 'TYPED_CLASS_FILTER') {
        filter.types.map((type) =>
          type.values.map(
            (value) => value.selected && appliedFilters.push(value.id)
          )
        )
      }
    })
    state.appliedFilters = appliedFilters
  },
}
