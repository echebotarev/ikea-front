import domains from '@/constants/domains'

export const actions = {
  nuxtServerInit({ rootGetters }, { app: { $cookies } }) {
    const { city } = process.env
    const domaDomaShopId = domains[city]

    $cookies.set('domaDomaShopId', domaDomaShopId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })
    $cookies.set(
      'ikeaShopId',
      rootGetters['geo/getIkeaShopId'](domaDomaShopId),
      {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
      }
    )
  },
}
