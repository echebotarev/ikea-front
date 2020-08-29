export default (queries) => {
  const appliedFilters = []

  Object.entries(queries).map(
    ([key, value]) =>
      key.includes('f-') && appliedFilters.push(...value.split(','))
  )

  return appliedFilters
}
