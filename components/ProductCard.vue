<template>
  <div>
    <nuxt-link :to="`/product/${product.id}`">
      <v-img
        :src="getImage(product.mainImageUrl, 4)"
        lazy-src="/images/placeholder.png"
        :alt="product.typeName"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-icon x-large>mdi-image-multiple-outline</v-icon>
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
// TODO заменить lazy-src на thumbnail этого изображения
import getImage from '@/assets/utils/getImage'

export default {
  name: 'ProductCard',
  props: {
    product: { type: Object, default: () => {} },
  },
  methods: { getImage },
}
</script>

<style scoped></style>
