<template>
  <div>
    <p v-if="category.title">{{ category.title }}</p>
    <v-img v-if="category.title === null" :src="category.image"></v-img>
  </div>
</template>
<script>
export default {
  name: 'CategoryCard',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    category: Object,
  },
}
</script>
<style scoped></style>
