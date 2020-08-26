<template>
  <v-row>
    <v-spacer></v-spacer>
    <v-col cols="10">
      {{ data.sortOrders.name }}
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
export default {
  name: 'InfoFilters',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped></style>
