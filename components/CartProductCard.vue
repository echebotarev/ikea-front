<template>
  <div class="products-list">
    <div :class="`loader${isLoading ? ' d-block' : ''}`">
      <v-icon x-large color="#212121" class="custom-loader">
        {{ mdiLoading }}
      </v-icon>
    </div>
    <v-row
      v-for="product in products"
      :key="product.identifier"
      :ref="product.identifier"
      class="py-6"
    >
      <v-col>
        <v-row>
          <v-col cols="3">
            <v-img
              :src="
                getImage(
                  product.images && product.images.fullMediaList[0].content.url,
                  3
                )
              "
              lazy-src="/images/placeholder.png"
              aspect-ratio="1"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-icon x-large>{{ mdiImageMultipleOutline }}</v-icon>
                </v-row>
              </template>
            </v-img>
          </v-col>
          <v-col cols="4" class="cart-description">
            <v-row
              v-if="product.price.newProductText"
              class="product-new"
              no-gutters
            >
              <v-col>{{ product.price.newProductText }}</v-col>
            </v-row>

            <v-row
              v-if="product.price.familyText"
              class="family-text"
              no-gutters
            >
              <v-col>{{ product.price.familyText }}</v-col>
            </v-row>

            <nuxt-link :to="`/product/${product.identifier}`">
              <h4>{{ product.name }}</h4>
            </nuxt-link>
            <div>{{ product.price.productDescription }}</div>
            <div v-if="product.price.measurementText">
              {{ product.price.measurementText }}
            </div>
            <div>{{ product.display_identifier }}</div>
          </v-col>
          <v-col class="cart-price text-right" cols="5">
            <div class="main-price">
              <!-- Цена со скидкой -->
              <div v-if="product.sales">
                <Price
                  :price="product.sales.price * product.qnt"
                  :without-label="true"
                  :is-only-formatted="true"
                  symbol=".–"
                  :class-name="'highlight'"
                />

                <Price
                  v-if="product.qnt > 1"
                  :price="product.sales.price"
                  :is-only-formatted="true"
                  :without-label="true"
                  symbol=".–"
                  :class-name="`light ${
                    product.price.price.mainPriceProps.hasHighlight
                      ? 'highlight'
                      : ''
                  }`"
                />
              </div>
              <!-- Цена со скидкой -->

              <!-- Основная цена -->
              <div v-else>
                <Price
                  :price="product.kaspiPrices[shopId] * product.qnt"
                  :without-label="true"
                  :is-only-formatted="true"
                  symbol=".–"
                  :class-name="
                    product.price.price.mainPriceProps.hasHighlight &&
                    product.qnt === 1
                      ? 'highlight'
                      : ''
                  "
                />

                <Price
                  v-if="product.qnt > 1"
                  :price="product.kaspiPrices[shopId]"
                  :without-label="true"
                  :is-only-formatted="true"
                  symbol=".–"
                  :class-name="`light ${
                    product.price.price.mainPriceProps.hasHighlight
                      ? 'highlight'
                      : ''
                  }`"
                />
              </div>
              <!-- Основная цена -->

              <!--<div
                v-if="product.price.familyText && !product.sales"
                class="previous-price"
              >
                <Price
                  :price="$getPrice(product.kaspiPrices[shopId]) * product.qnt"
                  :without-label="true"
                  :is-only-formatted="true"
                  :prepend="`${product.price.price.previousPriceText}:`"
                  symbol=".–"
                  class-name="light"
                />

                <Price
                  v-if="product.qnt > 1"
                  :price="product.price.price.previousPriceProps.price.integer"
                  :without-label="true"
                  symbol=".–"
                  class-name="light"
                />
              </div>-->
            </div>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="3"></v-col>
          <v-col cols="4">
            <Available
              v-if="!product.sales"
              :type="product.utag.product_type"
              :identifier="product.identifier"
              :with-qnt="true"
            />
          </v-col>
          <v-col class="text-right text-nowrap" cols="5">
            <v-btn icon @click="remove({ product, qnt: product.qnt })">
              <v-icon>{{ mdiTrashCanOutline }}</v-icon>
            </v-btn>
            <v-btn icon @click="remove({ product, qnt: 1 })">
              <v-icon>{{ mdiMinus }}</v-icon>
            </v-btn>
            <span class="amount">{{ product.qnt }}</span>
            <v-btn icon @click="add({ product, qnt: 1 })">
              <v-icon>{{ mdiPlus }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import {
  mdiLoading,
  mdiImageMultipleOutline,
  mdiTrashCanOutline,
  mdiMinus,
  mdiPlus,
} from '@mdi/js'

import getImage from 'assets/utils/getImage'

export default {
  name: 'CartProductCard',
  components: {
    Price: () => import('@/components/Price'),
    Available: () => import('@/components/Available'),
  },
  props: {
    products: {
      type: Array,
      default: () => [],
    },

    checkSendBtn: {
      type: Function,
      default: () => () => {},
    },
  },
  data() {
    return {
      isLoading: false,
      mdiLoading,
      mdiImageMultipleOutline,
      mdiTrashCanOutline,
      mdiMinus,
      mdiPlus,
    }
  },
  computed: {
    ...mapState({
      shopId: (state) => state.geo.shopId,
    }),
  },
  methods: {
    ...mapActions({
      addProduct: 'orders/addProduct',
      removeProduct: 'orders/removeProduct',
    }),
    getImage,
    toggleBlur(id) {
      const elem = this.$refs[id][0]
      elem && elem.classList.toggle('product__blur')
    },
    async add(payload) {
      this.toggleBlur(payload.product.identifier)
      this.isLoading = true
      await this.addProduct(payload)
      this.isLoading = false
      this.toggleBlur(payload.product.identifier)

      this.checkSendBtn()
    },
    async remove(payload) {
      this.toggleBlur(payload.product.identifier)
      this.isLoading = true
      await this.removeProduct(payload)
      this.isLoading = false
      this.toggleBlur(payload.product.identifier)

      this.checkSendBtn()
    },
  },
}
</script>

<style scoped lang="scss">
.loader {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: none;

  .custom-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -20px 0 0 -20px;
  }
}
.product__blur {
  filter: blur(2px);
}
.products-list {
  > .row {
    border-bottom: thin solid rgba(0, 0, 0, 0.12);

    &:last-of-type {
      border-bottom: none;
      margin-bottom: 20px;
    }
  }

  .product-price {
    display: block;
  }

  .family-text {
    display: inline-block;
    background-color: #0077c8;
    font-weight: 700;
    color: #fff;
    padding: 0 0.5em;
  }

  .highlight {
    display: inline-block;
    background: #ffce00;
    padding: 0.15rem 0.3rem;
    box-shadow: 4px 4px 0 0 #ef4123;
    margin: 0 0.375rem 0.375rem 0;
  }
}
</style>
