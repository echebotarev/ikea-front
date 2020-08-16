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
        <v-row>
          <v-col cols="8">
            <h2 class="product-name">{{ product.name }}</h2>
            <p class="product-description">
              {{ product.price.productDescription }},
              {{ product.price.measurementText }}
            </p>
          </v-col>
          <v-col cols="4" class="text-right">
            <Price :price="product.price.price.mainPriceProps.price.integer" />
          </v-col>
        </v-row>

        <DisplayVariations
          v-if="product.display_variations"
          :product="product"
        />

        <Variations v-if="product.variations" :product="product" />

        <v-row>
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
}
.product-new {
  padding-top: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ca5008;
}
</style>
