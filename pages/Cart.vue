<template>
  <client-only>
    <div>
      <h1>Корзина</h1>
      <div class="mb-16">
        <CartProductCard :products="products" />

        <v-row class="cart-total">
          <v-col>Сумма:</v-col>
          <v-col class="text-right">
            <Price :price="sum" :is-only-formatted="true" />
          </v-col>
        </v-row>
      </div>

      <div class="mb-10">
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

      <div class="mb-10">
        <v-row class="pr-5 pl-5">
          <v-col class="text-overline" :cols="$vuetify.breakpoint.xs ? 12 : 7">
            Экономьте свое время. Воспользуйтесь услугой сборки. <br />
            Стоимость сборки - {{ assemblyPercent }}% от суммы заказа
          </v-col>

          <v-divider vertical></v-divider>

          <v-col>
            <v-row>
              <v-col cols="8">
                <v-checkbox
                  v-model="checkbox"
                  prepend-icon="mdi-tools"
                  label="Заказать сборку"
                  class="checkbox"
                ></v-checkbox>
              </v-col>

              <v-col class="text-right">
                <Price :price="getAssemblyValue" :is-only-formatted="true" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import config from '@/config'
import { assemblyPercent } from '@/constants'
import CartProductCard from '@/components/CartProductCard'
import Price from '~/components/Price'

export default {
  name: 'Cart',
  components: { CartProductCard, Price },
  data() {
    return {
      value: '',
      checkbox: false,
      assemblyPercent,
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
    getAssemblyValue() {
      if (this.checkbox) {
        return (this.sum * this.assemblyPercent) / 100
      }

      return 0
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

<style scoped lang="scss">
.checkbox {
  margin-top: 0 !important;
}
</style>
