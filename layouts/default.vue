<template>
  <v-app id="app" :class="$vuetify.breakpoint.smAndDown ? 'sm-and-down' : ''">
    <v-main>
      <NavBar :links="links" />

      <client-only>
        <div v-if="$vuetify.breakpoint.smAndDown">
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="11">
              <Search />
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

          <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-list nav>
            <v-list-item-group active-class="grey lighten-5">
              <nuxt-link v-for="link in links" :key="link.label" :to="link.url">
                <v-list-item>
                  <v-list-item-icon v-if="link.icon">
                    <v-icon>{{ link.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>{{ link.label }}</v-list-item-title>
                </v-list-item>
              </nuxt-link>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
        </div>
      </client-only>

      <v-main>
        <v-container>
          <Nuxt />
        </v-container>
      </v-main>
    </v-main>

    <Footer />

    <portal-target name="modal"></portal-target>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import NavBar from '@/components/NavBar.vue'
import Search from '@/components/Search.vue'
import Footer from '@/components/Footer.vue'
import links from '@/assets/data/links'

export default {
  components: {
    NavBar,
    Search,
    Footer,
  },
  computed: {
    links: () => links,
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
  },
  methods: {
    ...mapActions({
      toggleDrawer: 'page/toggleDrawer',
    }),
  },
  head() {
    return {
      titleTemplate: '%s - Real World Events',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Where you can find all the events',
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
</style>
