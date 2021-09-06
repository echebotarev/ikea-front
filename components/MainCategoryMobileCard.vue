<!-- Используется на главной странице - "Товары" -->
<template>
  <v-expansion-panels accordion flat>
    <v-expansion-panel>
      <v-expansion-panel-header class="font-weight-bold">
        {{ CategoriesDict[categories[0].identifier] }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row
          v-for="(category, i) in categories"
          :key="`${category.url}-${i}`"
        >
          <v-col>
            <nuxt-link :to="`/category/${category.identifier}`">
              {{
                category.title === null
                  ? CategoriesDict[category.identifier]
                  : category.title
              }}
            </nuxt-link>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import CategoriesDict from '@/assets/data/categories'

export default {
  name: 'MainCategoryCard',
  props: {
    categories: { type: Array, default: () => [] },
  },
  computed: {
    CategoriesDict: () => CategoriesDict,
  },
}
</script>
<style scoped></style>
