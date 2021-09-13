import config from '@/config'

const getQueries = (payload) =>
  Object.entries(payload).reduce(
    (acc, [key, value]) => `${acc}${key}=${value}&`,
    ''
  )

export default class ApiService {
  constructor({ $axios }) {
    this.axios = $axios
  }

  url = config.apiUrl

  getCategories(id = 'products') {
    return this.axios.get(`${this.url}/category/${id}`)
  }

  getProducts(payload) {
    const { id } = payload
    const queries = encodeURI(getQueries(payload))

    return this.axios.get(`${this.url}/products/${id}?${queries}`)
  }

  getProductsByIds(ids = []) {
    return this.axios.get(`${this.url}/products/?ids=${ids}`)
  }

  getProduct(id) {
    return this.axios.get(`${this.url}/product/${id}`)
  }

  getSearch(value) {
    return this.axios.get(`${this.url}/search/?q=${value}`)
  }

  getProductsByWord(value) {
    return this.axios.get(`${this.url}/search/products/?q=${value}`)
  }

  getAvailabilityProduct({ type, identifier }) {
    return this.axios.get(`${this.url}/available?type=${type}&id=${identifier}`)
  }

  getRestockProduct({ identifier }) {
    return this.axios.get(`${this.url}/available/restock?id=${identifier}`)
  }

  getRecommendations({ id, categoryList = [], type = 'similar' }) {
    return this.axios.get(
      `${this.url}/recommendation/${type}?id=${id}&categoryList=${encodeURI(
        categoryList
      )}`
    )
  }

  getSuggestionProducts(productId) {
    return this.axios.get(`${this.url}/suggestion/${productId}`)
  }

  getDeliveryData(domaDomaShopId) {
    return this.axios.get(
      `${this.url}/time-to-delivery`,
      Object.assign(
        {},
        process.server
          ? {
              // Когда запрос делается на сервере, cookie пусты
              headers: { Cookie: `domaDomaShopId=${domaDomaShopId};` },
            }
          : {}
      )
    )
  }

  getSale({ campaign }) {
    return this.axios.get(`${this.url}/sale/${campaign}`)
  }
}
