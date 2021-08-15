export default {
  ssr: true,
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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/ikea.favicon.svg' }],
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
    // { src: '@plugins/ya.js', mode: 'client' },
    { src: '@plugins/filters.js', mode: 'client' },
    { src: '@plugins/initJivosite.js', mode: 'client' },
    { src: '@plugins/vue-observe-visibility.js', mode: 'client' },
  ],
  serverMiddleware: ['@/serverMiddleware/setCity.js'],
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
        defaultAssets: {
          icons: false,
          font: false,
        },
        icons: {
          iconfont: 'mdiSvg',
        },
      },
    ],
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'portal-vue/nuxt',
    'cookie-universal-nuxt',
    [
      '@nuxtjs/sentry',
      {
        dsn: 'https://c5f9be1ea1b740a5bcd0dd873b50d988@o446780.ingest.sentry.io/5425799',
        disabled: process.env.NODE_ENV === 'development' || false,
      },
    ],
    [
      'nuxt-facebook-pixel-module',
      {
        track: 'PageView',
        pixelId: '912562219512503',
        autoPageView: true,
        disabled: process.env.NODE_ENV === 'development' || false,
      },
    ],
    [
      'nuxt-vuex-localstorage',
      {
        ...(process.env.NODE_ENV === 'development' && {
          mode: 'debug',
        }),
        localStorage: ['geo'],
      },
    ],
    [
      '@nuxtjs/dayjs',
      {
        locales: ['ru'],
        defaultLocale: 'ru',
        defaultTimeZone: 'Asia/Aqtau',
        plugins: ['utc', 'timezone'],
      },
    ],
    [
      'nuxt-compress',
      {
        gzip: {
          threshold: 8192,
        },
        brotli: {
          threshold: 8192,
        },
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
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[contenthash].js'),
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxSize: 51200,
      },
    },
    babel: {
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-private-methods',
      ],
    },
  },

  render: {
    static: {
      maxAge: 60 * 60 * 24 * 30 * 1000,
    },
  },

  generate: {},
}
