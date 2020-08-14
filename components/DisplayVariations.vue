<template>
  <v-row>
    <v-col
      v-for="productVariant in product.display_variations.options"
      :key="productVariant.linkId"
      cols="3"
    >
      <nuxt-link :to="`/product/${productVariant.linkId}`">
        <v-img
          :src="getImage(productVariant.image.url, 2)"
          lazy-src="/images/placeholder.png"
          :class="`selectable ${productVariant.isSelected ? 'selected' : ''}`"
        ></v-img>
      </nuxt-link>
    </v-col>
  </v-row>
</template>

<script>
import getImage from '@/assets/utils/getImage'

export default {
  name: 'DisplayVariations',
  props: {
    product: {
      type: Object,
      default: () => {},
    },
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
