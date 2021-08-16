export default (_this) => {
  const shopId = _this.$store.$cookies.get('domaDomaShopId')
  const domain = _this.$store.getters['geo/getDomainName'](shopId)

  return domain === 'aktau'
    ? `https://doma-doma.org${_this.$route.path}`
    : `https://${domain}.doma-doma.org${_this.$route.path}`
}
