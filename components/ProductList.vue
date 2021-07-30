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
        <ProductCard :product="product" />
      </ObserverVisibility>
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
    listType: {
      type: String,
      default: () => 'Category',
    },
  },
}
</script>

<style scoped lang="scss"></style>
