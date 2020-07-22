<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <h1>{{ category.title }}</h1>

    <v-row>
      <v-col
        v-for="category in categories"
        :key="`${category.identifier}-col`"
        cols="3"
      >
        <InnerCategoryCard :category="category" />
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="product in products"
        :key="`${product.id}-product`"
        cols="3"
      >
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import InnerCategoryCard from '@/components/InnerCategoryCard'
import ProductCard from '@/components/ProductCard'
import Breadcrumbs from '@/components/Breadcrumbs'

export default {
  components: { InnerCategoryCard, Breadcrumbs, ProductCard },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('category/fetchCategories', params.id)
      await store.dispatch('products/fetchProductsByCategoryId', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable API server',
      })
    }
  },
  computed: mapState({
    category: (state) => state.category.category,
    categories: (state) => state.category.categories,
    products: (state) => state.products.products,
    breadcrumbs: (state) => state.page.breadcrumbs,
  }),
}
</script>

<style scoped></style>
