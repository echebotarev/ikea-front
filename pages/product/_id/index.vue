<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />

    <v-row>
      <v-col :cols="$vuetify.breakpoint.xs ? 12 : 8">
        <v-row>
          <v-col
            v-for="img in fullMediaList"
            :key="img.content.url"
            :cols="fullMediaList.length === 1 ? 12 : 6"
          >
            <v-img
              v-if="img.type === 'image'"
              :src="
                getImage(img.content.url, $vuetify.breakpoint.mobile ? 3 : 5)
              "
              lazy-src="/images/placeholder.png"
              :alt="img.content.alt"
              aspect-ratio="1"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-icon x-large>{{ mdiImageMultipleOutline }}</v-icon>
                </v-row>
              </template>
            </v-img>
            <VideoPlayer
              v-else-if="img.type === 'video'"
              :src="img.content.url"
              :poster="img.content.poster.url"
            />
          </v-col>
        </v-row>

        <client-only v-if="!$vuetify.breakpoint.xs">
          <ProductInformationButtons :product="product" />

          <ProductRecommendation />
        </client-only>
      </v-col>

      <v-col
        :cols="$vuetify.breakpoint.xs ? 12 : 4"
        :class="$vuetify.breakpoint.xs ? '' : 'product-main'"
      >
        <v-row
          v-if="product.price.newProductText"
          class="product-new"
          no-gutters
        >
          <v-col>{{ product.price.newProductText }}</v-col>
        </v-row>

        <v-row v-if="product.price.familyText" class="family-text" no-gutters>
          <v-col>{{ product.price.familyText }}</v-col>
        </v-row>

        <v-row justify="space-between" no-gutters class="flex-nowrap">
          <v-col class="mr-1">
            <h1>
              <div class="product-name">{{ product.name }}</div>
              <div class="product-description">
                {{ product.price.productDescription }},
                {{ product.price.measurementText }}
                <br />
                <br />
                <span v-if="isSales" class="font-weight-bold">
                  Предыдущая цена
                  <Price
                    :price="product.kaspiPrices[shopId]"
                    :without-label="true"
                    :is-only-formatted="true"
                    class-name="font-weight-bold"
                  />
                </span>
                <!--<span v-else-if="product.price.price.previousPriceProps">
                  {{ product.price.price.previousPriceText }}
                  <Price
                    :price="
                      product.price.price.previousPriceProps.price.integer
                    "
                    :without-label="true"
                  />
                  <br />
                  {{ product.price.validToFromAndWhileSupplyLastText }}
                </span>-->
              </div>
            </h1>

            <p v-if="product.price.isLastChance" class="text-weight-500">
              Выходит из ассортимента
            </p>
          </v-col>
          <v-col class="text-right" cols="auto">
            <Price
              :price="
                isSales ? product.sales.price : product.kaspiPrices[shopId]
              "
              :is-only-formatted="true"
              :unit="product.price.price.mainPriceProps.unit"
              :class="
                product.price.price.mainPriceProps.hasHighlight
                  ? 'highlight'
                  : isSales
                  ? 'highlight'
                  : ''
              "
            />
          </v-col>
        </v-row>

        <v-row
          v-if="product.sold_separately"
          class="sold-separately my-3"
          no-gutters
        >
          <v-col cols="1">
            <svg
              focusable="false"
              viewBox="0 0 24 24"
              class="sold-separately__icon"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM11.2468 7.20281C11.4577 7.06223 11.7081 6.99194 11.9981 6.99194C12.2968 6.99194 12.5516 7.06223 12.7624 7.20281C12.9645 7.3346 13.0656 7.585 13.0656 7.95401C13.0656 8.31424 12.9645 8.56464 12.7624 8.70521C12.5516 8.84579 12.2968 8.91608 11.9981 8.91608C11.7081 8.91608 11.4577 8.84579 11.2468 8.70521C11.036 8.56464 10.9306 8.31424 10.9306 7.95401C10.9306 7.585 11.036 7.3346 11.2468 7.20281ZM11.0228 17.008V9.81225H12.9865V17.008H11.0228Z"
              ></path>
            </svg>
          </v-col>
          <v-col>{{ product.sold_separately }}</v-col>
        </v-row>

        <div v-if="product.display_variations">
          <DisplayVariations
            v-for="(variationStyle, i) in product.display_variations
              .variationStyles"
            :key="i"
            :variation-style="variationStyle"
          />
        </div>

        <Variations v-if="product.variations" :product="product" />

        <v-row no-gutters class="mt-5">
          <v-col cols="12" @click="setInsideAvailable()">
            <v-btn
              block
              rounded
              color="#0058a3"
              min-height="50"
              class="button add-to-cart"
              :loading="isLoading"
              :disabled="isDisabledOrderBtn"
              @click="add({ product, qnt: 1 })"
            >
              <template v-slot:default>
                <span class="add-to-cart">
                  <v-icon
                    v-if="!isDisabledOrderBtn"
                    class="mr-2 add-to-cart-icon"
                  >
                    {{ mdiBasketPlusOutline }}
                  </v-icon>
                  {{
                    isDisabledOrderBtn
                      ? 'Товар закончился'
                      : 'Добавить в корзину'
                  }}
                </span>
              </template>
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon light color="#fff">{{ mdiLoading }}</v-icon>
                </span>
              </template>
            </v-btn>
          </v-col>

          <v-col
            v-if="shopId !== '002' && !isDisabledOrderBtn"
            cols="12"
            class="pt-4"
          >
            <div
              class="ks-widget"
              data-template="flatButton"
              :data-merchant-sku="product.identifier"
              :data-merchant-code="capitalize(kaspiMerchantIds[shopId])"
              :data-city="kaspiCityIds[shopId]"
              data-style="mobile"
            ></div>
          </v-col>
        </v-row>

        <InlineMessage
          v-if="product.inline_message"
          :message="product.inline_message"
        />

        <v-row class="mt-2">
          <v-col class="pb-0" cols="12">
            <Available
              v-if="!isSales"
              :type="product.utag.product_type"
              :identifier="product.identifier"
            />
          </v-col>

          <v-col v-if="!isDisabledOrderBtn" cols="12">
            <v-card>
              <v-card-text>
                <v-row no-gutters>
                  <v-col class="pr-2" cols="auto">
                    <v-icon color="#0a8a00">{{ mdiInformationOutline }}</v-icon>
                  </v-col>
                  <v-col>
                    Закажите до {{ delivery.lastOrderDay }} и мы привезем товар
                    {{ delivery.deliveryDay }}
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col v-else>
            <ArrivalMail
              :id="product.identifier"
              :type="product.utag.product_type"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <client-only v-if="$vuetify.breakpoint.xs">
      <ProductInformationButtons :product="product" />

      <ProductRecommendation />
    </client-only>

    <client-only>
      <ProductRecommendation type="similar" />

      <ProductRecommendation type="style" />

      <ProductRecommendation
        type="series"
        :product-name="product.price.productName"
      />
    </client-only>

    <Modal />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

