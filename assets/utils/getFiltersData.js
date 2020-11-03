export default (filters) => {
  // TODO: сделать фильтр по цене
  return filters.filter((filter) => {
    return (
      filter.enabled &&
      filter.type !== 'RANGE' &&
      filter.parameter !== 'f-online-sellable'
    )
  })
}
