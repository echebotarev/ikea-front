import GeoService from '@/services/GeoService.js'

export const state = () => ({
  data: null,
  confirmedCity: false,
  isOpenCities: false,

  percent: {
    '001': 40,
    '002': 30,
  },
  assemblyPercent: {
    '001': 10,
    '002': 5,
  },
  currencyCoefficient: {
    '001': 6,
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
  version: 3,
})

export const mutations = {
  SET_DATA(state, payload) {
    state.data = payload
  },

  SET_VALUE(state, { key, value }) {
    state[key] = value
  },
}

export const actions = {
  fetchLocation({ state, commit }) {
    if (state.data) {
      return false
    }

    return GeoService.getLocation().then((response) => {
      response.data && commit('SET_DATA', response.data)
    })
  },

  setConfirmed({ commit }, payload) {
    commit('SET_VALUE', { key: 'confirmedCity', value: payload })
  },

  setShopId({ commit }, payload) {
    commit('SET_VALUE', { key: 'shopId', value: payload })
  },

  toggleDialog({ commit, state }, payload = null) {
    if (payload === null) {
      return commit('SET_VALUE', {
        key: 'isOpenCities',
        value: !state.isOpenCities,
      })
    }

    return commit('SET_VALUE', { key: 'isOpenCities', value: payload })
  },

  checkCity({ commit, state }) {
    const { city } = state.data
    this.$gtag('event', 'countCities', {
      event_category: 'Geo',
      event_label: city,
    })

    const [shopId] =
      Object.entries(state.shopIds).find(([key, values]) =>
        values.includes(city)
      ) || []

    if (shopId) {
      commit('SET_VALUE', { key: 'shopId', value: shopId })
    } else {
      // открываем окно с выбором города
      commit('SET_VALUE', { key: 'isOpenCities', value: true })
    }
  },
}

export const getters = {
  getDisplayName(state) {
    return state.shopDisplayNames[state.shopId]
  },

  getIkeaShopId(state) {
    return state.ikeaShopIds[state.shopId]
  },

  percent(state) {
    return state.percent[state.shopId]
  },

  assemblyPercent(state) {
    return state.assemblyPercent[state.shopId]
  },

  coefficient(state) {
    return state.currencyCoefficient[state.shopId]
  },

  symbol(state) {
    return state.currencySymbol[state.shopId]
  },
}
