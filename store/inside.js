export const state = () => ({
  // переменная используется для того, чтобы менеджер
  // мог заказать товар, которого нет в наличии
  isAvailable: false,
})

export const mutations = {
  SET_DATA(state, { key, value }) {
    state[key] = value
  },
}

let count = 0
let timer = null
export const actions = {
  setAvailable({ commit, state }) {
    clearTimeout(timer)

    count += 1
    timer = setTimeout(() => (count = 0), 1000)

    if (count === 10) {
      commit('SET_DATA', { key: 'isAvailable', value: true })
    }
  },
}
