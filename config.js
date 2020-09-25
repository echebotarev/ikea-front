export default {
  get apiUrl() {
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:8080/api/v1'
    }

    return process.server
      ? 'http://localhost:8080/api/v1'
      : 'https://doma-doma.kz/api/v1'
  },

  get ordersUrl() {
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:7070/orders'
    }

    return process.server
      ? 'http://localhost:7070/orders'
      : 'https://orders.doma-doma.kz/orders'
  },

  yandexApiKey: '042a2e05-86cf-4d8f-b283-ca17f9f5ddb5',
  cloudPaymentsPublicKey: 'pk_65ca7617c1fc1e310a7ea9b5547f1',
}
