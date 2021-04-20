import GeoService from '@/services/GeoService.js'

export const state = () => ({
  data: null,
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

  setShopId({ commit, dispatch, getters, rootState }, payload) {
    const {
      app: {
        $cookies,
        context: { route },
      },
    } = this

    window.SHOP_ID = payload
    commit('SET_VALUE', { key: 'shopId', value: payload })
    $cookies.set('ikeaShopId', getters.getIkeaShopId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })
    $cookies.set('domaDomaShopId', payload, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })

    const recommendationTypes = [
      'same',
      'similar',
      'style',
      'series',
      'trending',
    ]
    if (route.name === 'product-id') {
      const product = rootState.products.product
      dispatch(
        'availability/fetchAvailabilityProduct',
        {
          type: product.utag.product_type,
          identifier: product.identifier,
        },
        { root: true }
      )

      // перезапрашиваем график поставок
      dispatch('page/getDeliveryData', null, { root: true })
    } else if (route.name === 'category-id') {
      dispatch(
        'products/fetchProductsByCategoryId',
        {
          id: route.params.id,
          ...route.query,
        },
        { root: true }
      )
    }

    recommendationTypes
      .filter(
        (type) =>
          (route.name === 'category-id' && type === 'trending') ||
          route.name === 'product-id'
      )
      .map((type) =>
        dispatch(
          'products/fetchRecommendations',
          { type, isCategory: route.name === 'category-id' },
          { root: true }
        )
      )
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

  checkCity({ dispatch, state }) {
    const { city } = state.data
    this.$gtag('event', 'countCities', {
      event_category: 'Geo',
      event_label: city,
    })

    let [shopId] =
      Object.entries(state.shopIds).find(([key, values]) =>
        values.includes(city)
      ) || []

    shopId = shopId || state.shopId

    dispatch('setShopId', shopId)
    // открываем окно с выбором города
    dispatch('toggleDialog', true)
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
