export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Доставка товаров IKEA в Актау',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-710S6RQJH7',
      },
    ],
  },
  loading: {
    color: '#0059aa',
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/scss/main.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '@/plugins/price',
    '@/plugins/vMask',
    { src: '@plugins/cookie.js', mode: 'client' },
    { src: '@/plugins/notifications', ssr: false },
    { src: '@plugins/ga.js', mode: 'client' },
    { src: '@plugins/ya.js', mode: 'client' },
    { src: '@plugins/filters.js', mode: 'client' },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    [
      '@nuxtjs/vuetify',
      {
        customVariables: ['~/assets/scss/variables.scss'],
        treeShake: true,
        breakpoint: {
          mobileBreakpoint: 600,
        },
      },
    ],
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'portal-vue/nuxt',
    // [
    //   '@nuxtjs/yandex-metrika',
    //   {
    //     id: '67230112',
    //     webvisor: true,
    //   },
    // ],
    [
      '@nuxtjs/sentry',
      {
        dsn:
          'https://c5f9be1ea1b740a5bcd0dd873b50d988@o446780.ingest.sentry.io/5425799',
        disabled: process.env.NODE_ENV === 'development' || false,
      },
    ],
    [
      'nuxt-facebook-pixel-module',
      {
        track: 'PageView',
        pixelId: '417893592914820',
        autoPageView: true,
        disabled: process.env.NODE_ENV === 'development' || false,
      },
    ],
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  router: {
    prefetchLinks: false,
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    html: {
      minify: { collapseWhitespace: true },
    },
  },

  generate: {},
}
