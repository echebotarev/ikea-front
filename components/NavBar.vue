<template>
  <v-app-bar color="transparent" elevation="0" hide-on-scroll class="mt-5">
    <v-toolbar-title>
      <nuxt-link to="/" class="brand">
        <img src="~/assets/images/ikea-logo.svg" />
      </nuxt-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <Search />
    <nav>
      <nuxt-link
        v-for="link in links"
        :key="link.url"
        :to="link.url"
        class="ml-5"
        >{{ link.label }}</nuxt-link
      >
    </nav>
  </v-app-bar>
</template>

<script>
import Search from '@/components/Search'
export default {
  name: 'NavBar',
  components: { Search },
  props: {
    links: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style scoped></style>
