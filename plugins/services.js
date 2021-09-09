import setCookieParser from 'set-cookie-parser'

import ApiService from '@/services/ApiService'
import OrdersService from '@/services/OrdersService'

const addShopData = ({ shopId, ikeaShopId, cookieId = '', url }) =>
  url.includes('?')
    ? `${url}&domaDomaShopId=${shopId}&ikeaShopId=${ikeaShopId}&cookieId=${cookieId}`
    : `${url}?domaDomaShopId=${shopId}&ikeaShopId=${ikeaShopId}&cookieId=${cookieId}`

export default (ctx, inject) => {
  const {
    $axios,
    $cookies,
    store: { getters },
  } = ctx

  $axios.onRequest((config) => {
    console.log(
      'ShopId from Cookie | Index',
      $cookies.get('domaDomaShopId'),
      getters.getShopId
    )

    const shopId = $cookies.get('domaDomaShopId') || getters.getShopId
    const ikeaShopId = $cookies.get('ikeaShopId') || getters.getIkeaShopId

    const cookieId = $cookies.get('cookieId') || getters.getCookieId

    config.url = addShopData({
      url: config.url,
      shopId,
      ikeaShopId,
      cookieId: cookieId || '',
    })

    return config
  })
  $axios.onResponse((response) => {
    // так запросы мы шлем на разные url,
    // то здесь собираем все Cookie в одном месте
    const cookies = setCookieParser(response)
    cookies.forEach((cookie) => {
      const { name, value, ...options } = cookie
      $cookies.set(name, value, options)
    })

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
