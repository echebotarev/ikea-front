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

        <div ref="openDataAreaBtn">
          <v-row>
            <v-col>
              <v-btn
                block
                color="#0058a3"
                min-height="50"
                class="button"
                @click="openDataArea"
              >
                Оформить заказ
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </div>

      <div id="data-area" ref="dataArea" class="data-area">
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
                required
              >
              </v-text-field>
            </v-col>

            <v-col :cols="$vuetify.breakpoint.xs ? 12 : 6">
              <span class="text-overline pl-5">Телефон:</span>
              <v-text-field
                v-model="phone"
                v-mask="'# (###) ###-####'"
                type="tel"
                pattern="[\d]*"
                novalidate
                flat
                hide-details
                rounded
                filled
                placeholder="8 701 123 4567"
                full-width
                height="50"
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
                v-model="value"
                flat
                hide-details
                rounded
                filled
                placeholder="Актау ..."
                full-width
                height="50"
                :value="value"
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
                        :without-label="true"
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

        <v-row class="pay-area pt-5">
          <v-col order-sm="2" sm>
            <v-card flat min-height="150" color="rgba(0, 0, 0, 0.06)">
              <h3>Способ оплаты:</h3>
              <v-radio-group v-model="payMethod">
                <v-radio
                  label="Оплатить онлайн с чеком на e-mail"
                  :value="1"
                ></v-radio>
                <v-radio
                  :label="`Оплатить менеджеру и получить товарный чек (Адрес: 10 мкр, 2 дом)`"
                  :value="2"
                >
                </v-radio>
              </v-radio-group>
            </v-card>
          </v-col>
          <v-col order-sm="1" sm>
            <v-card flat min-height="150" color="transparent" class="pt-0">
              <v-btn
                block
                color="#0058a3"
                min-height="50"
                class="button"
                @click="checkout"
              >
                Отправить
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <v-alert
        :value="alert.isShow"
        transition="scale-transition"
        elevation="5"
        border="left"
        :color="alert.success ? '#0058a3' : '#fb8c00'"
        colored-border
        dismissible
        class="alert"
      >
        <div v-if="alert.success">
          <h3>Заказ оформлен</h3>
          <p>В ближайшее время мы свяжется с вами</p>
        </div>
        <div v-else>
          <h3>Уппссс...</h3>
          <p>Что-то пошло не так, попробуйте отправить заказа через минуту</p>
        </div>
      </v-alert>
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
      errors: [],
      value: '',
      assemblyPercent,
      phone: '',
      name: '',
      mail: '',
      isAssembly: false,
      payMethod: 1,
      alert: {
        isShow: false,
        success: true,
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
    checkout() {
      if (this.validateProducts() && this.validateForm()) {
        this.payMethod === 1 ? this.onlinePay() : this.offlinePay()
      }
    },

    onlinePay() {
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
            address: this.getValue,
            email: this.mail,
            phone: this.phone,
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
                  checkout: true,
                  payMethod: 'online',
                  products: getLetterProducts(),
                }),
              })
            }
          },
        }
      )
    },

    offlinePay() {
      this.updateOrder({
        orderId: this.order._id,
        payload: {
          isAssembly: this.isAssembly,
          assembly: this.isAssembly ? this.getAssemblyValue : 0,
          name: this.name,
          address: this.getValue,
          email: this.mail,
          phone: this.phone,
          total: this.total,
          paid: false,
          checkout: true,
          payMethod: 'offline',
          products: this.getLetterProducts(),
        },
      }).then(() => {
        this.alert.success = !this.products.length
        this.alert.isShow = true

        setTimeout(() => {
          this.alert.isShow = false
        }, 10000)
      })
    },

    openDataArea() {
      this.$refs.openDataAreaBtn.style.display = 'none'
      this.$refs.dataArea.style.display = 'block'
      this.$vuetify.goTo(this.$refs.dataArea, {
        duration: 500,
        easing: 'easeOutQuint',
      })
    },

    initScripts(name) {
      if (name === 'ymaps' && global.ymaps) {
        return global.ymaps.ready(() => {
          // eslint-disable-next-line no-new
          const suggestView = new global.ymaps.SuggestView('address', {
            zIndex: 9000,
          })

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

    validateForm() {
      if (!this.value) {
        this.errors.push('Укажите адрес')
      }

      if (!this.phone) {
        this.errors.push('Укажите номер телефона')
      }

      if (!this.name) {
        this.errors.push('Укажите ваше имя')
      }

      if (!this.checkEmail(this.mail)) {
        this.errors.push('Укажите правильную почту')
      }

      if (this.errors.length) {
        this.errors.forEach((text) => {
          this.$notify({
            group: 'all',
            title: 'Пожалуйста исправьте указанные ошибки:',
            text,

            type: 'warn',
            duration: 10000,
          })
        })

        this.errors = []
        return false
      }

      return true
    },

    validateProducts() {
      const availableProducts = {}
      this.products.forEach((product) => {
        const availableProduct =
          this.availabilityProduct(product.identifier).StockAvailability &&
          this.availabilityProduct(product.identifier).StockAvailability
            .RetailItemAvailability.AvailableStock.$

        availableProducts[product.identifier] = !!(
          availableProduct && parseInt(availableProduct) - product.qnt >= 0
        )
      })

      let text = ''
      this.products.forEach((product) => {
        if (availableProducts[product.identifier] === false) {
          text = text ? `${text}, ${product.name}` : product.name
        }
      })

      return !(
        text &&
        // ф-ия возвращает undefined, поэтому преобразуем его
        !this.$notify({
          group: 'all',
          title: 'К сожалению этих товаров осталось слишком мало:',
          text,

          type: 'warn',
          duration: 10000,
        })
      )
    },

    checkEmail(value) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value.trim())
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

  head() {
    return {
      title: 'Корзина',
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
    }
  },
}
</script>

<style scoped lang="scss">
.cart {
  position: relative;

  .checkbox {
    margin-top: 0 !important;
  }

  > .row:last-of-type {
    border-top: thin solid rgba(0, 0, 0, 0.12);
  }

  .pay-area {
    .v-card {
      padding: 10px;
    }
  }

  .data-area {
    display: none;
  }

  .alert {
    position: absolute;
    width: 100%;
    top: 50%;
  }
}
</style>
