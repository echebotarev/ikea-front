export default ({ app }) => {
  /*
   ** Будет работать только на стороне клиента и только когда режим разработки будет "production"
   */
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  window.dataLayer = window.dataLayer || []
  function gtag() {
    // eslint-disable-next-line no-undef
    dataLayer.push(arguments)
  }
  gtag('js', new Date())

  gtag('config', 'G-710S6RQJH7')

  /*
   ** Вызывается каждый раз после смены роута (при инициализации тоже)
   */
  // app.router.afterEach((to, from) => {})
}
