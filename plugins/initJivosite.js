export default function ({ store }) {
  window.onNuxtReady(() => {
    setTimeout(() => store.dispatch('geo/initJivosite'), 20000)
  })
}
