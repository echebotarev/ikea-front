import getAppliedFiltersFromQuery from 'assets/utils/getAppliedFiltersFromQuery'

export const state = () => ({
  products: [],
  saleProducts: [],
  sameRecommendations: [],
  similarRecommendations: [],
  styleRecommendations: [],
  seriesRecommendations: [],
  trendingRecommendations: [],
  product: {},
  productCount: 0,
})

export const mutations = {
  SET_DATA(state, { key, value }) {
    state[key] = value
  },

  SET_PRODUCTS(state, products) {
    state.products = products
  },

  SET_PRODUCT(state, product) {
    state.product = product
  },

  SET_PRODUCT_COUNT(state, count) {
    state.productCount = count
  },

  SET_SAME_RECOMMENDATIONS(state, recommendations) {
    state.sameRecommendations = recommendations
  },

  SET_SIMILAR_RECOMMENDATIONS(state, recommendations) {
    state.similarRecommendations = recommendations
  },

  SET_STYLE_RECOMMENDATIONS(state, recommendations) {
    state.styleRecommendations = recommendations
  },

  SET_SERIES_RECOMMENDATIONS(state, recommendations) {
    state.seriesRecommendations = recommendations
  },

  SET_TRENDING_RECOMMENDATIONS(state, recommendations) {
    state.trendingRecommendations = recommendations
  },
}

export const actions = {
  fetchProductsByCategoryId({ commit, dispatch }, payload) {
    const ikeaShopId = this.app.$cookies.get('ikeaShopId')
    dispatch('clearCategory')

    return this.app.$services.api
      .getProducts(payload, ikeaShopId)
      .then((response) => {
        if (!response.data || response.data.code) {
          return false
        }

        ;(response.data.productCount || response.data.productCount === 0) &&
          commit('SET_PRODUCT_COUNT', response.data.productCount)

        commit('SET_PRODUCTS', response.data.productWindow)

        commit('filters/SET_FILTERS', response.data.filters2, { root: true })
        commit('filters/SET_SORT_ORDERS', response.data.sortOrders, {
          root: true,
        })
        commit(
          'filters/SET_APPLIED_FILTERS',
          getAppliedFiltersFromQuery(payload),
          {
            root: true,
          }
        )
      })
  },

  fetchProductsByWord({ commit }, payload) {
    return this.app.$services.api
      .getProductsByWord(encodeURI(payload))
      .then((response) => {
        commit('SET_PRODUCTS', response.data)
      })
  },

  // ф-ия используется для получения сырых данных о товаре
  // для переключения между вариантами товара в категории
  getProductById({ commit }, { id }) {
    return this.app.$services.api.getProduct(id).then((response) => {
      if (!response.data || response.status !== 200) {
        return false
      }

      return response.data
    })
  },

  fetchProductById({ commit, dispatch, state }, { id, isSales = false }) {
    return this.app.$services.api.getProduct(id).then(async (response) => {
      if (!response.data) {
        return false
      }

      /* получение данных о скидках */
      if (isSales && state.saleProducts.length === 0) {
        await dispatch('fetchSaleProducts')
      }
      const salesProduct = isSales
        ? state.saleProducts.find((sp) => sp.productId === id)
        : null
      /* получение данных о скидках */

      commit(
        'SET_PRODUCT',
        Object.assign(response.data, { sales: salesProduct })
      )

      response.data.breadcrumbs &&
        commit('page/SET_BREADCRUMBS', response.data.breadcrumbs, {
          root: true,
        })

      return true
    })
  },

  fetchProductsByIds({ commit, state }, { ids, isSaleProducts = false }) {
    return this.app.$services.api.getProductsByIds(ids).then((response) => {
      if (response.data) {
        // мерджим товары с данными о скидке
        isSaleProducts
          ? commit(
              'SET_PRODUCTS',
              response.data.map((p) => {
                p.sales = state.saleProducts.find(
                  (sp) => sp.productId === p.identifier
                )

                return p
              })
            )
          : commit('SET_PRODUCTS', response.data)
      }
    })
  },

  fetchRecommendations(
    { commit, state, rootState },
    { type, isCategory = false }
  ) {
    const DICT_COMMIT = {
      same: 'SET_SAME_RECOMMENDATIONS',
      similar: 'SET_SIMILAR_RECOMMENDATIONS',
      style: 'SET_STYLE_RECOMMENDATIONS',
      series: 'SET_SERIES_RECOMMENDATIONS',
      trending: 'SET_TRENDING_RECOMMENDATIONS',
    }

    const id = state.product.identifier
    const { breadcrumbs } = rootState.page
    if (!breadcrumbs) {
      return false
    }

    const categoryList = breadcrumbs
      .filter(
        (breadcrumb, index, array) =>
          index && (isCategory || index !== array.length - 1)
      )
      .map((breadcrumb) => breadcrumb.text)

    return this.app.$services.api
      .getRecommendations({
        id,
        type,
        categoryList,
      })
      .then((response) => {
        if (response.status === 200) {
          commit(DICT_COMMIT[type], response.data)
        }
      })
  },

  fetchSaleProducts({ commit }) {
    return this.app.$services.orders.getSaleProducts().then((response) => {
      response.data &&
        commit('SET_DATA', { key: 'saleProducts', value: response.data })
    })
  },

  clearCategory({ commit }) {
    commit('SET_PRODUCTS', [])
    commit('SET_PRODUCT_COUNT', 0)
    commit('filters/SET_FILTERS', [], { root: true })
    commit(
      'filters/SET_SORT_ORDERS',
      { values: [] },
      {
        root: true,
      }
    )
  },
}
