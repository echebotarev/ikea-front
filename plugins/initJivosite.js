export default function ({ store }) {
  window.onNuxtReady(() => {
    store.dispatch('geo/initJivosite')
  })
}
