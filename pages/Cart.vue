<template>
  <client-only>
    <div>
      <h1>Корзина</h1>
      <div>
        <CartProductCard :products="products" />

        <v-row class="cart-total">
          <v-col>Сумма:</v-col>
          <v-col class="text-right">
            <Price :price="sum" :is-only-formatted="true" />
          </v-col>
        </v-row>
      </div>

      <div>
        <span class="text-overline pl-5">Укажите адрес доставки:</span>
        <v-text-field
          id="address"
          flat
          hide-details
          rounded
          filled
          placeholder="Актау ..."
          full-width
          height="50"
          :value="value"
        >
        </v-text-field>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import config from '@/config'
import CartProductCard from '@/components/CartProductCard'
import Price from '~/components/Price'

export default {
  name: 'Cart',
  components: { CartProductCard, Price },
  data() {
    return {
      value: '',
    }
  },
  computed: {
    ...mapState({
      products: (state) => state.orders.products,
      sum(state) {
        let sum = 0
        state.orders.products.forEach((product) => {
          const price =
            this.$getPrice(product.price.price.mainPriceProps.price.integer) *
            product.qnt
          sum += price
        })
        return sum
      },
    }),
    getValue() {
      return this.value
    },
  },
  mounted() {
    global.ymaps.ready(() => {
      // eslint-disable-next-line no-new
      const suggestView = new global.ymaps.SuggestView('address')

      suggestView.events.add('select', (e) => {
        this.value = e.get('item').displayName
      })
    })
  },
  methods: {
    ...mapGetters({
      availabilityProduct: 'availability/availabilityProduct',
    }),
  },
  head: {
    script: [
      {
        src: `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${config.yandexApiKey}`,
      },
    ],
  },
}
</script>

<style scoped lang="scss"></style>
