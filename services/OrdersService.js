import config from '@/config'

export default class OrdersService {
  constructor({ $axios }) {
    this.axios = $axios
  }

  url = config.ordersUrl

  getOrder() {
    return this.axios.get(`${this.url}/orders`)
  }

  getSaleProducts() {
    return this.axios.get(`${this.url}/sale/products`)
  }

  updateOrder({ orderId, payload }) {
    return this.axios.put(`${this.url}/orders/${orderId}`, payload)
  }

  addProduct(payload) {
    return this.axios.post(`${this.url}/orders`, payload)
  }

  removeProduct({ product, qnt }) {
    return this.axios.delete(
      `${this.url}/orders/${product.identifier}?qnt=${qnt}`
    )
  }

  setAvailabilityNotification(payload) {
    return this.axios.put(`${this.url}/available`, payload)
  }
}
