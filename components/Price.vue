<template>
  <span :class="`product-price ${className}`">
    <span
      v-if="!withoutLabel"
      class="product-price-label"
      v-html="getText()"
    ></span>
    <span v-if="prepend">{{ prepend }}</span>
    <span class="price-wrap">
      <span class="price">{{
        $getDisplayPrice(price, { isOnlyFormatted })
      }}</span>
      <span class="symbol">{{ symbol }}</span>
      <span v-if="unit" class="unit">{{ unit }}</span>
    </span>
  </span>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Price',
  props: {
    price: {
      type: [Number, String],
      default: () => 0,
    },
    unit: {
      type: String,
      default: () => '',
    },
    isOnlyFormatted: {
      type: Boolean,
      default: () => false,
    },
    prepend: {
      type: String,
      default: () => '',
    },
    className: {
      type: String,
      default: () => '',
    },
    withoutLabel: {
      type: Boolean,
      default: () => false,
    },
    text: {
      type: String,
      default: () => null,
    },
  },

  computed: {
    ...mapGetters({
      symbol: 'variables/symbol',
    }),
    ...mapState({
      shopId: (state) => state.geo.shopId,
    }),
  },

  methods: {
    getText() {
      if (this.text || this.text === '') {
        return this.text
      }

      switch (this.shopId) {
        case '003':
          return 'Доставим до склада<br />в Уральске'

        case '004':
          return 'Доставим до склада<br />в Атырау'

        default:
          return 'Цена с учетом<br />доставки:'
      }
    },
  },
}
</script>

<style scoped lang="scss">
.product-price {
  display: inline-block;
  font-size: 22px;
  font-weight: 600;

  .unit {
    font-size: 0.6875rem;
  }

  .product-price-label {
    font-size: 0.7rem;
    display: block;
    color: #111;
  }

  .price-wrap {
    white-space: nowrap;
  }

  .symbol {
    position: relative;
    top: 4px;
    line-height: 0.9;
    font-size: 0.6875rem;
    vertical-align: text-top;
  }

  &.light {
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
