<template>
  <v-row class="products">
    <v-col
      v-for="product in products"
      :key="product.id"
      :cols="$vuetify.breakpoint.smAndDown ? 6 : 3"
    >
      <ProductCard :product="product" />
    </v-col>
  </v-row>
</template>

<script>
import ProductCard from '@/components/ProductCard'
export default {
  name: 'ProductList',
  components: { ProductCard },
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped lang="scss"></style>
