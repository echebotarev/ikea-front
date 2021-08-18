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
}

const getPrice = (payload) => {
  const value = payload.product.price.price.mainPriceProps.price.integer
  return parseInt(value.replace(/ /g, ''))
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

  addProduct({ commit, rootGetters, rootState }, payload) {
    this.$fb.track('AddToCart', {
      currency: 'RUB',
      value: getPrice(payload) / rootGetters['variables/coefficient'],
    })
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

    return this.app.$services.orders.addProduct(payload).then((response) => {
      if (response.data) {
        commit('SET_DATA', { key: 'order', value: response.data })
        commit('SET_DATA', { key: 'products', value: response.data.products })

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
          response.data &&
            commit('SET_DATA', { key: 'sale', value: response.data })
        })
      : commit('SET_DATA', { key: 'sale', value: null })
  },
}

export const getters = {
  getCountCart(state) {
    let count = 0
    state.products.map((product) => (count += product.qnt))
    return count
  },
}
