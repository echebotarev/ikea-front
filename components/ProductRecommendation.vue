<template>
  <v-row
    v-if="recommendations[type] && recommendations[type].length"
    class="product-recommendations"
  >
    <v-col>
      <h2 class="mb-10">
        <span v-if="type === 'same'">Похожие товары</span>
        <span v-else-if="type === 'similar' || type === 'trending'"
          >Вам может понравиться</span
        >
        <span v-else-if="type === 'style'">С этим товаром часто покупают</span>
        <span v-else-if="type === 'series'">
          Смотреть еще {{ productName }} серия
        </span>
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

import { hydrateWhenVisible } from 'vue-lazy-hydration'

const DICT_COMMIT = {
  same: 'products/SET_SAME_RECOMMENDATIONS',
  similar: 'products/SET_SIMILAR_RECOMMENDATIONS',
  style: 'products/SET_STYLE_RECOMMENDATIONS',
  series: 'products/SET_SERIES_RECOMMENDATIONS',
  trending: 'products/SET_TRENDING_RECOMMENDATIONS',
}

export default {
  name: 'ProductRecommendation',
  components: {
    ProductCard: hydrateWhenVisible(() => import('@/components/ProductCard')),
  },
  props: {
    type: {
      type: String,
      default: 'same',
    },
    productName: {
      type: String,
      default: '',
    },
    isCategory: {
      type: Boolean,
      default: false,
    },
  },
  computed: mapState({
    recommendations: (state) => ({
      same: state.products.sameRecommendations,
      similar: state.products.similarRecommendations,
      style: state.products.styleRecommendations,
      series: state.products.seriesRecommendations,
      trending: state.products.trendingRecommendations,
    }),
  }),
  mounted() {
    this.$store.dispatch('products/fetchRecommendations', {
      type: this.type,
      isCategory: this.isCategory,
    })
  },
  beforeDestroy() {
    this.$store.commit(DICT_COMMIT[this.type], [])
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
