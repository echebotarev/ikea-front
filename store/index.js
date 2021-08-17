import domains from '@/constants/domains'
const shopDisplayNames = {
  '001': 'Актау',
  '002': 'Саранск',
  '003': 'Уральск',
}

export const state = () => ({
  cityName: 'Актау',
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
  },
}

export const getters = {
  getDisplayName(state) {
    return state.cityName
  },
}
