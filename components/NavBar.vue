<template>
  <v-app-bar app color="transparent" elevation="0" hide-on-scroll>
    <v-toolbar-title>
      <nuxt-link to="/" class="brand">
        <img src="~/assets/images/ikea-logo.svg" />
      </nuxt-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <Search />
    <nav>
      <v-btn v-for="link in links" :key="`${link}-header-link`" text>
        <nuxt-link :to="link.url">{{ link.label }}</nuxt-link>
      </v-btn>
    </nav>
  </v-app-bar>
</template>

<script>
import Search from '@/components/Search'
export default {
  name: 'NavBar',
  props: {
    links: {
      type: Array,
      default: null,
    },
  },
  components: { Search },
}
</script>

<style scoped></style>
