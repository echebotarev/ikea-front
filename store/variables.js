export const state = () => ({
  data: null,
  confirmedCity: false,
  isOpenCities: false,

  percent: {
    '001': 45,
    '002': 10,
    '003': 25,
  },
  saleForVolume: {
    '001': null,
    '002': [
      {
        down: 30000,
        up: 50000,
        sale: 2,
      },
      {
        down: 50000,
        up: null,
        sale: 4,
      },
    ],
    '003': null,
  },
  assembly: {
    '001': {
      percent: 10,
      lowPrice: 5000,
    },
    '002': {
      percent: 9,
      lowPrice: 500,
    },
    '003': {
      percent: 10,
      lowPrice: 5000,
    },
  },
  currencyCoefficient: {
    '001': 6.2,
    '002': 1,
    '003': 6.2,
  },
  currencySymbol: {
    '001': '₸',
    '002': '₽',
    '003': '₸',
  },
})

export const getters = {
  percent(state, getters, rootState) {
    return state.percent[rootState.geo.shopId]
  },

  saleForVolume(state, getters, rootState) {
    return state.saleForVolume[rootState.geo.shopId]
  },

  assembly(state, getters, rootState) {
    return state.assembly[rootState.geo.shopId]
  },

  coefficient(state, getters, rootState) {
    return state.currencyCoefficient[rootState.geo.shopId]
  },

  symbol(state, getters, rootState) {
    return state.currencySymbol[rootState.geo.shopId]
  },
}
