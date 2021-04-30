export default ({ app, $getCookie }, inject) => {
  if (process.env.NODE_ENV !== 'production') {
    inject('metrika', function () {})
    return
  }

  window.onNuxtReady(() => {
    ;(function (m, e, t, r, i, k, a) {
      m[i] =
        m[i] ||
        function () {
          ;(m[i].a = m[i].a || []).push(arguments)
        }
      m[i].l = 1 * new Date()
      // eslint-disable-next-line no-unused-expressions,no-sequences
      ;(k = e.createElement(t)),
        // (a = e.getElementsByTagName(t)[0]),
        (k.defer = true),
        (k.src = r),
        // a.parentNode.insertBefore(k, a)
        e.body.appendChild(k)
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym')

    // eslint-disable-next-line no-undef
    inject('metrika', ym)

    const cookieId = $getCookie('cookieId')
    // eslint-disable-next-line no-undef
    ym('67230112', 'init', {
      webvisor: true,
      trackHash: true,
      userParams: cookieId
        ? {
            UserID: cookieId,
          }
        : {},
    })

    app.router.afterEach((to, from) => {
      // eslint-disable-next-line no-undef
      ym('67230112', 'hit', `${document.location.origin}${to.fullPath}`)
      // eslint-disable-next-line no-undef
      cookieId && ym('67230112', 'setUserID', cookieId)
    })
  })
}
