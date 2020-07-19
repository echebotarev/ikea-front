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
    // eslint-disable-next-line vue/require-default-prop
    breadcrumbs: Array,
  },
}
</script>

<style scoped></style>
