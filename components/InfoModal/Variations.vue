<template>
  <v-row>
    <v-spacer></v-spacer>
    <v-col cols="10"></v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
export default {
  name: 'Variations',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped></style>
