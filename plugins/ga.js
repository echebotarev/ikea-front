export default ({ app }, inject) => {
  /*
   ** Будет работать только на стороне клиента и только когда режим разработки будет "production"
   */
  if (process.env.NODE_ENV !== 'production') {
    inject('gtag', function () {})
    return
  }

  ;(function (w, d, s, l, i) {
    w[l] = w[l] || []
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
    const f = d.getElementsByTagName(s)[0]
    const j = d.createElement(s)
    // eslint-disable-next-line eqeqeq
    const dl = l != 'dataLayer' ? '&l=' + l : ''
    j.async = true
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
    f.parentNode.insertBefore(j, f)
  })(window, document, 'script', 'dataLayer', 'GTM-P2K8RLJ')

  window.dataLayer = window.dataLayer || []
  function gtag() {
    // eslint-disable-next-line no-undef
    dataLayer.push(arguments)
  }
  gtag('js', new Date())
  inject('gtag', gtag)

  app.router.afterEach((to, from) => {
    gtag('event', 'page_view', {
      page_path: to.fullPath,
    })
  })
}
