<!-- Используется на внутренних страницах категорий -->
<template>
  <div class="card-category">
    <nuxt-link :to="`/category/${category.identifier}`">
      <v-img
        v-if="category.image"
        :src="category.image"
        lazy-src="/images/placeholder-horizontal.png"
        aspect-ratio="1.785"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-icon x-large>mdi-image-multiple-outline</v-icon>
          </v-row>
        </template>
      </v-img>
      <p v-if="category.title">{{ category.title }}</p>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  name: 'MainCategoryCard',
  props: {
    category: { type: Object, default: () => {} },
  },
}
</script>
<style scoped></style>
