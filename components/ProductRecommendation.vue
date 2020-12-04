<template>
  <v-row class="product-recommendations">
    <v-col>
      <h2 class="mb-10">
        {{ type === 'same' ? 'Похожие товары' : 'Вам может понравиться' }}
      </h2>

      <v-sheet width="100%">
        <v-slide-group multiple show-arrows>
          <v-slide-item
            v-for="item in recommendations[type]"
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
import { mapState } from 'vuex'
import ProductCard from '@/components/ProductCard'

export default {
  name: 'ProductRecommendation',
  components: { ProductCard },
  props: {
    type: {
      type: String,
      default: 'same',
    },
  },
  computed: mapState({
    recommendations: (state) => ({
      same: state.products.sameRecommendations,
      similar: state.products.similarRecommendations,
    }),
  }),
  mounted() {
    this.$store.dispatch('products/fetchRecommendations', {
      type: this.type,
    })
  },
  beforeDestroy() {
    this.type === 'same'
      ? this.$store.commit('products/SET_SAME_RECOMMENDATIONS', [])
      : this.$store.commit('products/SET_SIMILAR_RECOMMENDATIONS', [])
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
