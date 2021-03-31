export default {
  get apiUrl() {
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:8080/api/v1'
    }

    return process.server
      ? 'http://localhost:8080/api/v1'
      : 'https://doma-doma.org/api/v1'
  },

  geoUrl: 'http://ipwhois.app/json',

  get ordersUrl() {
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:7070'
    }

    return process.server
      ? 'http://localhost:7070'
      : 'https://orders.doma-doma.org'
  },

  yandexApiKey: '042a2e05-86cf-4d8f-b283-ca17f9f5ddb5',
  cloudPaymentsPublicKey: 'pk_65ca7617c1fc1e310a7ea9b5547f1',
}
