<template>
  <div class="products-list">
    <v-row v-for="product in products" :key="product.identifier">
      <v-col>
        <v-row>
          <v-col cols="3">
            <v-img
              :src="getImage(product.images.fullMediaList[0].content.url, 3)"
            ></v-img>
          </v-col>
          <v-col cols="4" class="cart-description">
            <v-row
              v-if="product.price.newProductText"
              class="product-new"
              no-gutters
            >
              <v-col>{{ product.price.newProductText }}</v-col>
            </v-row>

            <v-row
              v-if="product.price.familyText"
              class="family-text"
              no-gutters
            >
              <v-col>{{ product.price.familyText }}</v-col>
            </v-row>

            <a :href="`/product/${product.identifier}`">
              <h4>{{ product.name }}</h4>
            </a>
            <div>{{ product.price.productDescription }}</div>
            <div v-if="product.price.measurementText">
              {{ product.price.measurementText }}
            </div>
            <div>{{ product.display_identifier }}</div>
          </v-col>
          <v-col class="cart-price text-right">
            <div class="main-price">
              <Price
                :price="
                  $getPrice(product.price.price.mainPriceProps.price.integer) *
                  product.qnt
                "
                :is-only-formatted="true"
                symbol=".-"
                :class-name="
                  product.price.price.mainPriceProps.hasHighlight &&
                  product.qnt === 1
                    ? 'highlight'
                    : ''
                "
              />

              <Price
                v-if="product.qnt > 1"
                :price="product.price.price.mainPriceProps.price.integer"
                symbol=".-"
                :class-name="`light ${
                  product.price.price.mainPriceProps.hasHighlight
                    ? 'highlight'
                    : ''
                }`"
              />

              <div v-if="product.price.familyText" class="previous-price">
                <Price
                  :price="
                    $getPrice(
                      product.price.price.previousPriceProps.price.integer
                    ) * product.qnt
                  "
                  :is-only-formatted="true"
                  :prepend="`${product.price.price.previousPriceText}:`"
                  symbol=".-"
                  class-name="light"
                />

                <Price
                  v-if="product.qnt > 1"
                  :price="product.price.price.previousPriceProps.price.integer"
                  symbol=".-"
                  class-name="light"
                />
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3"></v-col>
          <v-col cols="4"><b>Наличие</b></v-col>
          <v-col class="text-right">
            <v-btn icon @click="removeProduct({ product, qnt: product.qnt })">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
            <v-btn icon @click="removeProduct({ product, qnt: 1 })">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <span class="amount">{{ product.qnt }}</span>
            <v-btn icon @click="addProduct({ product, qnt: 1 })">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import getImage from 'assets/utils/getImage'
import { mapActions } from 'vuex'
import Price from '@/components/Price'

export default {
  name: 'CartProductCard',
  components: { Price },
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapActions({
      addProduct: 'cart/addProduct',
      removeProduct: 'cart/removeProduct',
    }),
    getImage,
  },
}
</script>

<style scoped lang="scss">
.products-list {
  > .row {
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
  }

  .product-price {
    display: block;
  }

  .family-text {
    display: inline-block;
    background-color: #0077c8;
    font-weight: 700;
    color: #fff;
    padding: 0 0.5em;
  }

  .highlight {
    display: inline-block;
    background: #ffce00;
    padding: 0.15rem 0.3rem;
    box-shadow: 4px 4px 0 0 #ef4123;
    margin: 0 0.375rem 0.375rem 0;
  }
}
</style>
