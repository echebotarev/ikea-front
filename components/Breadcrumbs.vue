<template>
  <v-breadcrumbs :items="breadcrumbs">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: {
    breadcrumbs: { type: Array, default: () => [] },
  },
}
</script>

<style scoped></style>
