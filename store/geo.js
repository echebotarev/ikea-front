import GeoService from '@/services/GeoService.js'

export const state = () => ({
  data: {},
  confirmedCity: false,
  isOpenCities: false,

  urls: {
    development: 'http://domain.doma-doma.dv:3333',
    production: 'https://domain.doma-doma.org',
  },

  shopId: '001',
  shopIds: {
    '001': ['Актау', 'Омирзак', 'Мунайши', 'Курык'],
    '002': ['Саранск'],
    '003': ['Уральск'],
    '004': ['Атырау'],
  },
  shopDisplayNames: {
    '001': 'Актау',
    '002': 'Саранск',
    '003': 'Уральск',
    '004': 'Атырау',
  },
  ikeaShopDisplayNames: {
    '001': 'Самара',
    '002': 'Нижний Новгород',
    '003': 'Самара',
    '004': 'Атырау',
  },
  ikeaShopIds: {
    // id Самары
    '001': 442,
    '003': 442,
    '004': 442,
    // id Нижнего Новгорода
    '002': 437,
  },
  domainNames: {
    '001': 'aktau',
    '002': 'saransk',
    '003': 'uralsk',
    '004': 'atyrau',
  },
  kaspiCityIds: {
    '001': '471010000',
    '003': '271010000',
    '004': '231010000',
  },
  kaspiMerchantIds: {
    '001': 'Domadoma',
    '003': 'Domadoma',
    '004': '4876008',
  },
  jivosite: {
    baseUrl: '//code-ya.jivosite.com/widget',
    '001': 'NApoQrzu9D',
    '002': 'PoWbgP3IdQ',
    '003': 'NApoQrzu9D',
    '004': 'NApoQrzu9D',
  },
  version: 13,
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
    // данные уже получены и записаны
    if (state.data.success) {
      return false
    }

    return GeoService.getLocation().then((response) => {
      response.data &&
        response.data.success &&
        commit('SET_DATA', response.data)
    })
  },

  setConfirmed({ commit }, payload) {
    commit('SET_VALUE', { key: 'confirmedCity', value: payload })
  },

  setShopId({ commit, dispatch, getters, state }, shopId) {
    if (shopId === state.shopId) {
      return false
    }

    window.SHOP_ID = shopId
    commit('SET_VALUE', { key: 'shopId', value: shopId })

    dispatch('toggleDialog', false)
    dispatch('setLocation', shopId)
  },

  setLocation({ state: { domainNames }, getters }, shopId) {
    const { hostname } = document.location
    // меняем домен, только если это необходимо
    if (hostname.includes(domainNames[shopId]) === false) {
      document.location = `${getters.getBaseUrl.replace(
        'domain',
        domainNames[shopId]
      )}${this.app.context.route.path}`
    }
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
  // getDisplayName: (state) => (shopId) =>
  //   shopId
  //     ? state.shopDisplayNames[shopId]
  //     : state.shopDisplayNames[state.shopId],

  getIkeaShopDisplayName(state) {
    return state.ikeaShopDisplayNames[state.shopId]
  },

  getIkeaShopId: (state) => (shopId) =>
    shopId ? state.ikeaShopIds[shopId] : state.ikeaShopIds[state.shopId],

  getDomainName: (state) => (shopId) => {
    console.log('GetDomainName: domainNames - ', state.domainNames)

    return shopId ? state.domainNames[shopId] : state.domainNames[state.shopId]
  },

  getBaseUrl: (state) => state.urls[process.env.NODE_ENV],
}
