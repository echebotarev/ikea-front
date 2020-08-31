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
  createOrder(payload) {
    return apiClient.post(`/`, payload)
  },
}
