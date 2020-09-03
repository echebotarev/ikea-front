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
    return OrdersService.addProduct(payload).then((response) => {
      if (response.data) {
        commit('SET_ORDER', response.data)
        commit('SET_PRODUCTS', response.data.products)
      }
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
}

export const getters = {
  getCountCart(state) {
    let count = 0
    state.products.map((product) => (count += product.qnt))
    return count
  },
}
