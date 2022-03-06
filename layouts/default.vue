<template>
  <v-app id="app" :class="$vuetify.breakpoint.smAndDown ? 'sm-and-down' : ''">
    <v-main>
      <Message v-if="shopId === '001'" />

      <AttentionButton
        v-if="shopId === '001'"
        :has-button="true"
        class-name="sticky"
        :text="`Мы временно приостанавливаем работу из-за закрытия магазинов IKEA в России<br />В ближайшее время мы добавим на сайт товары производства компании Hoff и снова продолжим работать.<br /><br />Команда doma-doma.org, Актау.`"
        :button="{
          title: 'Закрыть',
          action: true,
        }"
      />
      <!--      <AttentionButton
        v-if="shopId === '003'"
        :has-button="true"
        class-name="sticky success"
        :text="`Новогодние каникулы:<br /><br />Заказы оформленные <span style='text-decoration: underline'>с 26 декабря по 8 января</span> будут доставлены в город <span style='text-decoration: underline'>12-13 января</span><br /><br />Команда doma-doma.org, Уральск.`"
        :button="{
          title: 'Закрыть',
          action: true,
        }"
      />
      <AttentionButton
        v-if="shopId === '004'"
        :has-button="true"
        class-name="sticky success"
        :text="`Новогодние каникулы:<br /><br />Заказы оформленные <span style='text-decoration: underline'>с 26 декабря по 8 января</span> будут доставлены в город <span style='text-decoration: underline'>12-13 января</span><br /><br />Команда doma-doma.org, Атырау.`"
        :button="{
          title: 'Закрыть',
          action: true,
        }"
      />-->

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
import getCanonicalUrl from '@/utils/getCanonicalUrl'
import getCityName from '@/utils/getCityName'

export default {
  components: {
    Message: hydrateWhenVisible(() => import('@/components/Message.vue')),
    Search: hydrateWhenIdle(() => import('@/components/Search.vue')),
    Footer: hydrateWhenVisible(() => import('@/components/Footer.vue')),
    ChooseCity: hydrateWhenVisible(() => import('@/components/Geo/ChooseCity')),
    NavLinks: hydrateWhenVisible(() => import('@/components/NavLinks')),
    // AttentionButton: () => import('@/components/AttentionButton'),
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
      shopId: (state) => state.shopId,
      geo: (state) => state.geo.data,
    }),
  },
  async mounted() {
    this.fetchProducts()
    this.fetchSaleProducts()
    await this.fetchLocation()

    // проверка на будущее, на тот момент, когда достигнем более 10000 запросов
    if (this.geo.success === false) {
      this.$sentry.captureMessage(
        `Geo get limited requests: ${JSON.stringify(this.geo)}`
      )
    }
  },
  methods: {
    ...mapActions({
      fetchProducts: 'orders/fetchProducts',
      fetchSaleProducts: 'products/fetchSaleProducts',
      fetchLocation: 'geo/fetchLocation',
      toggleDrawer: 'page/toggleDrawer',
    }),
  },
  head() {
    return {
      titleTemplate: `%s - IKEA-${getCityName(this)}`,
      htmlAttrs: {
        lang: 'ru',
      },
      link: [
        {
          rel: 'canonical',
          href: getCanonicalUrl(this),
        },
      ],
      meta: [
        {
          hid: 'og:url',
          property: 'og:url',
          content: getCanonicalUrl(this),
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
