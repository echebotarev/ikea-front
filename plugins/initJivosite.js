export default function ({ store }) {
  window.onNuxtReady(() => {
    setTimeout(() => store.dispatch('geo/initJivosite'), 15000)
  })
}
