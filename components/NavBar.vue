<template>
  <v-app-bar color="transparent" elevation="0" class="header mt-5">
    <v-toolbar-title>
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
          <v-icon class="logo-text-icon">mdi-google-maps</v-icon>
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

    <client-only v-if="$vuetify.breakpoint.smAndUp">
      <nav>
        <nuxt-link
          v-for="link in links"
          :key="link.url"
          :to="link.url"
          class="ml-5"
          >{{ link.label }}</nuxt-link
        >
      </nav>
    </client-only>

    <client-only v-if="!$vuetify.breakpoint.mdAndUp">
      <v-app-bar-nav-icon @click="toggleDrawer(true)"></v-app-bar-nav-icon>
    </client-only>

    <client-only v-if="countCart">
      <nuxt-link to="/cart" class="count ml-2 text-center">
        {{ countCart }}
      </nuxt-link>
    </client-only>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Search from '@/components/Search'
import ConfirmCity from '@/components/Geo/ConfirmCity'

export default {
  name: 'NavBar',
  components: { Search, ConfirmCity },
  props: {
    links: {
      type: Array,
      default: null,
    },
  },
  computed: {
    ...mapGetters({
      countCart: 'orders/getCountCart',
      shopDisplayName: 'geo/getDisplayName',
    }),
    ...mapState({
      confirmedCity: (state) => state.geo.confirmedCity,
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
.count {
  display: inline-block;
  padding: 3px;
  width: 30px;
  border-radius: 50%;
  background: rgb(0, 88, 163);
  color: #fff;
  text-decoration: none !important;
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
