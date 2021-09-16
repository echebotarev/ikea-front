export default (_this) => {
  const shopId = _this.$store.$cookies.get('domaDomaShopId')
  console.log('GetCanonicalUrl: shopId - ', shopId)

  const domain = _this.$store.getters['geo/getDomainName'](shopId)
  console.log('GetCanonicalUrl: domain - ', domain)

  return domain === 'aktau'
    ? `https://doma-doma.org${_this.$route.path}`
    : `https://${domain}.doma-doma.org${_this.$route.path}`
}
