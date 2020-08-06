import ApiService from '@/services/ApiService.js'

export const state = () => ({
  products: {},
  availabilityProduct: {},
})

export const mutations = {
  ADD_AVAILABILITY_PRODUCT(state, payload) {
    state.products[payload.identifier] = payload
  },

  SET_AVAILABILITY_PRODUCT(state, payload) {
    state.availabilityProduct = payload
  },
}

export const actions = {
  fetchAvailabilityProduct({ commit, state }, payload) {
    // если данные уже есть сразу отдаем
    if (state.identifier) {
      return commit('SET_AVAILABILITY_PRODUCT', state.identifier)
    }

    return ApiService.getAvailabilityProduct(payload.url).then((response) => {
      // обновляем store, если даныне обновились
      if (
        !state.products[payload.identifier] ||
        state.products[payload.identifier].status !== response.data.status
      ) {
        commit(
          'SET_AVAILABILITY_PRODUCT',
          Object.assign({}, payload, response.data)
        )
      }

      commit(
        'ADD_AVAILABILITY_PRODUCT',
        Object.assign({}, payload, response.data)
      )
    })
  },
}
