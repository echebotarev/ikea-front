export default (filters) => {
  // TODO: сделать фильтр по цене
  return filters.filter((filter) => filter.enabled && filter.type !== 'RANGE')
}
