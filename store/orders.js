import OrdersService from '@/services/OrdersService.js'
import ApiService from '@/services/ApiService.js'

import ec from '@/utils/ec'

const getGaTransactionData = (payload, coef) => {
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

  return getItems(payload.payload.products, coef)
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

  addProduct({ commit, rootGetters, rootState }, payload) {
    this.$fb.track('AddToCart', { currency: 'KZT', value: getPrice(payload) })
    // this.$metrika(67230112, 'reachGoal', 'addToCart')

    const { product, qnt } = payload
    this.$gtag.ec({
      ecommerce: {
        currencyCode: 'RUB',
        add: {
          products: [
            {
              id: product.identifier,
              name: `${product.name}, ${product.display_identifier}`,
              brand: 'IKEA',
              category: ec.getCategoryFromBreadcrumbs(product.breadcrumbs),
              price: Math.round(
                this.$getPrice(getPrice(payload)) /
                  rootGetters['variables/coefficient']
              ),
              quantity: qnt,
            },
          ],
        },
      },
      event: 'gtm-ee-event',
      'gtm-ee-event-category': 'Enhanced Ecommerce',
      'gtm-ee-event-action': 'Adding a Product to a Shopping Cart',
      'gtm-ee-event-non-interaction': false,
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
    this.$gtag.ec({
      ecommerce: {
        remove: {
          products: [
            {
              id: product.identifier,
              name: `${product.name}, ${product.display_identifier}`,
              brand: 'IKEA',
              category: ec.getCategoryFromBreadcrumbs(product.breadcrumbs),
              price: Math.round(
                this.$getPrice(getPrice(payload)) /
                  rootGetters['variables/coefficient']
              ),
              quantity: qnt,
            },
          ],
        },
      },
      event: 'gtm-ee-event',
      'gtm-ee-event-category': 'Enhanced Ecommerce',
      'gtm-ee-event-action': 'Adding a Product to a Shopping Cart',
      'gtm-ee-event-non-interaction': false,
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
    const coefficient = rootGetters['variables/coefficient']

    // eslint-disable-next-line no-unreachable
    this.$gtag.ec({
      ecommerce: {
        purchase: {
          actionField: {
            id: payload.orderId,
            revenue: Math.round(payload.payload.total / coefficient),
          },
          products: getGaTransactionData(payload, coefficient),
        },
      },
      event: 'gtm-ee-event',
      'gtm-ee-event-category': 'Enhanced Ecommerce',
      'gtm-ee-event-action': 'Purchase',
      'gtm-ee-event-non-interaction': false,
    })

    // this.$metrika(
    //   67230112,
    //   'reachGoal',
    //   `purchase-${payload.payload.payMethod}`
    // )
    this.$fb.track('Purchase', {
      currency: 'RUB',
      value: payload.payload.total / rootGetters['variables/coefficient'],
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
