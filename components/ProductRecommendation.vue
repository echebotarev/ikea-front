<template>
  <v-row class="product-recommendations">
    <v-col cols="7">
      <h2>Похожие товары</h2>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ProductRecommendation',
  mounted() {
    this.$store.dispatch('products/fetchRecommendations')
  },
}
</script>

<style scoped></style>
