<template>
  <div>
    <nuxt-link :to="`/product/${product.id}`">
      <v-img :src="product.mainImageUrl" :alt="product.typeName"></v-img>
      <h4>{{ product.name }}</h4>
      <p>{{ product.typeName }}</p>
      <p>{{ product.priceNumeral }}</p>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: { type: Object, default: () => {} },
  },
}
</script>

<style scoped></style>
