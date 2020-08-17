<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />

    <v-row>
      <v-col cols="7">
        <v-row>
          <v-col
            v-for="img in fullMediaList"
            :key="img.content.url"
            :cols="product.images.fullMediaList.length === 1 ? 12 : 6"
          >
            <v-img
              :src="getImage(img.content.url, 4)"
              lazy-src="/images/placeholder.png"
              :alt="img.content.alt"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-icon x-large>mdi-image-multiple-outline</v-icon>
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="5">
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

        <v-row>
          <v-col cols="8">
            <h2 class="product-name">{{ product.name }}</h2>
            <p class="product-description">
              {{ product.price.productDescription }},
              {{ product.price.measurementText }}
              <br />
              <span v-if="product.price.price.previousPriceProps">
                {{ product.price.price.previousPriceText }}
                <Price
                  :price="product.price.price.previousPriceProps.price.integer"
                />
                <br />
                {{ product.price.validToFromAndWhileSupplyLastText }}
              </span>
            </p>

            <p v-if="product.price.isLastChance" class="text-weight-500">
              Выходит из ассортимента
            </p>
          </v-col>
          <v-col cols="4" class="text-right">
            <Price
              :price="product.price.price.mainPriceProps.price.integer"
              :class="
                product.price.price.mainPriceProps.hasHighlight
                  ? 'highlight'
                  : ''
              "
            />
          </v-col>
        </v-row>

        <v-row
          v-if="product.sold_separately"
          class="sold-separately"
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

        <DisplayVariations
          v-if="product.display_variations"
          :product="product"
        />

        <Variations v-if="product.variations" :product="product" />

        <v-row class="mt-5">
          <v-btn
            block
            rounded
            color="#0058a3"
            min-height="50"
            dark
            @click="addProduct({ product, qnt: 1 })"
          >
            <v-icon class="mr-2">mdi-basket-plus-outline</v-icon>
            Добавить в корзину
          </v-btn>
        </v-row>

        <v-row>
          <v-col>
            <Available
              :type="product.utag.product_type"
              :identifier="product.identifier"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="7">
        <div class="product-summary mb-10">
          <p v-if="product.full_desc">{{ product.full_desc }}</p>
          <span class="product-identifier">{{
            product.display_identifier
          }}</span>
        </div>

        <div class="product-information">
          <a
            v-if="product.information.productDetailsProps"
            @click="
              showModal(
                Object.assign({}, product.information.productDetailsProps, {
                  type: 'info',
                })
              )
            "
          >
            <v-banner single-line>
              {{ product.information.productDetailsProps.title }}
              <template v-slot:actions>
                <v-btn icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </template>
            </v-banner>
          </a>

          <a
            v-if="product.information.dimensionProps"
            @click="
              showModal(
                Object.assign({}, product.information.dimensionProps, {
                  type: 'info',
                })
              )
            "
          >
            <v-banner single-line>
              {{ product.information.dimensionProps.title }}
              <v-subheader v-if="product.information.dimensionProps.subtitle">{{
                product.information.dimensionProps.subtitle
              }}</v-subheader>
              <template v-slot:actions>
                <v-btn icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </template>
            </v-banner>
          </a>
        </div>
      </v-col>
    </v-row>

    <InfoModal />
  </div>
</template>

<script>
/*
TODO: рекомендации
# Другие пользователи смотрели
# https://rec.ingka.com/services/ru-prod/items/popular/?n=12&productName=PAX
*/
// TODO парсить fulldesc в скрапере
import { mapState, mapActions } from 'vuex'
import Breadcrumbs from '@/components/Breadcrumbs'
import InfoModal from '@/components/InfoModal/index'
import Variations from '@/components/Variations'
import DisplayVariations from '@/components/DisplayVariations'
import Available from '@/components/Available'
import Price from '@/components/Price'

import getImage from '@/assets/utils/getImage'

export default {
  components: {
    Breadcrumbs,
    InfoModal,
    Available,
    Variations,
    DisplayVariations,
    Price,
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('products/fetchProductById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable API server',
      })
    }
  },
  computed: mapState({
    product: (state) => state.products.product,
    breadcrumbs: (state) => state.page.breadcrumbs,
    products: (state) => state.cart.products,
    // TODO: убрать, когда реализую отображение видео
    fullMediaList: (state) =>
      state.products.product.images.fullMediaList.filter(
        (img) => img.type === 'image'
      ),
  }),
  methods: {
    ...mapActions({
      showModal: 'page/showModal',
      addProduct: 'cart/addProduct',
    }),
    getImage,
  },
}
</script>

<style scoped lang="scss">
.product.name {
  font-size: 22px;
  font-weight: 500;
}
.product-description {
  font-size: 14px;

  .product-price {
    font-size: inherit;
    font-weight: normal;
  }
}
.product-new,
.family-text {
  padding-top: 12px;
}
.family-text {
  color: #0077c1;
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
