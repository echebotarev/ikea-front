<template>
  <div class="card-product">
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
      <h4 class="card-product-name">{{ product.name }}</h4>
      <p class="card-product-description">
        {{ product.typeName
        }}{{
          product.itemMeasureReferenceText
            ? `, ${product.itemMeasureReferenceText}`
            : ''
        }}
      </p>
      <p class="card-product-price">{{ product.priceNumeral }}</p>
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

<style scoped lang="scss">
.card-product {
  a:hover {
    .card-product-name {
      text-decoration: underline;
    }
  }
}
p {
  &.card-product-description {
    font-size: 14px;
    color: #484848;
  }

  &.card-product-price {
    font-size: 22px;
    font-weight: 600;
  }
}
</style>
