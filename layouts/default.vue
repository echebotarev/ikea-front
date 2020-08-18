<template>
  <v-app id="app">
    <v-main>
      <NavBar :links="links" />

      <no-ssr v-if="$vuetify.breakpoint.smAndDown">
        <v-row class="sm-and-down">
          <v-spacer></v-spacer>
          <v-col cols="11">
            <Search />
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-list nav dense>
            <v-list-item-group active-class="deep-purple--text text--accent-4">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Account</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </no-ssr>

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

<style>
.vue-portal-target {
  position: absolute;
  z-index: 10;
}
</style>
