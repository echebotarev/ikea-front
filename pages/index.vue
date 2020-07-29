<template>
  <v-main>
    <h1>{{ category.title }}</h1>

    <v-row>
      <v-col v-for="col in cols" :key="col[0].title" cols="3">
        <MainCategoryCard
          v-for="(category, index) in col"
          :key="`${category.identifier}-${Math.random()}`"
          :data-index="index"
          :category="category"
        />
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'
import MainCategoryCard from '@/components/MainCategoryCard'

export default {
  components: {
    MainCategoryCard,
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
