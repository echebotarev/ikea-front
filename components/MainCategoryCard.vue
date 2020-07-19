<!-- Используется на главной странице - "Товары" -->
<template>
  <div>
    <nuxt-link :to="`/cat/${category.identifier}`">
      <p v-if="category.title">{{ category.title }}</p>
      <v-img v-if="category.title === null" :src="category.image"></v-img>
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
