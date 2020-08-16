<template>
  <div v-if="$getPrice(price)" :class="`product-price ${className}`">
    <span v-if="prepend">{{ prepend }}</span>
    <span class="price">{{
      $getDisplayPrice(price, { isOnlyFormatted })
    }}</span>
    <span class="symbol">{{ symbol }}</span>
  </div>
</template>

<script>
import { currencySymbol } from '@/constants'

export default {
  name: 'Price',
  props: {
    price: {
      type: [Number, String],
      default: () => 0,
    },
    isOnlyFormatted: {
      type: Boolean,
      default: () => false,
    },
    symbol: {
      type: String,
      default: () => currencySymbol,
    },
    prepend: {
      type: String,
      default: () => '',
    },
    className: {
      type: String,
      default: () => '',
    },
  },
}
</script>

<style scoped lang="scss">
.product-price {
  display: inline-block;
  font-size: 22px;
  font-weight: 600;

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
