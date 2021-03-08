<template>
  <v-main>
    <h1>{{ category.title }}</h1>

    <v-row v-if="$vuetify.breakpoint.smAndUp">
      <v-col v-for="col in cols" :key="col[0].url" cols="3">
        <MainCategoryCard
          v-for="(category, index) in col"
          :key="`${category.identifier}-${col[0].url}-${index}`"
          :data-index="index"
          :category="category"
        />
      </v-col>
    </v-row>

    <v-row v-if="$vuetify.breakpoint.smAndDown">
      <v-col v-for="col in cols" :key="col[0].url" cols="12">
        <MainCategoryMobileCard :categories="col" />
        <v-divider></v-divider>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'
import MainCategoryCard from '@/components/MainCategoryCard'
import MainCategoryMobileCard from '@/components/MainCategoryMobileCard'

export default {
  components: {
    MainCategoryCard,
    MainCategoryMobileCard,
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
          if (category.title === null || category.title.trim() === '') {
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
  head: () => ({
    titleTemplate: 'DomaDoma - Доставка IKEA',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Доставка товаров IKEA. Сервис по доставке товаров IKEA в Актау прямо до двери',
      },
    ],
  }),
}
</script>
