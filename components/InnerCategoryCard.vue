<!-- Используется на внутренних страницах категорий -->
<template>
  <div>
    <nuxt-link :to="`/cat/${category.identifier}`">
      <v-img v-if="category.image" :src="category.image"></v-img>
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
