<template>
  <client-only>
    <div class="cart">
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

      <v-form>
        <v-row>
          <v-col cols="12">
            <span class="text-overline pl-5">Имя:</span>
            <v-text-field
              v-model="name"
              flat
              hide-details
              rounded
              filled
              placeholder="ФИО"
              full-width
              height="50"
              :rules="[rules.required]"
              required
            >
            </v-text-field>
          </v-col>

          <v-col :cols="$vuetify.breakpoint.xs ? 12 : 6">
            <span class="text-overline pl-5">Телефон:</span>
            <v-text-field
              v-model="phone"
              v-mask="'# (###) ###-####'"
              flat
              hide-details
              rounded
              filled
              placeholder="8 701 123 4567"
              full-width
              height="50"
              :rules="[rules.required]"
              required
            >
            </v-text-field>
          </v-col>

          <v-col :cols="$vuetify.breakpoint.xs ? 12 : 6">
            <span class="text-overline pl-5">Адрес почты:</span>
            <v-text-field
              v-model="mail"
              flat
              hide-details
              rounded
              filled
              placeholder="mail@example.com"
              full-width
              height="50"
              :rules="[rules.required, rules.email]"
              required
            >
            </v-text-field>
          </v-col>
        </v-row>

        <v-row class="mb-10">
          <v-col>
            <span class="text-overline pl-5"
              >Укажите полный адрес доставки (Город, микрорайон, дом,
              квартира):</span
            >
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
              :rules="[rules.required]"
              prepend-inner-icon="mdi-map-marker"
            >
            </v-text-field>
          </v-col>
        </v-row>

        <v-row v-if="assemblySum" no-gutters class="mb-10">
          <v-col>
            <v-row class="pr-5 pl-5">
              <v-col :cols="$vuetify.breakpoint.xs ? 12 : 7">
                <span class="text-overline"
                  >Экономьте свое время. Воспользуйтесь услугой сборки.</span
                >
                <span class="text-caption text-decoration-underline"
                  >Сборка начисляется только на товары требующие сборки</span
                >
              </v-col>

              <v-divider vertical></v-divider>

              <v-col>
                <v-row>
                  <v-col cols="8">
                    <v-checkbox
                      v-model="isAssembly"
                      prepend-icon="mdi-tools"
                      label="Заказать сборку"
                      class="checkbox"
                    ></v-checkbox>

                    <span
                      style="display: block; margin-top: -20px;"
                      class="text-caption pl-9"
                      >Стоимость сборки - {{ assemblyPercent }}%</span
                    >
                  </v-col>

                  <v-col class="text-right">
                    <Price
                      :price="getAssemblyValue"
                      :is-only-formatted="true"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-form>

      <v-row class="mb-10">
        <v-col>Итого:</v-col>
        <v-col class="text-right">
          <Price :price="total" :is-only-formatted="true" />
        </v-col>
      </v-row>
    </div>
  </client-only>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
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
      assemblyPercent,
      phone: '',
      name: '',
      mail: '',
      isAssembly: false,
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    }
  },
  computed: {
    ...mapState({
      order: (state) => state.orders.order,
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

      assemblySum(state) {
        let sum = 0
        state.orders.products.forEach((product) => {
          if (
            product.information.productDetailsProps.accordionObject
              .assemblyAndDocuments
          ) {
            const price =
              this.$getPrice(product.price.price.mainPriceProps.price.integer) *
              product.qnt
            sum += price
          }
        })
        return sum
      },
    }),

    ...mapGetters({
      availabilityProduct: 'availability/availabilityProduct',
    }),

    getValue() {
      return this.value
    },

    getAssemblyValue() {
      if (this.isAssembly) {
        return (this.assemblySum * this.assemblyPercent) / 100
      }

      return 0
    },

    total() {
      return this.getAssemblyValue + this.sum
    },
  },
  mounted() {
    this.initScripts('ymaps')

    // без этого ф-ия receiveMessage падает на JSON.parse
    // туда приходят данные от detector.js в виде объекта
    setTimeout(() => {
      this.initScripts('cp')
    }, 5000)
  },
  methods: {
    pay() {
      const updateOrder = this.updateOrder.bind(this)
      const getLetterProducts = this.getLetterProducts.bind(this)

      this.widget.pay(
        'auth',
        {
          publicId: config.cloudPaymentsPublicKey, // id из личного кабинета
          description: 'Оплата товаров в doma-doma.kz', // назначение
          amount: this.total, // сумма
          currency: 'KZT', // валюта
          invoiceId: this.order._id, // номер заказа  (необязательно)
          accountId: this.mail, // идентификатор плательщика (необязательно)
          skin: 'classic', // дизайн виджета (необязательно)
          data: {
            isAssembly: this.isAssembly,
            assembly: this.isAssembly ? this.getAssemblyValue : 0,
            name: this.name,
            to: this.mail,
            total: this.total,
          },
        },
        {
          onSuccess(options) {
            // success
            console.log('Success')
          },
          onFail(reason, options) {
            // fail
            console.log('Fail')
          },
          onComplete(paymentResult, options) {
            console.log('Complete')
            if (paymentResult.success) {
              const { invoiceId } = options

              updateOrder({
                orderId: invoiceId,
                payload: Object.assign(options.data, {
                  paid: true,
                  products: getLetterProducts(),
                }),
              })
            }
          },
        }
      )
    },

    initScripts(name) {
      if (name === 'ymaps' && global.ymaps) {
        return global.ymaps.ready(() => {
          // eslint-disable-next-line no-new
          const suggestView = new global.ymaps.SuggestView('address')

          suggestView.events.add('select', (e) => {
            this.value = e.get('item').displayName
          })
        })
      } else if (name === 'cp' && global.cp) {
        // eslint-disable-next-line no-undef
        return (this.widget = new cp.CloudPayments())
      }

      return setTimeout(this.initScripts.bind(this, name), 100)
    },

    validateProducts() {
      const availableProducts = {}
      this.products.forEach((product) => {
        const availableProduct =
          this.availabilityProduct(product.identifier).StockAvailability &&
          this.availabilityProduct(product.identifier).StockAvailability
            .RetailItemAvailability.AvailableStock.$

        availableProducts[product.identifier] = !!(
          availableProduct && availableProduct - product.qnt
        )
      })

      let text = ''
      this.products.forEach((product) => {
        if (availableProducts[product.identifier] === false) {
          text = text ? `${text}, ${product.name}` : product.name
        }
      })

      text &&
        this.$notify({
          group: 'all',
          title: 'К сожалению этих товаров осталось слишком мало:',
          text,

          type: 'warn',
          duration: 10000,
        })
    },

    getLetterProducts() {
      return this.products.map((product) => {
        return Object.assign({}, product, {
          computedPrice: this.$getPrice(
            product.price.price.mainPriceProps.price.integer
          ),
          computedPriceTotal:
            this.$getPrice(product.price.price.mainPriceProps.price.integer) *
            product.qnt,
        })
      })
    },

    ...mapActions({
      updateOrder: 'orders/updateOrder',
    }),
  },
  head: {
    script: [
      {
        src: `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${config.yandexApiKey}`,
        defer: true,
        type: 'text/javascript',
      },
      {
        src: 'https://widget.cloudpayments.ru/bundles/cloudpayments',
        defer: true,
        type: 'text/javascript',
      },
    ],
  },
}
</script>

<style scoped lang="scss">
.cart {
  .checkbox {
    margin-top: 0 !important;
  }

  > .row:last-of-type {
    border-top: thin solid rgba(0, 0, 0, 0.12);
  }
}
</style>
