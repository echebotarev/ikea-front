import OrdersService from '@/services/OrdersService.js'

export const state = () => ({
  order: {},
  products: [],
})

export const mutations = {
  SET_ORDER(state, payload) {
    state.order = payload
  },

  SET_PRODUCTS(state, payload) {
    state.products = payload
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
    this.$fb.track('Purchase', { currency: 'KZT', value: payload.total })
    return OrdersService.updateOrder(payload).then((response) => {
      const order = response.data

      if (order && order.checkout) {
        commit('SET_ORDER', {})
        commit('SET_PRODUCTS', [])
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
}
