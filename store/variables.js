export const state = () => ({
  data: null,
  confirmedCity: false,
  isOpenCities: false,

  percent: {
    '001': 40,
    '002': 10,
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
  },
  currencyCoefficient: {
    '001': 6.2,
    '002': 1,
  },
  currencySymbol: {
    '001': '₸',
    '002': '₽',
  },

  shopId: '001',
  shopIds: {
    '001': ['Актау', 'Омирзак', 'Мунайши', 'Курык'],
    '002': ['Саранск'],
  },
  shopDisplayNames: {
    '001': 'Актау',
    '002': 'Саранск',
  },
  ikeaShopIds: {
    // id Самары
    '001': 442,
    // id Нижнего Новгорода
    '002': 437,
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
