<template>
  <div>
    <AttentionButton v-if="saleProducts.length" class="mt-5" />

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

    <v-row v-if="category.description" class="mb-5">
      <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 8">{{
        category.description
      }}</v-col>
    </v-row>

    <client-only>
      <Filters class="mb-5" />
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
import { mapGetters, mapState } from 'vuex'

// import { hydrateWhenVisible } from 'vue-lazy-hydration'

export default {
  components: {
    InnerCategoryCard: () => import('@/components/InnerCategoryCard'),
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    ProductList: () => import('@/components/ProductList'),
    Pagination: () => import('@/components/Pagination'),
    Modal: () => import('@/components/Modal/index'),
    Filters: () => import('@/components/Filters'),
    SkeletonItems: () => import('@/components/SkeletonItems'),
    ProductRecommendation: () => import('@/components/ProductRecommendation'),
    AttentionButton: () => import('@/components/AttentionButton'),
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
    ...mapGetters({
      coefficient: 'variables/coefficient',
    }),
    ...mapState({
      category: (state) => state.category.category,
      categories: (state) => state.category.categories,
      isCategoryLoading: (state) => state.category.isCategoryLoading,

      products: (state) => state.products.products,

      breadcrumbs: (state) => state.page.breadcrumbs,

      saleProducts: (state) => state.products.saleProducts,
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

    getTitle() {
      const title =
        this.breadcrumbs && this.breadcrumbs[this.breadcrumbs.length - 2]
          ? this.breadcrumbs[this.breadcrumbs.length - 2].text
          : null
      return `${title ? `${title}, ` : ''}${this.category.title}`
    },
  },
  watchQuery: true,

  head() {
    return {
      title: this.getTitle(),
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
          content: this.getTitle(),
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
          content: `${this.getTitle()} - купить в интернет-магазине`,
        },
      ],
    }
  },
}
</script>

<style scoped></style>
