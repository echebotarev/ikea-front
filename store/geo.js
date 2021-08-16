import GeoService from '@/services/GeoService.js'

export const state = () => ({
  data: {},
  confirmedCity: false,
  isOpenCities: false,

  currencySymbol: {
    '001': '₸',
    '002': '₽',
  },

  shopId: '001',
  shopIds: {
    '001': ['Актау', 'Омирзак', 'Мунайши', 'Курык'],
    '002': ['Саранск'],
    '003': ['Уральск'],
  },
  shopDisplayNames: {
    '001': 'Актау',
    '002': 'Саранск',
    '003': 'Уральск',
  },
  ikeaShopDisplayNames: {
    '001': 'Самара',
    '002': 'Нижний Новгород',
    '003': 'Самара',
  },
  ikeaShopIds: {
    // id Самары
    '001': 442,
    '003': 442,
    // id Нижнего Новгорода
    '002': 437,
  },
  domainNames: {
    '001': 'aktau',
    '002': 'saransk',
    '003': 'uralsk',
  },
  jivosite: {
    baseUrl: '//code-ya.jivosite.com/widget',
    '001': 'NApoQrzu9D',
    '002': 'PoWbgP3IdQ',
    '003': 'NApoQrzu9D',
  },
  version: 6,
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
    if (Object.keys(state.data).length !== 0) {
      return false
    }

    return GeoService.getLocation().then((response) => {
      response.data && commit('SET_DATA', response.data)
    })
  },

  setConfirmed({ commit }, payload) {
    commit('SET_VALUE', { key: 'confirmedCity', value: payload })
  },

  setShopId({ commit, dispatch, getters, state }, payload) {
    if (payload === state.shopId) {
      return false
    }

    const {
      app: { $cookies },
    } = this

    window.SHOP_ID = payload
    commit('SET_VALUE', { key: 'shopId', value: payload })
    $cookies.set('ikeaShopId', getters.getIkeaShopId(), {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })
    $cookies.set('domaDomaShopId', payload, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })

    dispatch('toggleDialog', false)

    document.location = `http://${state.domainNames[payload]}.doma-doma.dv:3333${this.app.context.route.path}`
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

  checkCity({ dispatch, state }, isConfirmed) {
    const { city } = state.data

    const [shopId] =
      Object.entries(state.shopIds).find(([key, values]) =>
        values.includes(city)
      ) || []

    if (shopId && isConfirmed) {
      dispatch('setShopId', shopId)
    } else {
      dispatch('setShopId', state.shopId)
      dispatch('toggleDialog', true)
    }
  },

  initJivosite({ dispatch, state }, shopId) {
    shopId = shopId || state.shopId
    const jivositeId = state.jivosite[shopId]
    if (!jivositeId) {
      return false
    }

    const script = document.createElement('script')
    script.async = true
    script.src = `${state.jivosite.baseUrl}/${jivositeId}`

    document.head.appendChild(script)
  },
}

export const getters = {
  getDisplayName(state) {
    return state.shopDisplayNames[state.shopId]
  },

  getIkeaShopDisplayName(state) {
    return state.ikeaShopDisplayNames[state.shopId]
  },

  getIkeaShopId: (state) => (shopId) =>
    shopId ? state.ikeaShopIds[shopId] : state.ikeaShopIds[state.shopId],
}
