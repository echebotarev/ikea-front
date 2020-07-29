<template>
  <div>
    <h1>Корзина</h1>
    <div class="products-list">
      <v-row v-for="product in products" :key="product.identifier">
        <v-col>
          <v-row>
            <v-col cols="3">
              <v-img :src="product.images.fullMediaList[0].content.url"></v-img>
            </v-col>
            <v-col cols="4" class="cart-description">
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
                <b>{{ product.price.price.mainPriceProps.price.integer }}</b>
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

      <v-divider></v-divider>

      <v-row class="cart-total">
        <v-col>Сумма</v-col>
        <v-col class="text-right">{{ sum }}</v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Cart',
  computed: mapState({
    products: (state) => state.cart.products,
    sum: (state) => {
      let sum = 0
      state.cart.products.forEach((product) => {
        const price = product.price.price.mainPriceProps.price.integer.replace(
          / /g,
          ''
        )
        sum += parseInt(price)
      })
      return sum
    },
  }),
  beforeMount() {
    this.setProducts(
      // eslint-disable-next-line no-undef
      JSON.parse(globalThis.localStorage.getItem('cart') || '[]')
    )
  },
  methods: mapActions({
    addProduct: 'cart/addProduct',
    removeProduct: 'cart/removeProduct',
    setProducts: 'cart/setProducts',
  }),
}
</script>

<style scoped></style>
