const toggleFilters = async function (parameter, value) {
  let values = []
  const filter = this.$route.query[parameter]
  if (!filter) {
    return await this.$setFilter(parameter, [value])
  }

  values = filter.split(',')
  if (values.includes(value)) {
    values = values.filter((id) => id !== value)
  } else {
    values.push(value)
  }

  return await this.$setFilter(parameter, values)
}

const setFilter = async function (parameter, values) {
  if (values.length === 0) {
    const { query } = this.$route
    delete query[parameter]

    // TODO: опасная реализаци, но пока не представляю как делать иначе
    // По другому страница не обновляется
    await this.$router.replace({ query: null })
    return await this.$router.replace({ query })
  }

  return await this.$router.push({
    query: {
      ...this.$route.query,
      [parameter]: values.toString(),
      page: 1,
    },
  })
}

export default (ctx, inject) => {
  inject('setFilter', setFilter)
  inject('toggleFilters', toggleFilters)
}
