<template>
  <p>{{ category.title }}</p>
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
