<template>
  <v-row class="product-recommendations">
    <v-col>
      <h2 class="mb-10">Вам может понравиться</h2>

      <v-sheet width="100%">
        <v-slide-group multiple show-arrows>
          <v-slide-item
            v-for="item in recommendations"
            :key="item.identifier"
            class="slide-item"
          >
            <ProductCard :product="item" />
          </v-slide-item>
        </v-slide-group>
      </v-sheet>

      <v-divider></v-divider>
    </v-col>
  </v-row>
</template>

<script>
import ProductCard from '@/components/ProductCard'
import { mapState } from 'vuex'

export default {
  name: 'ProductSimilar',
  components: { ProductCard },
  computed: mapState({
    recommendations: (state) => state.products.similarRecommendations,
  }),
  mounted() {
    this.$store.dispatch('products/fetchSimilarRecommendations')
  },
  beforeDestroy() {
    this.$store.commit('products/SET_SIMILAR_RECOMMENDATIONS', [])
  },
}
</script>

<style scoped lang="scss">
.slide-item {
  max-width: 15rem;
  width: 240px;
  padding: 10px;
}
.sm-and-down .slide-item {
  max-width: 10rem;
}
</style>