import capitalize from '@/utils/capitalize'

import { hydrateWhenVisible } from 'vue-lazy-hydration'
import ec from '@/utils/ec'

import {
  mdiImageMultipleOutline,
  mdiBasketPlusOutline,
  mdiLoading,
  mdiInformationOutline,
} from '@mdi/js'

import getImage from '@/assets/utils/getImage'

export default {
  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    Modal: hydrateWhenVisible(() => import('@/components/Modal/index')),
    Available: () => import('@/components/Available'),
    ArrivalMail: hydrateWhenVisible(() => import('@/components/ArrivalMail')),
    Variations: () => import('@/components/Variations'),
    DisplayVariations: hydrateWhenVisible(() =>
      import('@/components/DisplayVariations')
    ),
    InlineMessage: () => import('@/components/InlineMessage'),
    Price: () => import('@/components/Price'),
    ProductInformationButtons: hydrateWhenVisible(() =>
      import('@/components/ProductInformationButtons')
    ),
    ProductRecommendation: hydrateWhenVisible(() =>
      import('@/components/ProductRecommendation')
    ),
  },

  async fetch({ store, error, route: { params, query } }) {
    try {
      const result = await store.dispatch('products/fetchProductById', {
        id: params.id,
        isSales: !!query.sales,
      })

      if (result === false) {
        return error({
          statusCode: 404,
          message: 'Упс, такой страницы не существует',
        })
      }
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable API server',
      })
    }
  },

  data() {
    return {
      isLoading: false,
      mdiImageMultipleOutline,
      mdiBasketPlusOutline,
      mdiLoading,
      mdiInformationOutline,
    }
  },

  computed: {
    ...mapState({
      shopId: (state) => state.geo.shopId,
      kaspiCityIds: (state) => state.geo.kaspiCityIds,
      kaspiMerchantIds: (state) => state.geo.kaspiMerchantIds,
      product: (state) => state.products.product,
      isSales: (state) => !!state.products.product.sales,
      breadcrumbs: (state) => state.page.breadcrumbs,
      fullMediaList: (state) =>
        state.products.product.images
          ? state.products.product.images.fullMediaList
          : [],
      suggestionProducts: (state) => state.suggestion.suggestionProducts,

      delivery: (state) => state.page.delivery,

      isInsideAvailable: (state) => state.inside.isAvailable,
    }),

    ...mapGetters({
      available: 'availability/available',
      coefficient: 'variables/coefficient',
    }),

    isDisabledOrderBtn() {
      if (this.isSales || this.isInsideAvailable) {
        return false
      }

      return !this.available(this.product.identifier, 'qnt')
    },
  },

  mounted() {
    // Этот товар можно дополнить
    this.fetchSuggestionProducts(this.product.identifier)
    this.getDeliveryData()

    this.initKaspiCredit()
  },

  beforeRouteEnter(to, from, next) {
    const actionField = from.name
      ? from.name === 'Search'
        ? { list: 'Search', option: from.query.q }
        : from.name === 'Sales'
        ? { list: 'Sales' }
        : { list: 'Category' }
      : { list: null }

    next((vm) =>
      vm.$gtag.ec({
        ecommerce: {
          currencyCode: 'RUB',
          detail: {
            actionField,
            products: ec.getProductsViewed({
              products: [vm.product],
              shopId: vm.shopId,
              coefficient: vm.coefficient,
              list: null,
            }),
          },
        },
        event: 'gtm-ee-event',
        'gtm-ee-event-category': 'Enhanced Ecommerce',
        'gtm-ee-event-action': 'Product Details',
        'gtm-ee-event-non-interaction': true,
      })
    )
  },

  beforeRouteUpdate(to, from, next) {
    this.$gtag.ec({
      ecommerce: {
        currencyCode: 'RUB',
        detail: {
          actionField: { list: 'Recommendation from product' },
          products: ec.getProductsViewed({
            products: [this.product],
            shopId: this.shopId,
            coefficient: this.coefficient,
            list: null,
          }),
        },
      },
      event: 'gtm-ee-event',
      'gtm-ee-event-category': 'Enhanced Ecommerce',
      'gtm-ee-event-action': 'Product Details',
      'gtm-ee-event-non-interaction': true,
    })
    next()
  },

  beforeDestroy() {
    this.cleanSuggestionProducts()
  },

  methods: {
    ...mapActions({
      addProduct: 'orders/addProduct',
      fetchSuggestionProducts: 'suggestion/fetchSuggestionProducts',
      cleanSuggestionProducts: 'suggestion/cleanSuggestionProducts',
      showModal: 'page/showModal',
      getDeliveryData: 'page/getDeliveryData',

      setInsideAvailable: 'inside/setAvailable',
    }),

    capitalize,
    getImage,

    async add(payload) {
      this.isLoading = true
      await this.addProduct(payload)
      this.isLoading = false

      this.suggestionProducts.length &&
        this.showModal(
          Object.assign(
            {},
            {
              title: `Дополните ваш ${this.product.name} этими товарами`,
              suggestion: this.suggestionProducts,
            },
            { type: 'info' }
          )
        )
    },

    initKaspiCredit() {
      setTimeout(() => {
        let script = document.getElementById('KS-Widget')
        if (script) {
          global.ksWidgetInitializer.reinit()
        } else {
          script = document.createElement('script')
          script.src = 'https://kaspi.kz/kaspibutton/widget/ks-wi_ext.js'
          script.id = 'KS-Widget'
          script.defer = true
          script.type = 'text/javascript'

          document.head.appendChild(script)
        }
      }, 500)
    },

    getMetaProduct() {
      const title = `${this.product.price.productName}, ${this.product.display_identifier}, ${this.product.price.productDescription}`
      const description = `${this.product.price.productName}, ${this.product.display_identifier}, ${this.product.price.productDescription}, ${this.product.price.measurementText}. ${this.product.information.productDetailsProps.productDescriptionProps.paragraphs[0]}`
      const image = this.fullMediaList[0] && this.fullMediaList[0].content.url
      const keywords = `${this.product.price.productName}, ${this.product.price.productDescription}`

      return [
        {
          hid: 'og:title',
          name: 'og:title',
          content: title,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: description,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'product',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: image || '',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: keywords,
        },
      ]
    },
  },

  head() {
    return {
      title: `${this.product.price.productName}, ${this.product.display_identifier}, ${this.product.price.productDescription}`,
      meta: this.getMetaProduct(),
    }
  },
}
</script>

<style scoped lang="scss">
.add-to-cart {
  width: 100%;
}
.product-name {
  font-size: 22px;
  line-height: 1.2;
}
.product-main {
  position: -webkit-sticky;
  position: sticky;
  height: 100%;
  top: 0;
}

.product-description {
  font-size: 14px;
  font-weight: 400;

  .product-price {
    font-size: inherit;
    font-weight: normal;
  }
}
.product-new,
.family-text {
  padding-top: 12px;
}
.highlight {
  background-color: #ffdb00;
  box-shadow: 0.125rem 0.125rem #e00751;
  padding: 0 0.3125rem;
}

.sold-separately {
  font-size: 12px;
  color: #484848;

  .col-1 {
    padding: 0.1625rem;
  }

  svg.sold-separately__icon {
    fill: #484848;
    width: 1rem;
    height: 1rem;
  }
}
</style>
