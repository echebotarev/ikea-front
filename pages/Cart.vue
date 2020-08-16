<template>
  <div>
    <h1>Корзина</h1>
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
                    $getPrice(
                      product.price.price.mainPriceProps.price.integer
                    ) * product.qnt
                  "
                  :is-only-formatted="true"
                  symbol=".-"
                />

                <Price
                  v-if="product.qnt > 1"
                  :price="product.price.price.mainPriceProps.price.integer"
                  symbol=".-"
                  class="light"
                />
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

      <v-row class="cart-total">
        <v-col>Сумма</v-col>
        <v-col class="text-right">
          <Price :price="sum" :is-only-formatted="true" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import getImage from 'assets/utils/getImage'
import Price from '@/components/Price'

export default {
  name: 'Cart',
  components: { Price },
  computed: mapState({
    products: (state) => state.cart.products,
    sum(state) {
      let sum = 0
      state.cart.products.forEach((product) => {
        const price =
          this.$getPrice(product.price.price.mainPriceProps.price.integer) *
          product.qnt
        sum += price
      })
      return sum
    },
  }),
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
}
</style>
