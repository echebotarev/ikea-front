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
  SET_DATA(state, { key, value }) {
    state[key] = value
  },

  SET_SALE(state, payload) {
    state.sale = payload
  },
}

export const actions = {
  fetchProducts({ commit }) {
    return this.app.$services.orders.getOrder().then((response) => {
      if (response.data) {
        commit('SET_DATA', { key: 'order', value: response.data })
        commit('SET_DATA', { key: 'products', value: response.data.products })
      }
    })
  },

  addProduct({ commit, dispatch, rootGetters, rootState }, payload) {
    const { shopId } = rootState.geo
    try {
      this.$fb.track('AddToCart', {
        currency: 'RUB',
        value:
          payload.product.kaspiPrices[shopId] /
          rootGetters['variables/coefficient'],
      })
    } catch (e) {
      this.$sentry.captureMessage(
        `FB Pixel is not defined: ${JSON.stringify(e)}`
      )
    }

    const { product, qnt } = payload
    this.$gtag('event', 'addToCart', { event_category: 'events' })
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
                payload.product.kaspiPrices[shopId] /
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

    return this.app.$services.orders.addProduct(payload).then((response) => {
      if (response.data) {
        commit('SET_DATA', { key: 'order', value: response.data })
        commit('SET_DATA', { key: 'products', value: response.data.products })

        return true
      }

      return false
    })
  },

  removeProduct({ commit, rootGetters, rootState }, payload) {
    const { shopId } = rootState.geo
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
                payload.product.kaspiPrices[shopId] /
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

    return this.app.$services.orders.removeProduct(payload).then((response) => {
      if (response.data) {
        commit('SET_DATA', { key: 'order', value: response.data })
        commit('SET_DATA', { key: 'products', value: response.data.products })
      }
    })
  },

  updateOrder({ commit, rootState, rootGetters }, payload) {
    const shopId = rootState.geo.shopId
    const coefficient = rootGetters['variables/coefficient']

    this.$gtag('event', 'purchase', { event_category: 'events' })
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

    try {
      this.$fb.track('Purchase', {
        currency: 'RUB',
        value: payload.payload.total / rootGetters['variables/coefficient'],
        paymentMethod: payload.payload.payMethod,
      })
    } catch (e) {
      this.$sentry.captureMessage(
        `FB Pixel is not defined: ${JSON.stringify(e)}`
      )
    }

    const shopDisplayName = rootGetters.getDisplayName

    return this.app.$services.orders
      .updateOrder(
        Object.assign({}, payload, {
          payload: Object.assign(payload.payload, { shopId, shopDisplayName }),
        })
      )
      .then((response) => {
        const order = response.data

        if (order && order.checkout) {
          commit('SET_DATA', { key: 'order', value: {} })
          commit('SET_DATA', { key: 'products', value: [] })
        }
      })
  },

  // eslint-disable-next-line camelcase
  fetchSale({ commit }, { utm_campaign: campaign, utm_cause: cause }) {
    return cause === 'sale'
      ? this.app.$services.api.getSale({ campaign }).then((response) => {
          response.data && commit('SET_SALE', response.data)
        })
      : commit('SET_SALE', null)
  },

  fetchDeliveryCost({ commit, dispatch }, orderIds) {
    return this.$services.orders.getDeliveryCost(orderIds).then((response) => {
      if (response.status === 200 && response.data.deliveryCost) {
        dispatch('variables/setDeliveryCost', response.data.deliveryCost, {
          root: true,
        })
      }
    })
  },
}

export const getters = {
  getCountCart(state) {
    let count = 0
    state.products.map((product) => (count += product.qnt))
    return count
  },

  getAssemblySum: (state) => (shopId) => {
    let sum = 0
    state.products.forEach((product) => {
      if (
        product.information.productDetailsProps.accordionObject
          .assemblyAndDocuments
      ) {
        const price =
          (product.sales ? product.sales.price : product.kaspiPrices[shopId]) *
          product.qnt
        sum += price
      }
    })

    return sum
  },
}
