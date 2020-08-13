<template>
  <v-row>
    <v-col
      v-for="productVariant in productVariations"
      :key="productVariant.identifier"
      cols="3"
    >
      <nuxt-link :to="`/product/${productVariant.identifier}`">
        <v-img
          :src="getImage(productVariant.images.fullMediaList[0].content.url, 2)"
          :class="`selectable ${
            productVariant.identifier === product.identifier ? 'selected' : ''
          }`"
        ></v-img>
      </nuxt-link>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

import getImage from '@/assets/utils/getImage'

export default {
  name: 'DisplayVariations',
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  computed: mapState({
    productVariations: (state) => state.products.productVariations,
  }),
  async mounted() {
    await this.$store.dispatch(
      'products/fetchProductVariations',
      this.product.display_variations
    )
  },
  methods: {
    getImage,
  },
}
</script>

<style scoped lang="scss">
.selectable {
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  transition: border-color 0.2s ease-in-out;

  &:hover {
    border-color: #929292;
  }

  &.selected {
    border-color: #111;
    border-width: 2px;

    &:hover {
      border-color: #929292;
    }
  }
}
</style>
