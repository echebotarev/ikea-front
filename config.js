export default {
  get apiUrl() {
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:8080/api/v1'
    }

    return process.server
      ? 'http://localhost:8080/api/v1'
      : 'https://ikea-dostavka.org/api/v1'
  },
}
