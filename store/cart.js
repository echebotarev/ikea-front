export const state = () => ({
  errors: [],
  value: '',
  phone: '',
  name: '',
  mail: '',
  isAssembly: false,
  assemblyValue: 0,
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
    console.log('Set value', payload)

    commit('SET_VALUE', payload)
  },

  validateForm({ state, commit }, notify = true) {
    const checkEmail = (value) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value.trim())
    }

    if (!state.value) {
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

    console.log('Form data', state.value)
    console.log('Form data', state.phone)
    console.log('Form data', state.name)
    console.log('Form data', state.mail)
    console.log('Form data', state.errors)
    console.log('========================================')

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
