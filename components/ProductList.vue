<template>
  <v-row class="products">
    <v-col
      v-for="(product, index) in products"
      :key="product.id"
      :cols="$vuetify.breakpoint.smAndDown ? 6 : 3"
    >
      <ObserverVisibility
        :product="Object.assign({ position: index + 1 }, product)"
        :list-type="listType"
      >
        <div
          @click="
            clickProduct({
              products: [Object.assign({ position: index + 1 }, product)],
              shopId,
              coefficient,
              list: listType,
            })
          "
        >
          <ProductCard :product="product" />
        </div>
      </ObserverVisibility>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ec from '@/utils/ec'

export default {
  name: 'ProductList',
  components: {
    ProductCard: () => import('@/components/ProductCard'),
  },
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    listType: {
      type: String,
      default: () => 'Category',
    },
  },

  computed: {
    ...mapGetters({
      coefficient: 'variables/coefficient',
    }),
    ...mapState({
      shopId: (state) => state.geo.shopId,
    }),
  },

  methods: {
    clickProduct(payload) {
      this.$gtag.ec(ec.clickProduct(payload))
    },
  },
}
</script>

<style scoped lang="scss"></style>
