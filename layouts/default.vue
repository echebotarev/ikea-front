<template>
  <v-app id="app">
    <NavBar :links="links" />
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '~/components/NavBar.vue'
import links from '~/assets/data/links'
export default {
  components: {
    NavBar,
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

<style></style>
