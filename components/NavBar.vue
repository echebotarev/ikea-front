<template>
  <v-app-bar app color="transparent" elevation="0">
    <nuxt-link to="/" class="brand">
      <v-toolbar-title>
        Real World Events
      </v-toolbar-title>
    </nuxt-link>
    <v-spacer></v-spacer>
    <nav>
      <nuxt-link to="/">
        <v-btn text rounded>List</v-btn>
      </nuxt-link>
      |
      <nuxt-link to="/event/create">
        <v-btn text rounded>Create</v-btn>
      </nuxt-link>
    </nav>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style scoped></style>
