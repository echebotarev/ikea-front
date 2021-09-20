<template>
  <div class="product-card-variations">
    <div class="product-thumbnail-label">Больше вариантов</div>
    <v-row>
      <v-col
        v-for="productVariant in variations.options"
        :key="productVariant.linkId"
        :cols="$vuetify.breakpoint.mobile ? 4 : 3"
        @click="switchProduct(productVariant.linkId)"
      >
        <v-img
          :src="getImage(productVariant.image.url, 2)"
          lazy-src="/images/placeholder.png"
          :class="`selectable ${productVariant.isSelected ? 'selected' : ''}`"
          aspect-ratio="1"
        ></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import getImage from '@/assets/utils/getImage'

export default {
  name: 'ProductCardVariations',
  props: {
    currentId: {
      type: String,
      default: () => '',
    },
    variations: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    getImage,

    async switchProduct(id) {
      const product = await this.getProductById({ id })
      this.updateProductList({ id: this.currentId, newProduct: product })
    },

    ...mapActions({
      getProductById: 'products/getProductById',
      updateProductList: 'products/updateProductList',
    }),
  },
}
</script>

<style scoped lang="scss">
.product-card-variations {
  .product-thumbnail-label {
    font-size: 0.75rem;
  }

  .selectable {
    cursor: pointer;

    &.selected,
    &:hover {
      border: 1px solid #959595;
    }
  }
}
</style>
