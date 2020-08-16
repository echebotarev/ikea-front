import ApiService from '@/services/ApiService.js'

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
    const product = getters.availabilityProduct(payload.identifier)
    if (product && Date.now() < product.expires) {
      return product
    }

    return ApiService.getAvailabilityProduct(payload).then((response) => {
      commit(
        'ADD_AVAILABILITY_PRODUCT',
        Object.assign({}, payload, response.data, {
          expires: Date.now() + 1000 * 60 * 60 * 24,
        })
      )
    })
  },
}

export const getters = {
  availabilityProduct: (state) => (id) => {
    return state.products.find((p) => p.identifier === id) || {}
  },
}
