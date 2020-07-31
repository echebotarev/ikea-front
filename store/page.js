export const state = () => ({
  modal: {
    isShow: false,
    data: {},
  },
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

  SHOW_MODAL(state, payload = {}) {
    state.modal.isShow = true
    state.modal.data = payload
  },

  HIDE_MODAL(state, payload = {}) {
    state.modal.isShow = false
    state.modal.data = payload
  },
}
export const actions = {
  showModal({ commit }, payload) {
    commit('SHOW_MODAL', payload)
  },

  hideModal({ commit }, payload) {
    commit('HIDE_MODAL', payload)
  },
}
