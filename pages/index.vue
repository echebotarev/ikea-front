<template>
  <div>
    <h1>{{ category.title }}</h1>

    <CategoryCard
      v-for="(category, index) in categories"
      :key="index"
      :data-index="index"
      :category="category"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CategoryCard from '@/components/CategoryCard'

export default {
  components: {
    CategoryCard,
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('category/fetchCategories')
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
  }),
  head() {
    return {
      title: 'Event Listening',
    }
  },
}
</script>
