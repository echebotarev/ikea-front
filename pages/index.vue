<template>
  <v-main>
    <v-row v-if="shopId !== '003'" class="my-5">
      <v-col cols="12" :sm="shopId === '001' ? 'auto' : 7">
        <client-only>
          <v-card v-if="shopId === '002'">
            <v-card-title>Новые условия доставки:</v-card-title>
            <v-card-subtitle class="py-2 font-weight-bold">
              От 0 до 30 тыс. - Стоимость доставки 10%
            </v-card-subtitle>
            <v-card-subtitle class="py-2 font-weight-bold">
              От 30 до 50 тыс. - Стоимость доставки 8%
            </v-card-subtitle>
            <v-card-subtitle class="py-2 font-weight-bold">
              От 50 тыс. и выше - Стоимость доставки 6%
            </v-card-subtitle>
          </v-card>
        </client-only>
      </v-col>
      <v-col cols="12" :sm="shopId === '001' ? 'auto' : 5">
        <CountDown v-if="shopId !== '003'" />
      </v-col>
    </v-row>

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
import getCityName from '@/utils/getCityName'

export default {
  components: {
    CountDown: () => import('@/components/CountDown/index'),
    MainCategoryCard: () => import('@/components/MainCategoryCard'),
    MainCategoryMobileCard: () => import('@/components/MainCategoryMobileCard'),
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
    shopId: (state) => state.geo.shopId,
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

  head() {
    return {
      titleTemplate: 'DomaDoma - Доставка IKEA по Казахстану и России',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Доставка товаров IKEA. Сервис по доставке товаров IKEA в ${getCityName(
            this
          )} прямо до двери`,
        },
      ],
    }
  },
}
</script>
