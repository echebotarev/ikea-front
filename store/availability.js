export const state = () => ({
  products: [],
  restockAvailabilities: [],
  email: null,
})

export const mutations = {
  ADD_AVAILABILITY_PRODUCT(state, payload) {
    state.products = [
      ...state.products.filter((p) => p.identifier !== payload.identifier),
      { ...payload },
    ]
  },

  SET_RESTOCK_PRODUCT(state, payload) {
    state.restockAvailabilities = payload
  },

  SET_EMAIL(state, payload) {
    state.email = payload
  },
}

export const actions = {
  fetchAvailabilityProduct({ commit, state, getters }, payload) {
    return this.app.$services.api
      .getAvailabilityProduct(payload)
      .then((response) => {
        commit(
          'ADD_AVAILABILITY_PRODUCT',
          Object.assign({}, payload, response.data, {
            expires: Date.now() + 1000 * 60 * 60 * 24,
          })
        )
      })
  },

  fetchRestockProduct({ commit }, payload) {
    return this.app.$services.api
      .getRestockProduct(payload)
      .then((response) => {
        console.log('Resp', response)
        if (response.status === 200) {
          commit('SET_RESTOCK_PRODUCT', response.data.availabilities)
        }
      })
  },

  setAvailabilityNotification({ commit }, payload) {
    const { email } = payload
    commit('SET_EMAIL', email)

    return this.app.$services.orders
      .setAvailabilityNotification(payload)
      .then((response) => {
        return response.data
      })
  },
}

export const getters = {
  availabilityProduct: (state) => (id) => {
    return state.products.find((p) => p.identifier === id) || {}
  },

  available: (state, getters) => (id, type) => {
    const data = getters.availabilityProduct(id)

    if (
      (!data.StockAvailability ||
        !data.StockAvailability.RetailItemAvailability) &&
      !data.buyingOption
    ) {
      return null
    }

    switch (type) {
      case 'code':
        if (data.buyingOption) {
          if (data.buyingOption.cashCarry.availability.quantity === 0) {
            return 'LOW'
          } else if (data.buyingOption.cashCarry.availability.quantity < 20) {
            return 'MEDIUM'
          } else {
            return 'HIGH'
          }
        }

        return data.StockAvailability.RetailItemAvailability
          .InStockProbabilityCode['@']

      case 'qnt':
        if (data.buyingOption) {
          return data.buyingOption.cashCarry.availability.quantity
        }

        return parseInt(
          data.StockAvailability.RetailItemAvailability.AvailableStock['@']
        )

      case 'forecast':
        return data.StockAvailability
          ? data.StockAvailability.AvailableStockForecastList
              .AvailableStockForecast
          : []

      default:
        return data
    }
  },

  restockForecast(state, getters, rootState, rootGetters) {
    return state.restockAvailabilities.find(
      (item) =>
        item.classUnitKey.classUnitCode ===
        rootGetters['geo/getIkeaShopId']().toString()
    )
  },
}
