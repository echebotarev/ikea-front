import GeoService from '@/services/GeoService.js'

export const state = () => ({
  data: null,
  shopId: '001',
  shopIds: {
    '001': ['Актау', 'Омирзак'],
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

export const mutations = {
  SET_DATA(state, payload) {
    state.data = payload
  },

  SET_SHOP_ID(state, payload) {
    state.shopId = payload
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
}

export const getters = {
  getDisplayName(state) {
    return state.shopDisplayNames[state.shopId]
  },

  getIkeaShopId(state) {
    return state.ikeaShopIds[state.shopId]
  },
}
