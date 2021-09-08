<template>
  <div>
    <h1 class="mb-5">Товары со скидкой</h1>
    <v-row>
      <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 8">
        <p>
          Все товары в идеальном состоянии и находятся на складе в вашем городе.
        </p>
      </v-col>
    </v-row>
    <ProductList :products="products" list-type="Sales" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import ProductList from '@/components/ProductList'

export default {
  name: 'Sales',
  components: { ProductList },
  computed: {
    ...mapState({
      saleProducts: (state) => state.products.saleProducts,
      products: (state) => state.products.products,
    }),
  },
  async mounted() {
    await this.fetchSaleProducts()
    await this.fetchProductsByIds({
      ids: this.saleProducts.map((p) => p.productId),
      isSaleProducts: true,
    })
  },
  methods: {
    ...mapActions({
      fetchSaleProducts: 'products/fetchSaleProducts',
      fetchProductsByIds: 'products/fetchProductsByIds',
    }),
  },
  head() {
    return {
      title: 'Акции',
    }
  },
}
</script>

<style scoped></style>
