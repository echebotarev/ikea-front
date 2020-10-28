<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <h1>{{ category.title }}</h1>

    <v-row v-if="categories && categories.length">
      <v-col
        v-for="category in categories"
        :key="`${category.identifier}-${Math.random()}`"
        :cols="getCols(categories.length)"
      >
        <InnerCategoryCard :category="category" />
      </v-col>
    </v-row>

    <v-row v-if="category.description">
      <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 8">{{
        category.description
      }}</v-col>
    </v-row>

    <client-only>
      <Filters />
    </client-only>

    <ProductList :products="products" />

    <Pagination :category-id="category.identifier" target-id="scroll-target" />

    <Modal />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import InnerCategoryCard from '@/components/InnerCategoryCard'
import ProductList from '@/components/ProductList'
import Breadcrumbs from '@/components/Breadcrumbs'
import Filters from '@/components/Filters'
import Pagination from '@/components/Pagination'
import Modal from '@/components/Modal/index'

export default {
  components: {
    InnerCategoryCard,
    Breadcrumbs,
    ProductList,
    Pagination,
    Modal,
    Filters,
  },
  async fetch({ store, error, params, query }) {
    try {
      const result = await store.dispatch('category/fetchCategories', params.id)
      if (!result) {
        return error({
          statusCode: 404,
          message: 'Упс, такой страницы не существует',
        })
      }

      await store.dispatch('products/fetchProductsByCategoryId', {
        id: params.id,
        ...query,
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
  watchQuery: true,

  head() {
    return {
      title: this.category.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.category.description || this.category.title,
        },
      ],
    }
  },
}
</script>

<style scoped></style>
