<template>
  <v-app id="app">
    <NavBar :links="links" />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <Footer />
    <portal-target name="modal"></portal-target>
  </v-app>
</template>

<script>
import NavBar from '~/components/NavBar.vue'
import Footer from '~/components/Footer.vue'
import links from '~/assets/data/links'
export default {
  components: {
    NavBar,
    Footer,
  },
  computed: {
    links: () => links,
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
