<template>
  <v-form>
    <v-row>
      <v-col cols="12">
        <span class="text-overline pl-5">Имя:</span>
        <v-text-field
          flat
          hide-details
          rounded
          filled
          placeholder="ФИО"
          full-width
          height="50"
          required
          :value="name"
          @change="(v) => setValue({ key: 'name', value: v })"
          @blur="checkThirdStep"
        >
        </v-text-field>
      </v-col>

      <v-col :cols="$vuetify.breakpoint.xs ? 12 : 6">
        <span class="text-overline pl-5">Телефон:</span>
        <v-text-field
          v-model="scopePhone"
          v-mask="'# (###) ###-####'"
          type="tel"
          pattern="[\d]*"
          novalidate
          flat
          hide-details
          rounded
          filled
          :placeholder="getPlaceholder('phone')"
          full-width
          height="50"
          required
          @blur="checkThirdStep"
        >
        </v-text-field>
      </v-col>

      <v-col :cols="$vuetify.breakpoint.xs ? 12 : 6">
        <span class="text-overline pl-5">Адрес почты:</span>
        <v-text-field
          flat
          hide-details
          rounded
          filled
          placeholder="mail@example.com"
          full-width
          height="50"
          required
          :value="mail"
          @change="(v) => setValue({ key: 'mail', value: v.trim() })"
          @blur="checkThirdStep"
        >
        </v-text-field>
      </v-col>
    </v-row>

    <v-row class="mb-10 pt-4">
      <v-col v-if="shopId === '003' || shopId === '004'" cols="12" class="pb-0">
        <span class="text-overline pl-5">Выберите способ доставки:</span>
        <v-radio-group
          class="ml-4 mt-0"
          :value="deliveryMethod"
          @change="
            (v) => {
              v === 1
                ? setValue({ key: 'address', value: pickupPoint })
                : setValue({ key: 'address', value: '' })
              setValue({ key: 'deliveryMethod', value: v })
            }
          "
        >
          <v-radio :label="`Самовывоз: ${pickupPoint}`" :value="1"></v-radio>
          <v-radio
            :label="`Доставка прямо до квартиры: ${$getDisplayPrice(
              deliveryCost,
              {
                isOnlyFormatted: true,
              }
            )} ${symbol}`"
            :value="2"
          ></v-radio>
        </v-radio-group>
      </v-col>

      <v-col
        cols="12"
        class="pt-0"
        :class="deliveryMethod === 1 ? 'opacity-05' : ''"
      >
        <span class="text-overline pl-5">Укажите полный адрес доставки:</span>
        <v-text-field
          id="address"
          flat
          hide-details
          rounded
          filled
          :placeholder="getPlaceholder('city')"
          full-width
          height="50"
          :disabled="pickupPoint && deliveryMethod === 1"
          :prepend-inner-icon="mdiMapMarker"
          :value="address"
          @change="(v) => setValue({ key: 'address', value: v })"
          @blur="checkThirdStep"
        >
        </v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="assemblySum($getPrice)" no-gutters class="mb-10">
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
                  :prepend-icon="mdiTools"
                  label="Заказать сборку"
                  class="checkbox"
                  @change="
                    (v) => {
                      // checkbox
                      setValue({ key: 'isAssembly', value: v })

                      // стоимость сборки
                      v
                        ? setValue({
                            key: 'assemblyValue',
                            value: getAssemblyValue(),
                          })
                        : setValue({ key: 'assemblyValue', value: 0 })
                    }
                  "
                ></v-checkbox>

                <span
                  style="display: block; margin-top: -20px"
                  class="text-caption pl-9"
                  >Стоимость сборки - {{ assembly.percent }}%</span
                >
                <span v-if="assembly.lowPrice" class="text-caption pl-9">
                  Но не менее
                  <Price
                    :price="assembly.lowPrice"
                    :without-label="true"
                    :is-only-formatted="true"
                    class-name="f-size-4"
                  />
                </span>
              </v-col>

              <v-col class="text-right">
                <Price
                  :price="assemblyValue"
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
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import { mdiMapMarker, mdiTools } from '@mdi/js'
import ec from '@/utils/ec'

let phoneTimer = null
export default {
  name: 'CartForm',

  components: {
    Price: () => import('@/components/Price'),
  },

  data() {
    return {
      mdiMapMarker,
      mdiTools,
    }
  },

  computed: {
    // этот финт ушами необходим, чтобы работала v-mask
    scopePhone: {
      get() {
        return this.phone
      },
      set(v) {
        if (phoneTimer) {
          return false
        }

        phoneTimer = setTimeout(() => {
          v !== this.phone && this.setValue({ key: 'phone', value: v })
          phoneTimer = null
        }, 50)
      },
    },

    ...mapState({
      errors: (state) => state.cart.errors,
      address: (state) => state.cart.address,
      phone: (state) => state.cart.phone,
      name: (state) => state.cart.name,
      mail: (state) => state.cart.mail,
      isAssembly: (state) => state.cart.isAssembly,
      assemblyValue: (state) => state.cart.assemblyValue,

      shopId: (state) => state.geo.shopId,

      products: (state) => state.orders.products,
    }),

    ...mapGetters({
      coefficient: 'variables/coefficient',
      assemblySum: 'orders/getAssemblySum',
      assembly: 'variables/assembly',
      deliveryMethod: 'cart/getDeliveryMethod',
      pickupPoint: 'variables/getPickupPoint',
      deliveryCost: 'variables/getDeliveryCost',
      symbol: 'variables/symbol',
    }),
  },

  mounted() {
    // если страницу открыли в первый раз, то адрес пуст
    this.deliveryMethod === 1 &&
      this.setValue({ key: 'address', value: this.pickupPoint })
  },

  methods: {
    async checkThirdStep() {
      const isValidForm = await this.validateForm(false)
      isValidForm &&
        this.$gtag.ec({
          ecommerce: {
            currencyCode: 'RUB',
            checkout: {
              actionField: { step: 3 },
              products: ec.getProductsForCheckout({
                products: this.products,
                $getPrice: this.$getPrice,
                coefficient: this.coefficient,
              }),
            },
          },
          event: 'gtm-ee-event',
          'gtm-ee-event-category': 'Enhanced Ecommerce',
          'gtm-ee-event-action': 'Форма заполнена. Step 3',
          'gtm-ee-event-non-interaction': false,
        })
    },

    getPlaceholder(type) {
      const placeholders = {
        phone: {
          '001': '8 701 123 4567',
          '002': '8 999 123 4567',
          '003': '8 701 123 4567',
          '004': '8 701 123 4567',
        },
        city: {
          '001': 'Актау...',
          '002': 'Саранск...',
          '003': 'Уральск...',
          '004': 'Атырау...',
        },
      }

      return placeholders[type][this.shopId]
    },

    getAssemblyValue() {
      if (this.isAssembly) {
        const value = Math.ceil(
          (this.assemblySum(this.$getPrice) * this.assembly.percent) / 100
        )
        return value < this.assembly.lowPrice ? this.assembly.lowPrice : value
      }

      return 0
    },

    ...mapActions({
      setValue: 'cart/setValue',
      validateForm: 'cart/validateForm',
    }),
  },
}
</script>

<style scoped></style>
