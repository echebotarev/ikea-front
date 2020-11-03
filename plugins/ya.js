export default ({ app, $getCookie }) => {
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  ;(function (m, e, t, r, i, k, a) {
    m[i] =
      m[i] ||
      function () {
        ;(m[i].a = m[i].a || []).push(arguments)
      }
    m[i].l = 1 * new Date()
    // eslint-disable-next-line no-unused-expressions,no-sequences
    ;(k = e.createElement(t)),
      (a = e.getElementsByTagName(t)[0]),
      (k.async = 1),
      (k.src = r),
      a.parentNode.insertBefore(k, a)
  })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym')

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
    ym('67230112', 'hit', to.fullPath)
    // eslint-disable-next-line no-undef
    cookieId && ym('67230112', 'setUserID', cookieId)
  })
}
