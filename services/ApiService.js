import axios from 'axios'
import config from '@/config'

const apiClient = axios.create({
  baseURL: config.apiUrl,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const getQueries = (payload) =>
  Object.entries(payload).reduce(
    (acc, [key, value]) => `${acc}${key}=${value}&`,
    ''
  )

export default {
  getCategories(id = 'products') {
    return apiClient.get(`/category/${id}`)
  },

  getProducts(payload) {
    const { id } = payload
    const queries = encodeURI(getQueries(payload))

    return apiClient.get(`/products/${id}?${queries}`)
  },

  getProductsByIds(ids = []) {
    return apiClient.get(`/products/?ids=${ids}`)
  },

  getProduct(id) {
    return apiClient.get(`/product/${id}`)
  },

  getSearch(value) {
    return apiClient.get(`/search/?q=${value}`)
  },

  getProductsByWord(value) {
    return apiClient.get(`/search/products/?q=${value}`)
  },

  getAvailabilityProduct(payload) {
    return apiClient.get(
      `/available?type=${payload.type}&id=${payload.identifier}`
    )
  },

  setAvailabilityNotification(payload) {
    return apiClient.put(`/available`, payload)
  },

  getRecommendations({ id, categoryList = [], type = 'similar' }) {
    return apiClient.get(
      `/recommendation/${type}?id=${id}&categoryList=${encodeURI(categoryList)}`
    )
  },

  getSuggestionProducts(productId) {
    return apiClient.get(`/suggestion/${productId}`)
  },

  getDeliveryData() {
    return apiClient.get(`/time-to-delivery`)
  },

  getSale({ campaign }) {
    return apiClient.get(`/sale/${campaign}`)
  },
}
