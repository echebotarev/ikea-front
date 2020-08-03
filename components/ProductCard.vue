<template>
  <div>
    <nuxt-link :to="`/product/${product.id}`">
      <v-img
        :src="product.mainImageUrl"
        :lazy-src="product.mainImageUrl"
        :alt="product.typeName"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <h4>{{ product.name }}</h4>
      <p>{{ product.typeName }}</p>
      <p>{{ product.priceNumeral }}</p>
    </nuxt-link>
  </div>
</template>

<script>
// TODO собирать srcset scraper'ом
// TODO заменить lazy-src на thumbnail этого изображения
export default {
  name: 'ProductCard',
  props: {
    product: { type: Object, default: () => {} },
  },
}
</script>

<style scoped></style>
