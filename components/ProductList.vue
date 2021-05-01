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
  },
}
</script>

<style scoped lang="scss"></style>
