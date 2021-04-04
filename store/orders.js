import { KZT } from '@/constants'

import OrdersService from '@/services/OrdersService.js'
import ApiService from '@/services/ApiService.js'

// Когда снова сядешь за эл-ную коммерцию обрати внимание, что KZT больше не используется
// eslint-disable-next-line no-unused-vars
const getGaTransactionData = (payload) => {
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
  const getItems = (products) =>
    products.map((product) => ({
      id: product.identifier,
      name: product.name,
      brand: 'IKEA',
      category: getCategory(product.breadcrumbs.itemListElement),
      price: product.computedPrice / KZT,
      quantity: product.qnt,
    }))

  return {
    transaction_id: payload.orderId,
    currency: 'RUB',
    value: payload.payload.total / KZT,
    items: getItems(payload.payload.products),
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
export const actions = {
  fetchProducts({ commit }) {
    return OrdersService.getOrder().then((response) => {
      if (response.data) {
        commit('SET_ORDER', response.data)
        commit('SET_PRODUCTS', response.data.products)
      }
    })
  },

  addProduct({ commit }, payload) {
    this.$fb.track('AddToCart', { currency: 'KZT', value: getPrice(payload) })
    this.$metrika(67230112, 'reachGoal', 'addToCart')
    this.$gtag('event', 'addToCart', { event_category: 'events' })

    return OrdersService.addProduct(payload).then((response) => {
      if (response.data) {
        commit('SET_ORDER', response.data)
        commit('SET_PRODUCTS', response.data.products)

        return true
      }

      return false
    })
  },

  removeProduct({ commit }, payload) {
    return OrdersService.removeProduct(payload).then((response) => {
      if (response.data) {
        commit('SET_ORDER', response.data)
        commit('SET_PRODUCTS', response.data.products)
      }
    })
  },

  updateOrder({ commit }, payload) {
    this.$gtag('event', 'purchase', { event_category: 'events' })
    this.$metrika(
      67230112,
      'reachGoal',
      `purchase-${payload.payload.payMethod}`
    )
    this.$fb.track('Purchase', {
      currency: 'RUB',
      value: payload.payload.total / KZT,
      paymentMethod: payload.payload.payMethod,
    })

    return OrdersService.updateOrder(payload).then((response) => {
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
