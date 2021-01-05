<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <h1>{{ category.title }}</h1>

    <div v-if="isCategoryLoading">
      <SkeletonItems loader-type="category" />
    </div>
    <v-row v-else-if="categories && categories.length">
      <v-col
        v-for="(category, index) in categories"
        :key="`${category.identifier}-${index}`"
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

    <client-only>
      <ProductRecommendation type="trending" :is-category="true" />
    </client-only>

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
import SkeletonItems from '@/components/SkeletonItems'
import ProductRecommendation from '@/components/ProductRecommendation'

export default {
  components: {
    InnerCategoryCard,
    Breadcrumbs,
    ProductList,
    Pagination,
    Modal,
    Filters,
    SkeletonItems,
    ProductRecommendation,
  },

  async fetch({ store, error, params, query }) {
    store.commit('category/SET_CATEGORY_LOADING', true)

    try {
      const result = await store.dispatch('category/fetchCategories', params.id)
      if (result === false) {
        store.commit('category/SET_CATEGORY_LOADING', false)
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

    store.commit('category/SET_CATEGORY_LOADING', false)
  },

  computed: {
    ...mapState({
      category: (state) => state.category.category,
      categories: (state) => state.category.categories,
      isCategoryLoading: (state) => state.category.isCategoryLoading,

      products: (state) => state.products.products,

      breadcrumbs: (state) => state.page.breadcrumbs,
    }),
  },

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
          content: this.category.meta_description || '',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.category.meta_description || '',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.category.title,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'product.group',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.category.meta_image || '',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: `${this.category.title} - купить в интернет-магазине`,
        },
      ],
    }
  },
}
</script>

<style scoped></style>
