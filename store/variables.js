export const state = () => ({
  data: null,
  confirmedCity: false,
  isOpenCities: false,

  percent: {
    '001': 45,
    '002': 10,
    '003': 35,
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
  pickupPoint: {
    '001': null,
    '002': null,
    '003': 'г. Уральск, ул. Елизарова, д. 48',
  },
  deliveryCost: {
    '001': 0,
    '002': 0,
    '003': 4000,
  },
})

export const mutations = {
  SET_DELIVERY_COST(state, { shopId, price }) {
    state.deliveryCost[shopId] = price
  },
}

export const actions = {
  setDeliveryCost({ commit, rootState }, price) {
    commit('SET_DELIVERY_COST', { shopId: rootState.geo.shopId, price })
  },
}

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

  getPickupPoint(state, getters, rootState) {
    return state.pickupPoint[rootState.geo.shopId]
  },

  getDeliveryCost(state, getters, rootState) {
    return state.deliveryCost[rootState.geo.shopId]
  },
}
