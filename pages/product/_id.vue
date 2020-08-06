<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />

    <v-row>
      <v-col cols="7">
        <v-row>
          <v-col
            v-for="img in product.images.fullMediaList"
            :key="img.content.url"
            cols="6"
          >
            <v-img
              :src="img.content.url"
              lazy-src="/image/placeholder.png"
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
        <v-row>
          <v-col cols="9">
            <h1>{{ product.name }}</h1>
            <p>{{ product.short_desc }}</p>
          </v-col>
          <v-col cols="3">
            <p>
              {{ product.price.price.mainPriceProps.price.integer }}
              {{ product.price.price.mainPriceProps.currencySymbol }}
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-btn
            block
            rounded
            color="#0058a3"
            dark
            @click="addProduct({ product, qnt: 1 })"
          >
            <v-icon>mdi-basket-plus-outline</v-icon>
            Добавить в корзину
          </v-btn>
        </v-row>

        <v-row>
          <v-col>
            <Available :url="product.url" :identifier="product.identifier" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="7">
        <div class="product-summary">
          <p v-if="product.full_desc">{{ product.full_desc }}</p>
          <span class="product-identifier">{{
            product.display_identifier
          }}</span>
        </div>

        <div class="product-information">
          <v-banner v-if="product.information.productDetailsProps" single-line>
            {{ product.information.productDetailsProps.title }}
            <template v-slot:actions>
              <v-btn
                icon
                @click="
                  showModal(
                    Object.assign({}, product.information.productDetailsProps, {
                      type: 'info',
                    })
                  )
                "
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </template>
          </v-banner>

          <v-banner v-if="product.information.dimensionProps" single-line>
            {{ product.information.dimensionProps.title }}
            <v-subheader>{{
              product.information.dimensionProps.subtitle
            }}</v-subheader>
            <template v-slot:actions>
              <v-btn
                icon
                @click="
                  showModal(
                    Object.assign({}, product.information.dimensionProps, {
                      type: 'info',
                    })
                  )
                "
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </template>
          </v-banner>
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
import Available from '@/components/Available'

export default {
  components: { Breadcrumbs, InfoModal, Available },
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
  }),
  methods: mapActions({
    showModal: 'page/showModal',
    addProduct: 'cart/addProduct',
  }),
}
</script>

<style scoped lang="scss"></style>
