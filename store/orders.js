import { KZT } from '@/constants'

import OrdersService from '@/services/OrdersService.js'
import ApiService from '@/services/ApiService.js'

const getGaTransactionData = (payload, coef, shopId = '001') => {
  const getCategory = (breadcrumbs) =>
    breadcrumbs.reduce(
      (acc, breadcrumb, index, arr) =>
        index === 0 || arr.length - 1 === index
          ? acc
          : acc === ''
          ? breadcrumb.name
          : `${acc}/${breadcrumb.name}`,
      ''
    )
  const getItems = (products, coef) =>
    products.map((product) => ({
      id: product.identifier,
      name: `${product.name}, ${product.display_identifier}`,
      brand: 'IKEA',
      category: getCategory(product.breadcrumbs.itemListElement),
      price: Math.round(product.computedPrice / coef),
      quantity: product.qnt,
    }))
  return {
    affiliation: shopId,
    transaction_id: payload.orderId,
    currency: 'RUB',
    value: Math.round(payload.payload.total / coef),
    items: getItems(payload.payload.products, coef),
  }
}

export const state = () => ({
  order: {},
  products: [],
  sale: null,
})

export const mutations = {
  SET_ORDER(state, payload) {
    state.order = payload
  },

  SET_PRODUCTS(state, payload) {
    state.products = payload
  },

  SET_SALE(state, payload) {
    state.sale = payload
  },
}

const getPrice = (payload) => {
  const value = payload.product.price.price.mainPriceProps.price.integer
  return parseInt(value.replace(/ /g, ''))
}
const getCategoryFromBreadcrumbs = (breadcrumbs) => {
  return breadcrumbs.itemListElement.reduce((acc = '', item, index, arr) => {
    if (index === 0) {
      return acc
    }

    if (index === 1) {
      return item.name
    }

    if (index === arr.length - 1) {
      return acc
    }

    return `${acc}/${item.name}`
  })
}
export const actions = {
  fetchProducts({ commit }) {
    return OrdersService.getOrder().then((response) => {
      if (response.data) {
        commit('SET_ORDER', response.data)
        commit('SET_PRODUCTS', response.data.products)
      }
    })
  },

  addProduct({ commit, rootGetters, rootState }, payload) {
    const shopId = rootState.geo.shopId

    this.$fb.track('AddToCart', { currency: 'KZT', value: getPrice(payload) })
    // this.$metrika(67230112, 'reachGoal', 'addToCart')
    this.$gtag('event', 'addToCart', {
      event_category: 'events',
      event_label: shopId,
    })

    const { product, qnt } = payload
    this.$gtag('event', 'add_to_cart', {
      currency: 'RUB',
      items: [
        {
          id: product.identifier,
          name: `${product.name}, ${product.display_identifier}`,
          brand: 'IKEA',
          category: getCategoryFromBreadcrumbs(product.breadcrumbs),
          price: Math.round(
            this.$getPrice(getPrice(payload)) /
              rootGetters['variables/coefficient']
          ),
          quantity: qnt,
        },
      ],
      value:
        Math.round(
          this.$getPrice(getPrice(payload)) /
            rootGetters['variables/coefficient']
        ) * qnt,
    })

    return OrdersService.addProduct(payload).then((response) => {
      if (response.data) {
        commit('SET_ORDER', response.data)
        commit('SET_PRODUCTS', response.data.products)

        return true
      }

      return false
    })
  },

  removeProduct({ commit, rootGetters }, payload) {
    const { product, qnt } = payload
    this.$gtag('event', 'add_to_cart', {
      currency: 'RUB',
      items: [
        {
          id: product.identifier,
          name: `${product.name}, ${product.display_identifier}`,
          brand: 'IKEA',
          category: getCategoryFromBreadcrumbs(product.breadcrumbs),
          price: Math.round(
            this.$getPrice(getPrice(payload)) /
              rootGetters['variables/coefficient']
          ),
          quantity: qnt,
        },
      ],
      value:
        Math.round(
          this.$getPrice(getPrice(payload)) /
            rootGetters['variables/coefficient']
        ) * qnt,
    })

    return OrdersService.removeProduct(payload).then((response) => {
      if (response.data) {
        commit('SET_ORDER', response.data)
        commit('SET_PRODUCTS', response.data.products)
      }
    })
  },

  updateOrder({ commit, rootState, rootGetters }, payload) {
    const shopId = rootState.geo.shopId

    this.$gtag('event', 'purchase', {
      event_category: 'events',
      event_label: shopId,
    })

    this.$gtag(
      'event',
      'purchase',
      getGaTransactionData(
        payload,
        rootGetters['variables/coefficient'],
        shopId
      )
    )
    // this.$metrika(
    //   67230112,
    //   'reachGoal',
    //   `purchase-${payload.payload.payMethod}`
    // )
    this.$fb.track('Purchase', {
      currency: 'RUB',
      value: payload.payload.total / KZT,
      paymentMethod: payload.payload.payMethod,
    })

    const shopDisplayName = rootGetters['geo/getDisplayName']

    return OrdersService.updateOrder(
      Object.assign({}, payload, {
        payload: Object.assign(payload.payload, { shopId, shopDisplayName }),
      })
    ).then((response) => {
      const order = response.data

      if (order && order.checkout) {
        commit('SET_ORDER', {})
        commit('SET_PRODUCTS', [])
      }
    })
  },

  // eslint-disable-next-line camelcase
  fetchSale({ commit }, { utm_campaign: campaign, utm_cause: cause }) {
    return cause === 'sale'
      ? ApiService.getSale({ campaign }).then((response) => {
          response.data && commit('SET_SALE', response.data)
        })
      : commit('SET_SALE', null)
  },
}

export const getters = {
  getCountCart(state) {
    let count = 0
    state.products.map((product) => (count += product.qnt))
    return count
  },
}
