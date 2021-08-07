<template>
  <v-app id="app" :class="$vuetify.breakpoint.smAndDown ? 'sm-and-down' : ''">
    <v-main>
      <Message />

      <Header />

      <client-only v-if="$vuetify.breakpoint.smAndDown">
        <v-row no-gutters>
          <v-spacer></v-spacer>
          <v-col cols="11">
            <Search />
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

        <v-navigation-drawer v-model="drawer" fixed temporary>
          <NavLinks place="aside" />
        </v-navigation-drawer>
      </client-only>

      <v-main>
        <v-container>
          <Nuxt />
        </v-container>
      </v-main>

      <Footer />

      <client-only>
        <ChooseCity />
      </client-only>
    </v-main>

    <portal-target name="modal"></portal-target>

    <client-only>
      <notifications group="all" class="notification" />
    </client-only>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import { hydrateWhenIdle, hydrateWhenVisible } from 'vue-lazy-hydration'

export default {
  components: {
    Message: hydrateWhenVisible(() => import('@/components/Message.vue')),
    Search: hydrateWhenIdle(() => import('@/components/Search.vue')),
    Footer: hydrateWhenVisible(() => import('@/components/Footer.vue')),
    ChooseCity: hydrateWhenVisible(() => import('@/components/Geo/ChooseCity')),
    NavLinks: hydrateWhenVisible(() => import('@/components/NavLinks')),
  },
  middleware: 'fetchOrders',
  computed: {
    drawer: {
      get() {
        return this.$store.state.page.menuDrawer
      },
      set(state) {
        if (state !== this.$store.state.page.menuDrawer) {
          this.$store.dispatch('page/toggleDrawer')
        }
      },
    },

    ...mapState({
      geo: (state) => state.geo.data,
    }),
  },
  async mounted() {
    this.$store.dispatch('orders/fetchProducts')
    if (this.geo === null) {
      await this.$store.dispatch('geo/fetchLocation')
    }

    // проверка на будущее, на тот момент, когда достигнем более 10000 запросов
    if (this.geo.success === false) {
      await this.$sentry.captureMessage(
        `Geo get limited requests: ${JSON.stringify(this.geo)}`
      )
    }
  },
  methods: {
    ...mapActions({
      toggleDrawer: 'page/toggleDrawer',
    }),
  },
  head() {
    return {
      titleTemplate: '%s - IKEA в Актау',
      htmlAttrs: {
        lang: 'ru',
      },
      link: [
        {
          rel: 'canonical',
          href: `https://doma-doma.org${this.$route.path}`,
        },
      ],
      meta: [
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://doma-doma.org${this.$route.path}`,
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'Doma-Doma.org - IKEA',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.vue-portal-target {
  position: absolute;
  z-index: 10;
}
.v-list--nav {
  padding-top: 50px;

  .v-list-item__title {
    font-size: 24px !important;
  }
}

.notification {
  top: 10px !important;
  right: 10px !important;

  .vue-notification {
    background: #3ba133;
    border-left: 0;
  }
}
</style>
