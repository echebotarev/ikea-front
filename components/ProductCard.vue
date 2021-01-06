<template>
  <div class="card-product">
    <nuxt-link
      :to="`/product/${product.id || product.item_id || product.identifier}`"
    >
      <v-img
        :src="
          getImage(
            product.mainImageUrl ||
              product.image_url ||
              (product.images.fullMediaList.length
                ? product.images.fullMediaList[0].content.url
                : '/images/placeholder.png'),
            4
          )
        "
        lazy-src="/images/placeholder.png"
        :alt="product.typeName || product.name"
        aspect-ratio="1"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-icon x-large>mdi-image-multiple-outline</v-icon>
          </v-row>
        </template>
      </v-img>
      <h4 v-if="product.price.familyText" class="card-product-name family-text">
        {{ product.price.familyText }}
      </h4>
      <h4 class="card-product-name">{{ product.name }}</h4>
      <p class="card-product-description">
        {{ getDescription(product) }}
      </p>

      <span
        v-if="product.price.price && product.price.price.previousPriceProps"
        class="card-product-previous-price-text"
      >
        {{ product.price.price.previousPriceText }}
        <Price
          :price="product.price.price.previousPriceProps.price.integer"
          :without-label="true"
        />
      </span>

      <div class="card-product-price">
        <Price
          :price="
            product.priceNumeral ||
            product.price.RUB ||
            product.price.price.mainPriceProps.price.integer
          "
          :unit="product.price.price && product.price.price.mainPriceProps.unit"
        />
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
        return (
          product.typeName +
          (product.itemMeasureReferenceText
            ? `, ${product.itemMeasureReferenceText}`
            : '')
        )
      }

      if (product.product_attributes) {
        return product.product_attributes.upd_product_description
      }

      if (product.price.productDescription) {
        return `${product.price.productDescription}, ${product.price.measurementText}`
      }

      return ''
    },
  },
}
</script>

<style scoped lang="scss">
.card-product {
  .card-product-name {
    text-overflow: ellipsis;
    overflow: hidden;
    margin-top: 21px;
  }

  .family-text.card-product-name,
  .family-text + .card-product-name {
    margin-top: 0;
  }

  .card-product-previous-price-text {
    color: #484848;
    font-size: 0.75rem;

    .product-price {
      font-size: inherit;
    }
  }

  a:hover {
    .card-product-name {
      text-decoration: underline;
    }

    .family-text {
      text-decoration: none;
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
