<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <h1>{{ category.title }}</h1>

    <v-row>
      <v-col
        v-for="category in categories"
        :key="`${category.identifier}-${Math.random()}`"
        :cols="getCols(categories.length)"
      >
        <InnerCategoryCard :category="category" />
      </v-col>
    </v-row>

    <v-row v-if="category.description">
      <v-col cols="8">{{ category.description }}</v-col>
    </v-row>

    <ProductList :products="products" />

    <Pagination :category-id="category.identifier" />
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
  async fetch({ store, error, params, query }) {
    const { page } = query
    try {
      await store.dispatch('category/fetchCategories', params.id)
      await store.dispatch('products/fetchProductsByCategoryId', {
        id: params.id,
        page,
      })
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
  methods: {
    getCols(length) {
      switch (length) {
        case 1:
        case 2:
          return 6

        default:
          return 4
      }
    },
  },
}
</script>

<style scoped></style>
