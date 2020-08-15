<template>
  <v-row class="products">
    <v-col v-for="product in products" :key="product.id" cols="3">
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
