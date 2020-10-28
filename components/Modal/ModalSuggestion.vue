<template>
  <div class="modal-product-suggestion">
    <v-row no-gutters>
      <v-spacer></v-spacer>
      <v-col cols="10">
        <h2>{{ data.title }}</h2>

        <div class="suggestion-content">
          <div
            v-for="(product, index) in data.suggestion"
            :key="product.identifier"
          >
            <v-row no-gutters class="pt-5 pb-5">
              <v-col cols="10">
                <nuxt-link :to="`/product/${product.identifier}`">
                  <v-row no-gutters>
                    <v-col cols="4">
                      <v-img
                        :src="getImage(imgPreview(product).content.url, 2)"
                      ></v-img>
                    </v-col>

                    <v-col cols="8">
                      <h4>{{ product.name }}</h4>
                      <div class="product-description mb-5">
                        {{ product.price.productDescription }}
                      </div>
                      <Price
                        :price="
                          product.price.price.mainPriceProps.price.integer
                        "
                      />
                    </v-col>
                  </v-row>
                </nuxt-link>
              </v-col>

              <v-col cols="2">
                <v-btn
                  elevation="0"
                  fab
                  color="#0058a3"
                  width="40"
                  height="40"
                  class="float-right"
                  @click="add({ product, qnt: 1 })"
                >
                  <v-icon color="#fff">
                    mdi-basket-plus-outline
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-divider v-if="index !== data.suggestion.length - 1"></v-divider>
          </div>
        </div>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <v-row class="suggestion-button">
      <v-spacer></v-spacer>
      <v-col cols="10">
        <v-btn
          to="/cart"
          block
          rounded
          color="#0058a3"
          min-height="50"
          class="button mt-5 mb-5"
        >
          Перейти в корзину
          <v-badge
            :content="countCart"
            :value="countCart"
            color="transparent"
            inline
            large
          ></v-badge>
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Price from '@/components/Price'
import getImage from '@/assets/utils/getImage'

export default {
  name: 'ModalSuggestion',
  components: { Price },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters({
      countCart: 'orders/getCountCart',
    }),
  },
  methods: {
    ...mapActions({
      addProduct: 'orders/addProduct',
    }),
    getImage,
    imgPreview(product) {
      return product.images.fullMediaList[0]
    },
    add(payload) {
      this.addProduct(payload)
    },
  },
}
</script>

<style scoped lang="scss">
.product-description {
  font-size: 0.875rem;
  color: #484848;
}
.modal-product-suggestion {
  height: calc(100% - 60px - 114px);
  overflow: scroll;
}
.suggestion-button {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
