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
            v-for="(item, index) in recommendations[type]"
            :key="item.identifier"
            class="slide-item"
          >
            <div>
              <ObserverVisibility
                :product="Object.assign({ position: index + 1 }, item)"
                :list-type="type"
              >
                <div
                  @click="
                    clickProduct({
                      products: [Object.assign({ position: index + 1 }, item)],
                      shopId,
                      coefficient,
                      list: type,
                    })
                  "
                >
                  <ProductCard :product="item" :place="type" />
                </div>
              </ObserverVisibility>
            </div>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>

      <v-divider></v-divider>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ec from '@/utils/ec'

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
    ProductCard: () => import('@/components/ProductCard'),
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

  computed: {
    ...mapState({
      shopId: (state) => state.geo.shopId,
      recommendations: (state) => ({
        same: state.products.sameRecommendations,
        similar: state.products.similarRecommendations,
        style: state.products.styleRecommendations,
        series: state.products.seriesRecommendations,
        trending: state.products.trendingRecommendations,
      }),
    }),

    ...mapGetters({
      coefficient: 'variables/coefficient',
    }),
  },

  mounted() {
    this.$store.dispatch('products/fetchRecommendations', {
      type: this.type,
      isCategory: this.isCategory,
    })
  },
  beforeDestroy() {
    this.$store.commit(DICT_COMMIT[this.type], [])
  },

  methods: {
    clickProduct(payload) {
      this.$gtag.ec(ec.clickProduct(payload))
    },
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
