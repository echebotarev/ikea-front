import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:8080/api/v1`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getCategories(id = 'products') {
    return apiClient.get(`/category/${id}`)
  },

  getProducts(id, page) {
    return apiClient.get(`/products/${id}?page=${page}`)
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
}
