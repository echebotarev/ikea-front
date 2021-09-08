<template>
  <div ref="cart" class="cart">
    <h1>Корзина</h1>
    <client-only>
      <div class="mb-16">
        <CartProductCard :products="products" />

        <CartTotal
          text="Сумма:"
          :total="getDiscountPrice(sum)"
          :sale="
            getDiscountValue(sum) &&
            Object.assign(
              {},
              { value: getDiscountSaleValue(sum) },
              { absoluteValue: getDiscountValue(sum) }
            )
          "
        />

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
        <CartForm></CartForm>

        <CartTotal
          text="Итого:"
          :total="getDiscountPrice(total)"
          :sale="
            getDiscountValue(sum) &&
            Object.assign(
              {},
              { value: getDiscountSaleValue(sum) },
              { absoluteValue: getDiscountValue(total) }
            )
          "
        />

        <v-row class="pay-area pt-5">
          <!--<v-col order-sm="2" sm>
            <v-card flat min-height="150" color="rgba(0, 0, 0, 0.06)">
              <h3>Способ оплаты:</h3>
              <v-radio-group v-model="payMethod">
                &lt;!&ndash;<v-radio
                  label="Оплатить онлайн с чеком на e-mail"
                  :value="1"
                ></v-radio>&ndash;&gt;
                <v-radio :label="`Оплатить на Каспий Голд`" :value="2">
                </v-radio>
              </v-radio-group>
            </v-card>
          </v-col>-->
          <v-col order-sm="1" sm>
            <v-card flat min-height="150" color="transparent" class="pt-0">
              <v-btn
                block
                color="#0058a3"
                min-height="50"
                class="button purchase"
                @click="checkout"
              >
                <template v-slot:default>
                  <span class="purchase">Отправить заявку</span>
                </template>
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
          <p>В ближайшее время мы свяжемся с вами</p>
        </div>
        <div v-else>
          <h3>Уппссс...</h3>
          <p>Что-то пошло не так, попробуйте отправить заказа через минуту</p>
        </div>
      </v-alert>
    </client-only>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import config from '@/config'
import ec from '@/utils/ec'

