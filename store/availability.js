import ApiService from '@/services/ApiService.js'
import OrderService from '@/services/OrdersService.js'

export const state = () => ({
  products: [],
})

export const mutations = {
  ADD_AVAILABILITY_PRODUCT(state, payload) {
    state.products = [
      ...state.products.filter((p) => p.identifier !== payload.identifier),
      { ...payload },
    ]
  },
}

export const actions = {
  fetchAvailabilityProduct({ commit, state, getters }, payload) {
    return ApiService.getAvailabilityProduct(payload).then((response) => {
      commit(
        'ADD_AVAILABILITY_PRODUCT',
        Object.assign({}, payload, response.data, {
          expires: Date.now() + 1000 * 60 * 60 * 24,
        })
      )
    })
  },

  setAvailabilityNotification(ctx, payload) {
    return OrderService.setAvailabilityNotification(payload).then(
      (response) => {
        return response.data
      }
    )
  },
}

export const getters = {
  availabilityProduct: (state) => (id) => {
    return state.products.find((p) => p.identifier === id) || {}
  },
}
