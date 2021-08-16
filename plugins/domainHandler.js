export default ({ store: { dispatch, $cookies } }) => {
  window.onNuxtReady(
    async () =>
      await dispatch('geo/setShopId', $cookies.get('domaDomaShopId'), {
        root: true,
      })
  )
}
