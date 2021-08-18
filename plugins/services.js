import ApiService from '@/services/ApiService'

export default (ctx, inject) => {
  const { $axios, $cookies } = ctx

  $axios.onRequest((config) => {
    console.log('Axios onRequest: DomaDoma', $cookies.get('domaDomaShopId'))
    console.log('Axios onRequest: IkeaShopId', $cookies.get('ikeaShopId'))
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
