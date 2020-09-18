<!-- Используется на главной странице - "Товары" -->
<template>
  <div class="card-category">
    <nuxt-link :to="`/category/${category.identifier}`">
      <p v-if="category.title">{{ category.title }}</p>
      <div v-if="category.title === null">
        <v-img
          :src="category.image"
          lazy-src="/images/placeholder-horizontal.png"
          aspect-ratio="1.8"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-icon x-large>mdi-image-multiple-outline</v-icon>
            </v-row>
          </template>
        </v-img>
        <h3 class="mb-4 mt-2">{{ CategoriesDict[category.identifier] }}</h3>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
import CategoriesDict from '@/assets/data/categories'

export default {
  name: 'MainCategoryCard',
  props: {
    category: { type: Object, default: () => {} },
  },
  computed: {
    CategoriesDict: () => CategoriesDict,
  },
}
</script>
<style scoped lang="scss">
h3 {
  color: #000;
}
</style>
