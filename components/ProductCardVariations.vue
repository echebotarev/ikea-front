<template>
  <div class="product-card-variations">
    <div class="product-thumbnail-label">Больше вариантов</div>
    <v-row>
      <v-col
        v-for="productVariant in getDisplayVariations(variations)"
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
import { mapActions, mapGetters } from 'vuex'

import getImage from '@/assets/utils/getImage'

export default {
  name: 'ProductCardVariations',
  props: {
    currentId: {
      type: String,
      default: () => '',
    },
    currentType: {
      type: String,
      default: () => '',
    },
    variations: {
      type: Array,
      default: () => [],
    },
    place: {
      type: String,
      default: () => '',
    },
  },

  computed: {
    ...mapGetters({
      available: 'availability/available',
    }),
  },

  methods: {
    getImage,

    /**
     * В структуре могут повторяться одинаковые id, потому что добавляются
     * id: 123,
     * type: "Размер"
     *
     * и
     *
     * id: 123,
     * type: "Цвет"
     * */
    getDisplayVariations(variations) {
      let wasSelectedItem = false
      return variations.filter((variant) => {
        if (wasSelectedItem && variant.isSelected) {
          return false
        }

        if (wasSelectedItem === false) {
          wasSelectedItem = variant.isSelected
        }
        return true
      })
    },

    async switchProduct(id) {
      const product = await this.getProductById({ id })
      await this.fetchAvailabilityProduct({
        type: this.currentType,
        identifier: id,
      })
      const available = this.available(id, 'qnt')
      this.updateProductList({
        id: this.currentId,
        newProduct: Object.assign(product, { available }),
        place: this.place,
      })
    },

    ...mapActions({
      getProductById: 'products/getProductById',
      fetchAvailabilityProduct: 'availability/fetchAvailabilityProduct',
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
