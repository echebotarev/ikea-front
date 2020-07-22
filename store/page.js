export const state = () => ({
  breadcrumbs: [],
})
export const mutations = {
  SET_BREADCRUMBS(state, breadcrumbs) {
    const items = []
    breadcrumbs.itemListElement.forEach((breadcrumb, index) => {
      // TODO вычислять identifier в скрапере
      const arr = breadcrumb.item.split('-')
      const identifier = arr[arr.length - 1].replace('/', '')

      items.push({
        text: breadcrumb.name,
        href: identifier === 'products' ? '/' : `/category/${identifier}`,
        disabled: breadcrumbs.itemListElement.length === index + 1,
      })
    })
    state.breadcrumbs = items
  },
}
export const actions = {}
