export default (_this) => {
  const shopId = _this.$store.$cookies.get('domaDomaShopId')
  return _this.$store.getters['geo/getDisplayName'](shopId)
}
