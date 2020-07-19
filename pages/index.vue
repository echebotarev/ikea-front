<template>
  <v-main>
    <h1>{{ category.title }}</h1>

    <v-row>
      <v-col v-for="col in cols" :key="col[0].title" cols="3">
        <CategoryCard
          v-for="(category, index) in col"
          :key="index"
          :data-index="index"
          :category="category"
        />
      </v-col>
    </v-row>
  </v-main>
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
    cols: (state) => {
      const cols = {}
      let prevColName
      let colName = 0
      try {
        state.category.categories.forEach((category) => {
          if (category.title === null) {
            cols[colName] = []
            prevColName = colName
            colName++
          }

          cols[prevColName].push(category)
        })
      } catch (e) {}

      return cols
    },
  }),
  head() {
    return {
      title: 'IKEA - Товары',
    }
  },
}
</script>
