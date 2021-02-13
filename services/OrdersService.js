import axios from 'axios'
import config from '@/config'

const apiClient = axios.create({
  baseURL: config.ordersUrl,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getOrder() {
    return apiClient.get(`/orders`)
  },

  updateOrder({ orderId, payload }) {
    return apiClient.put(`/orders/${orderId}`, payload)
  },

  addProduct(payload) {
    return apiClient.post(`/orders`, payload)
  },

  removeProduct({ product, qnt }) {
    return apiClient.delete(`/orders/${product.identifier}?qnt=${qnt}`)
  },

  setAvailabilityNotification(payload) {
    return apiClient.put(`/available`, payload)
  },
}
