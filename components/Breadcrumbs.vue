<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

    <v-divider light class="mb-6"></v-divider>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: {
    breadcrumbs: { type: Array, default: () => [] },
  },
}
</script>

<style scoped>
.v-breadcrumbs {
  padding: 18px 0 10px;
}
</style>
