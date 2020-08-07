<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <h1>{{ category.title }}</h1>

    <v-row>
      <v-col
        v-for="category in categories"
        :key="`${category.identifier}-${Math.random()}`"
        cols="3"
      >
        <InnerCategoryCard :category="category" />
      </v-col>
    </v-row>

    <ProductList :products="products" />

    <Pagination :count="productCount" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import InnerCategoryCard from '@/components/InnerCategoryCard'
import ProductList from '@/components/ProductList'
import Breadcrumbs from '@/components/Breadcrumbs'
import Pagination from '@/components/Pagination'

export default {
  components: { InnerCategoryCard, Breadcrumbs, ProductList, Pagination },
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
    productCount: (state) => state.products.productCount,

    breadcrumbs: (state) => state.page.breadcrumbs,
  }),
}
</script>

<style scoped></style>
