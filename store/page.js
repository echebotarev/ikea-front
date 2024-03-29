export const state = () => ({
  modal: {
    isShow: false,
    isOpenDetails: false,
    data: {},
  },
  breadcrumbs: [],
  menuDrawer: false,
  delivery: {},
  links: [
    { label: 'Каталог IKEA', url: '/' },
    { label: 'Акции', url: '/sales', icon: 'sale' },
    { label: 'Контакты', url: '/information' },
    { label: 'Корзина', url: '/cart' },
  ],
})

export const mutations = {
  SET_BREADCRUMBS(state, breadcrumbs) {
    const items = []
    breadcrumbs.itemListElement &&
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

  TOGGLE_DETAILS(state, payload) {
    state.modal.isOpenDetails = payload
  },

  TOGGLE_DRAWER(state, payload = false) {
    state.menuDrawer = payload
  },

  SET_DELIVERY_DATA(state, payload) {
    state.delivery = payload
  },
}
export const actions = {
  showModal({ commit }, payload) {
    global.document.documentElement.style.overflow = 'hidden'
    commit('SHOW_MODAL', payload)
  },

  hideModal({ commit }, payload) {
    global.document.documentElement.style.overflow = ''
    commit('HIDE_MODAL', payload)
  },

  toggleDetails({ commit }, payload) {
    commit('TOGGLE_DETAILS', payload)
  },

  toggleDrawer({ commit }, payload) {
    commit('TOGGLE_DRAWER', payload)
  },

  getDeliveryData({ commit }) {
    const domaDomaShopId = this.app.$cookies.get('domaDomaShopId')
    return this.app.$services.api
      .getDeliveryData(domaDomaShopId)
      .then((response) => {
        commit('SET_DELIVERY_DATA', response.data)
      })
  },
}
