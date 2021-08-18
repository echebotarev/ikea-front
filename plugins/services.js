import ApiService from '@/services/ApiService'
import OrdersService from '@/services/OrdersService'

const addShopData = ({ shopId, ikeaShopId, url }) =>
  url.includes('?')
    ? `${url}&domaDomaShopId=${shopId}&ikeaShopId=${ikeaShopId}`
    : `${url}?domaDomaShopId=${shopId}&ikeaShopId=${ikeaShopId}`

export default (ctx, inject) => {
  const {
    $axios,
    $cookies,
    store: { getters },
  } = ctx

  $axios.onRequest((config) => {
    const shopId = $cookies.get('domaDomaShopId') || getters.getShopId
    const ikeaShopId = $cookies.get('ikeaShopId') || getters.getIkeaShopId

    config.url = addShopData({
      url: config.url,
      shopId,
      ikeaShopId,
    })

    return config
  })
  $axios.onResponse((response) => {
    return response
  })
  $axios.onError((error) => {
    console.error('Axios Error', error)
  })

  inject('services', {
    api: new ApiService(ctx),
    orders: new OrdersService(ctx),
  })
}
