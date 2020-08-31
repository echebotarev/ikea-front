import OrdersService from '@/services/OrdersService.js'

export const state = () => ({
  orders: [],
})

export const mutations = {
  ADD_PRODUCT(state, { product, qnt }) {},

  REMOVE_PRODUCT(state, { product, qnt }) {},
}

export const actions = {
  getOrders({ commit }, payload) {},

  addProduct({ commit }, payload) {
    return OrdersService.createOrder(payload)
  },
}

export const getters = {
  getCountCart(state) {
    let count = 0
    state.orders.map((order) =>
      order.products.map((product) => (count += product.qnt))
    )
    return count
  },
}
