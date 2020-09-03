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
    return apiClient.get(`/`)
  },

  addProduct(payload) {
    return apiClient.post(`/`, payload)
  },

  removeProduct({ product, qnt }) {
    return apiClient.delete(`/${product.identifier}?qnt=${qnt}`)
  },
}
