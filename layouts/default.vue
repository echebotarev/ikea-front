<template>
  <v-app id="app">
    <NavBar />
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '~/components/NavBar.vue'
export default {
  components: {
    NavBar,
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
