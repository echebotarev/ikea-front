export const state = () => ({
  errors: [],
  address: '',
  phone: '',
  name: '',
  mail: '',
  // 1 - Самовывоз
  // 2 - Доставка
  deliveryMethod: 1,
  isAssembly: false,
  assemblyValue: 0,

  version: 2,
})

export const mutations = {
  ADD_ERROR(state, payload) {
    state.errors.push(payload)
  },

  CLEAR_ERRORS(state) {
    state.errors = []
  },

  SET_VALUE(state, { key, value }) {
    state[key] = value
  },
}

export const actions = {
  setValue({ commit }, payload) {
    commit('SET_VALUE', payload)
  },

  validateForm({ state, commit }, notify = true) {
    const checkEmail = (value) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value.trim())
    }

    if (!state.address) {
      commit('ADD_ERROR', 'Укажите адрес')
    }

    if (!state.phone) {
      commit('ADD_ERROR', 'Укажите номер телефона')
    }

    if (!state.name) {
      commit('ADD_ERROR', 'Укажите ваше имя')
    }

    if (!checkEmail(state.mail)) {
      commit('ADD_ERROR', 'Укажите правильную почту')
    }

    if (state.errors.length && notify) {
      state.errors.forEach((text) => {
        this.$notify({
          group: 'all',
          title: 'Пожалуйста исправьте указанные ошибки:',
          text,

          type: 'warn',
          duration: 10000,
        })
      })

      commit('CLEAR_ERRORS')
      return false
    }

    if (state.errors.length) {
      commit('CLEAR_ERRORS')
      return false
    }

    return true
  },

  clearData({ commit }) {
    commit('SET_VALUE', { key: 'isAssembly', value: false })
    commit('SET_VALUE', { key: 'assemblyValue', value: 0 })
  },
}

export const getters = {
  getDeliveryMethod(state, getters, rootState) {
    if (rootState.shopId !== '003' && rootState.shopId !== '004') {
      return 2
    }

    return state.deliveryMethod
  },
}
