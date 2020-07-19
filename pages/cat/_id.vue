<template>
  <v-main>
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
  </v-main>
</template>

<script>
import { mapState } from 'vuex'
import InnerCategoryCard from '@/components/InnerCategoryCard'
import Breadcrumbs from '@/components/Breadcrumbs'

export default {
  components: { InnerCategoryCard, Breadcrumbs },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('category/fetchCategories', params.id)
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
    breadcrumbs: (state) => state.page.breadcrumbs,
  }),
}
</script>

<style scoped></style>