export default {
  name: 'Cart',
  components: {
    CartProductCard: () => import('@/components/CartProductCard'),
    CartForm: () => import('@/components/CartForm'),
    CartTotal: () => import('@/components/CartTotal'),
  },

  data() {
    return {
      timer: null,
      payMethod: 2,
      alert: {
        isShow: false,
        success: true,
      },
    }
  },

  computed: {
    ...mapState({
      shopId: (state) => state.geo.shopId,
      order: (state) => state.orders.order,
      products: (state) => state.orders.products,

      sum(state) {
        let sum = 0
        state.orders.products.forEach((product) => {
          const price =
            (product.sales
              ? product.sales.price
              : this.$getPrice(
                  product.price.price.mainPriceProps.price.integer
                )) * product.qnt
          sum += price
        })
        return sum
      },

      deliveryTime: (state) => state.page.delivery.deliveryDay,

      sale: (state) => state.orders.sale,

      address: (state) => state.cart.address,
      phone: (state) => state.cart.phone,
      name: (state) => state.cart.name,
      mail: (state) => state.cart.mail,
      isAssembly: (state) => state.cart.isAssembly,
      assemblyValue: (state) => state.cart.assemblyValue,
    }),

    ...mapGetters({
      availabilityProduct: 'availability/availabilityProduct',
      assembly: 'variables/assembly',
      assemblySum: 'orders/getAssemblySum',
      saleForVolume: 'variables/saleForVolume',
      coefficient: 'variables/coefficient',
      deliveryCost: 'variables/getDeliveryCost',
      deliveryMethod: 'cart/getDeliveryMethod',
    }),

    total() {
      return this.assemblyValue + this.sum
    },
  },

  mounted() {
    this.fetchSale(this.$route.query)

    this.initScripts('ymaps')
    this.getDeliveryData()

    this.$gtag.ec({
      ecommerce: {
        currencyCode: 'RUB',
        checkout: {
          actionField: { step: 1 },
          products: ec.getProductsForCheckout({
            products: this.products,
            $getPrice: this.$getPrice,
            coefficient: this.coefficient,
          }),
        },
      },
      event: 'gtm-ee-event',
      'gtm-ee-event-category': 'Enhanced Ecommerce',
      'gtm-ee-event-action': 'Переход в корзину. Step 1',
      'gtm-ee-event-non-interaction': false,
    })

    // без этого ф-ия receiveMessage падает на JSON.parse
    // туда приходят данные от detector.js в виде объекта
    /* Выключили лишний запрос пока у нас нет оплаты картами с сайта */
    // this.timer = setTimeout(() => {
    //   this.initScripts('cp')
    // }, 5000)
  },

  beforeDestroy() {
    clearTimeout(this.timer)
    this.$store.commit('orders/SET_DATA', { key: 'sale', value: null })
  },

  methods: {
    async checkout() {
      const isValidForm = await this.validateForm()
      if (this.validateProducts() && isValidForm) {
        this.$gtag.ec({
          ecommerce: {
            currencyCode: 'RUB',
            checkout: {
              actionField: { step: 4 },
              products: ec.getProductsForCheckout({
                products: this.products,
                $getPrice: this.$getPrice,
                coefficient: this.coefficient,
              }),
            },
          },
          event: 'gtm-ee-event',
          'gtm-ee-event-category': 'Enhanced Ecommerce',
          'gtm-ee-event-action': 'Подтверждение заказа. Step 4',
          'gtm-ee-event-non-interaction': false,
        })

        this.payMethod === 1 ? this.onlinePay() : this.offlinePay()
      }
    },

    onlinePay() {
      const updateOrder = this.updateOrder.bind(this)
      const getLetterProducts = this.getLetterProducts.bind(this)
      const closeDataArea = this.closeDataArea.bind(this)
      const deliveryTime = this.deliveryTime
      const $router = this.$router

      this.widget.pay(
        'auth',
        {
          publicId: config.cloudPaymentsPublicKey, // id из личного кабинета
          description: 'Оплата товаров в doma-doma.org', // назначение
          amount: this.getDiscountPrice(this.total), // сумма
          currency: 'KZT', // валюта
          invoiceId: this.order._id, // номер заказа  (необязательно)
          accountId: this.mail, // идентификатор плательщика (необязательно)
          skin: 'classic', // дизайн виджета (необязательно)
          data: {
            isAssembly: this.isAssembly,
            assembly: this.isAssembly ? this.assemblyValue : 0,
            name: this.name,
            address: this.address,
            email: this.mail,
            phone: this.phone,
            total: this.getDiscountPrice(this.total),
            deliveryCost:
              this.shopId === '003' && this.deliveryMethod === 2
                ? this.deliveryCost
                : 0,
            sale: { value: this.getDiscountSaleValue(this.total) },
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

              closeDataArea()

              updateOrder({
                orderId: invoiceId,
                payload: Object.assign(options.data, {
                  paid: true,
                  checkout: true,
                  payMethod: 'online',
                  products: getLetterProducts(),
                  deliveryTime,
                }),
              })

              $router.push('/info/order-is-sent')
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
          assembly: this.isAssembly ? this.assemblyValue : 0,
          name: this.name,
          address: this.address,
          email: this.mail,
          phone: this.phone,
          total: this.getDiscountPrice(this.total),
          deliveryCost:
            this.shopId === '003' && this.deliveryMethod === 2
              ? this.deliveryCost
              : 0,
          paid: false,
          checkout: true,
          payMethod: 'offline',
          products: this.getLetterProducts(),
          deliveryTime: this.deliveryTime,
          sale: { value: this.getDiscountSaleValue(this.total) },
        },
      }).then(() => {
        this.closeDataArea()
        this.$router.push('/info/order-is-sent')
      })
    },

    openDataArea() {
      this.$refs.openDataAreaBtn.style.display = 'none'
      this.$refs.dataArea.style.display = 'block'
      this.$vuetify.goTo(this.$refs.dataArea, {
        duration: 500,
        easing: 'easeOutQuint',
      })

      this.$gtag.ec({
        ecommerce: {
          currencyCode: 'RUB',
          checkout: {
            actionField: { step: 2 },
            products: ec.getProductsForCheckout({
              products: this.products,
              $getPrice: this.$getPrice,
              coefficient: this.coefficient,
            }),
          },
        },
        event: 'gtm-ee-event',
        'gtm-ee-event-category': 'Enhanced Ecommerce',
        'gtm-ee-event-action': 'Переход к заполнению данных. Step 2',
        'gtm-ee-event-non-interaction': false,
      })
    },

    closeDataArea() {
      this.clearFormData()
      this.$refs.openDataAreaBtn.style.display = 'block'
      this.$refs.dataArea.style.display = 'none'
      this.$vuetify.goTo(this.$refs.cart, {
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
            this.setValue({ key: 'address', value: e.get('item').displayName })
          })
        })
      } else if (name === 'cp' && global.cp) {
        // eslint-disable-next-line no-undef
        return (this.widget = new cp.CloudPayments())
      }

      return setTimeout(this.initScripts.bind(this, name), 100)
    },

    validateProducts(notify = true) {
      const availableProducts = {}
      this.products.forEach((product) => {
        const availableProduct =
          this.availabilityProduct(product.identifier).StockAvailability &&
          this.availabilityProduct(product.identifier).StockAvailability
            .RetailItemAvailability.AvailableStock['@']

        availableProducts[product.identifier] =
          !!product.sales ||
          !!(availableProduct && parseInt(availableProduct) - product.qnt >= 0)
      })

      let text = ''
      this.products.forEach((product) => {
        if (availableProducts[product.identifier] === false) {
          text = text ? `${text}, ${product.name}` : product.name
        }
      })

      if (text && notify) {
        this.$notify({
          group: 'all',
          title: 'К сожалению этих товаров осталось слишком мало:',
          text,

          type: 'warn',
          duration: 10000,
        })

        return false
      }

      return !text
    },

    getLetterProducts() {
      return this.products.map((product) => {
        return Object.assign({}, product, {
          computedPrice: product.sales
            ? product.sales.price
            : this.$getPrice(product.price.price.mainPriceProps.price.integer),
          computedPriceTotal:
            (product.sales
              ? product.sales.price
              : this.$getPrice(
                  product.price.price.mainPriceProps.price.integer
                )) * product.qnt,
          url: `${document.location.origin}/product/${product.identifier}`,
        })
      })
    },

    getSaleValueForVolume(price) {
      if (this.saleForVolume) {
        const { sale } =
          this.saleForVolume.find(
            (item) => price > item.down && (item.up === null || price < item.up)
          ) || {}

        return sale || 0
      }

      return 0
    },

    // стоимость со скидкой
    getDiscountPrice(price) {
      const saleForVolume = this.getSaleValueForVolume(price)
      const sale = saleForVolume + (this.sale ? this.sale.value : 0)

      const total = sale ? Math.ceil(price - (price * sale) / 100) : price

      return this.shopId === '003' && this.deliveryMethod === 2
        ? total + this.deliveryCost
        : total
    },

    // процентное значение скидки
    getDiscountSaleValue(price) {
      const saleForVolume = this.getSaleValueForVolume(price)
      const sale = this.sale ? this.sale.value : 0

      return saleForVolume + sale
    },

    // абсолютное значение скидки в валюте
    getDiscountValue(price) {
      const sale = this.getDiscountSaleValue(price)
      return sale ? Math.floor(price - (price * (100 - sale)) / 100) : 0
    },

    ...mapActions({
      updateOrder: 'orders/updateOrder',
      fetchSale: 'orders/fetchSale',
      getDeliveryData: 'page/getDeliveryData',
      clearFormData: 'cart/clearData',
      validateForm: 'cart/validateForm',
      setValue: 'cart/setValue',
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
      meta: [
        {
          name: 'robots',
          content: 'noindex',
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
.cart {
  position: relative;

  .purchase {
    width: 100%;
  }

  .checkbox {
    margin-top: 0 !important;
  }

  > .row:last-of-type {
    border-top: thin solid rgba(0, 0, 0, 0.12);
  }

  //.pay-area {
  //  .v-card {
  //    padding: 10px;
  //  }
  //}

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
