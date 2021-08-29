import domains from '@/constants/domains'
const shopDisplayNames = {
  '001': 'Актау',
  '002': 'Саранск',
  '003': 'Уральск',
}

export const state = () => ({
  cityName: 'Актау',
  shopId: '001',
  ikeaShopId: '442',
})

export const mutations = {
  SET_DATA(state, { key, value }) {
    state[key] = value
  },
}

export const actions = {
  nuxtServerInit({ commit, rootGetters }, { app: { $cookies } }) {
    const { city } = process.env
    const domaDomaShopId = domains[city]

    $cookies.set('domaDomaShopId', domaDomaShopId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })
    $cookies.set(
      'ikeaShopId',
      rootGetters['geo/getIkeaShopId'](domaDomaShopId),
      {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
      }
    )

    commit('SET_DATA', {
      key: 'cityName',
      value: shopDisplayNames[domaDomaShopId],
    })

    commit('SET_DATA', { key: 'shopId', value: domaDomaShopId })
    commit('SET_DATA', {
      key: 'ikeaShopId',
      value: rootGetters['geo/getIkeaShopId'](domaDomaShopId),
    })
  },
}

export const getters = {
  getDisplayName(state) {
    return state.cityName
  },

  getShopId(state) {
    return state.shopId
  },

  getIkeaShopId(state) {
    return state.ikeaShopId
  },

  getCookieId(state) {
    return state.cookieId
  },
}
