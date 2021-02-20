<template>
  <div class="card-container">
    <v-card
      elevation="0"
      :class="`card-product ${product.available === 0 ? 'disabled' : ''}`"
    >
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
        <h4
          v-if="product.price.familyText"
          class="card-product-name family-text"
        >
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
            :unit="
              product.price.price && product.price.price.mainPriceProps.unit
            "
          />

          <div class="circle-btn-container">
            <CircleBtn
              v-if="product.available"
              :add-product="(payload) => addProduct(payload)"
              :product="product"
            />
          </div>
        </div>
      </nuxt-link>
    </v-card>
    <v-btn
      v-if="product.available === 0 && !isOpenArrival"
      elevation="0"
      class="button button-black"
      @click="() => (isOpenArrival = !isOpenArrival)"
    >
      Узнать о поступлении
    </v-btn>
    <div class="arrival-container">
      <ArrivalMail
        v-if="product.available === 0 && isOpenArrival"
        :id="product.identifier"
        :type="product.utag.product_type"
      />
    </div>
  </div>
</template>

<script>
import Price from '@/components/Price'
import ArrivalMail from '@/components/ArrivalMail'
import CircleBtn from '@/components/CircleBtn'
import getImage from '@/assets/utils/getImage'
import { mapActions } from 'vuex'

export default {
  name: 'ProductCard',
  components: { Price, ArrivalMail, CircleBtn },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      isOpenArrival: false,
    }
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

    ...mapActions({
      addProduct: 'orders/addProduct',
    }),
  },
}
</script>

<style scoped lang="scss">
.card-container {
  position: relative;

  .arrival-container {
    position: absolute;
    top: 0;
    left: 0;
  }
}
.card-product {
  &.disabled {
    opacity: 0.5;
  }

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

.circle-btn-container {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
