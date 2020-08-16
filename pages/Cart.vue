<template>
  <div>
    <h1>Корзина</h1>
    <div>
      <CartProductCard :products="products" />

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
import { mapGetters, mapState } from 'vuex'
import CartProductCard from '@/components/CartProductCard'

export default {
  name: 'Cart',
  components: { CartProductCard },
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
    ...mapGetters({
      availabilityProduct: 'availability/availabilityProduct',
    }),
  },
}
</script>

<style scoped lang="scss"></style>
