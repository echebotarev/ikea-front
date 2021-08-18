import ApiService from '@/services/ApiService'

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

    $cookies.set('domaDomaShopId', getters.getShopId)
    $cookies.set('ikeaShopId', getters.getIkeaShopId)

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
