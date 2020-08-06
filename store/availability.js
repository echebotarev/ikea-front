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

    // если данных нет, то устанавливаем пустой объект
    // и запускаем поиск
    commit('SET_AVAILABILITY_PRODUCT', {})

    ApiService.getAvailabilityProduct(payload.url).then((response) => {
      commit(
        'ADD_AVAILABILITY_PRODUCT',
        Object.assign({}, payload, response.data)
      )

      commit(
        'SET_AVAILABILITY_PRODUCT',
        Object.assign({}, payload, response.data)
      )
    })
  },
}
