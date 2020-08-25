<template>
  <v-row class="product-recommendations">
    <v-col cols="7">
      <h2>Похожие товары</h2>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProductRecommendation',
  computed: mapState({
    recommendations: (state) => state.products.recommendations,
  }),
  mounted() {
    this.$store.dispatch('products/fetchRecommendations')
  },
  beforeDestroy() {
    this.$store.commit('SET_RECOMMENDATIONS', [])
  },
}
</script>

<style scoped></style>
