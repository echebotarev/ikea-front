<template>
  <v-app-bar color="transparent" elevation="0" class="header my-5">
    <v-toolbar-title class="pt-2">
      <nuxt-link to="/" class="brand">
        <span class="logo-image-wrap">
          <img
            src="/images/doma-logo.png"
            alt="Сервис доставки товаров IKEA"
            width="40"
            height="40"
          />
        </span>
      </nuxt-link>

      <span class="logo-text ml-3 pl-3">
        Доставка IKEA <br />
        <span class="logo-text-mini" @click="toggleDialog(true)">
          в {{ shopDisplayName }}
          <v-icon class="logo-text-icon">{{ mdiGoogleMaps }}</v-icon>
        </span>
      </span>

      <client-only>
        <ConfirmCity v-if="confirmedCity === false" />
      </client-only>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <client-only v-if="$vuetify.breakpoint.mdAndUp">
      <Search />
    </client-only>

    <client-only v-if="!$vuetify.breakpoint.mdAndUp">
      <v-app-bar-nav-icon @click="toggleDrawer(true)"></v-app-bar-nav-icon>
      <nuxt-link v-if="haveSales" to="/sales">
        <v-icon large color="rgb(0, 88, 163)">
          {{ mdiSale }}
        </v-icon>
      </nuxt-link>
      <Count class="ml-2" />
    </client-only>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import { mdiGoogleMaps, mdiSale } from '@mdi/js'

export default {
  name: 'NavBar',
  components: {
    Search: () => import('@/components/Search'),
    ConfirmCity: () => import('@/components/Geo/ConfirmCity'),
    Count: () => import('@/components/Count'),
  },
  data() {
    return { mdiGoogleMaps, mdiSale }
  },
  computed: {
    ...mapGetters({
      shopDisplayName: 'getDisplayName',
    }),
    ...mapState({
      confirmedCity: (state) => state.geo.confirmedCity,
      haveSales: (state) => !!state.products.saleProducts.length,
    }),
  },
  methods: {
    ...mapActions({
      toggleDrawer: 'page/toggleDrawer',
      toggleDialog: 'geo/toggleDialog',
    }),
  },
}
</script>

<style scoped lang="scss">
.header {
  z-index: 2;
}
.logo-image-wrap {
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
  width: 40px;
  height: 40px;
}
.logo-text {
  color: #0058a3;
  line-height: 1;
  display: inline-block;
  float: right;
  border-left: thin solid #0058a3;
  transition: all 0.3s;
  font-size: 1.15rem;

  .logo-text-mini {
    position: relative;
    display: inline-block;
    font-size: 1rem;
    border-bottom: 1px dashed;
    cursor: pointer;

    &:hover {
      border-bottom-color: transparent;
    }

    .logo-text-icon {
      position: absolute;
      color: #023b78;
      bottom: -5px;
    }
  }
}
a:hover {
  .logo-text {
    border-left-color: #fad911;
  }
}
</style>
