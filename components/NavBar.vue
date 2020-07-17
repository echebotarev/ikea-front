<template>
  <v-app-bar app color="transparent" elevation="0">
    <v-toolbar-title>
      <nuxt-link to="/" class="brand">Ikea</nuxt-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <nav>
      <v-btn text>
        <nuxt-link to="/">List</nuxt-link>
      </v-btn>
      |
      <v-btn text>
        <nuxt-link to="/event/create">Create</nuxt-link>
      </v-btn>
    </nav>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style scoped></style>
