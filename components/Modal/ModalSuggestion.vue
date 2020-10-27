<template>
  <v-row class="modal-product-suggestion">
    <v-spacer></v-spacer>
    <v-col cols="10">
      <h2>{{ data.title }}</h2>

      <div
        v-for="(product, index) in data.suggestion"
        :key="product.identifier"
      >
        <v-row>
          <v-col cols="3">
            <v-img :src="getImage(imgPreview(product).content.url, 2)"></v-img>
          </v-col>

          <v-col cols="7">
            <h4>{{ product.name }}</h4>
            <div class="product-description mb-5">
              {{ product.price.productDescription }}
            </div>
            <Price :price="product.price.price.mainPriceProps.price.integer" />
          </v-col>

          <v-col cols="2">
            <v-btn
              elevation="0"
              fab
              color="#0058a3"
              width="40"
              height="40"
              :loading="isLoading"
              @click="add({ product, qnt: 1 })"
            >
              <v-icon color="#fff">mdi-basket-plus-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider v-if="index !== data.suggestion.length - 1"></v-divider>
      </div>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
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
  data: () => ({
    isLoading: false,
  }),
  methods: {
    ...mapActions({
      addProduct: 'orders/addProduct',
    }),
    getImage,
    imgPreview(product) {
      return product.images.fullMediaList[0]
    },
    add(payload) {
      console.log('This', this)
      this.isLoading = true
      this.addProduct(payload).then(() => {
        this.isLoading = false
      })
    },
  },
}
</script>

<style scoped lang="scss">
.product-description {
  font-size: 0.875rem;
  color: #484848;
}
</style>
