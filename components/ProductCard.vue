<template>
  <div class="card-product">
    <nuxt-link :to="`/product/${product.id || product.item_id}`">
      <v-img
        :src="getImage(product.mainImageUrl || product.image_url, 4)"
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
        {{ getDescription(product) }}
      </p>
      <div class="card-product-price">
        <Price :price="product.priceNumeral || product.price.RUB" />
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import Price from '@/components/Price'
import getImage from '@/assets/utils/getImage'

export default {
  name: 'ProductCard',
  components: { Price },
  props: {
    product: { type: Object, default: () => {} },
  },
  methods: {
    getImage,
    getDescription(product) {
      if (product.typeName) {
        return product.typeName + product.itemMeasureReferenceText
          ? `, ${product.itemMeasureReferenceText}`
          : ''
      }

      if (product.product_attributes) {
        return product.product_attributes.upd_product_description
      }

      return ''
    },
  },
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
    white-space: normal;
  }
}
.card-product-price {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 16px;
}
</style>
