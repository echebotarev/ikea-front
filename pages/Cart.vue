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
              <v-btn icon>
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <span class="amount">{{ product.qnt }}</span>
              <v-btn icon>
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Cart',
  computed: mapState({
    products: (state) => state.cart.products,
  }),
}
</script>

<style scoped></style>
