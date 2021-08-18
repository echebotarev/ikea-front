import ApiService from '@/services/ApiService'

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
    console.log('=============')

    console.log('Axios onRequest: DomaDoma', $cookies.get('domaDomaShopId'))
    console.log('Axios onRequest: IkeaShopId', $cookies.get('ikeaShopId'))
    console.log('Is Server', process.server)

    console.log('Store ShopId', getters.getShopId)
    console.log('Store IKEA ShopId', getters.getIkeaShopId)

    const shopId = $cookies.get('domaDomaShopId') || getters.getShopId
    const ikeaShopId = $cookies.get('ikeaShopId') || getters.getIkeaShopId

    config.url = addShopData({
      url: config.url,
      shopId,
      ikeaShopId,
    })

    console.log('=============')
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
  })
}
