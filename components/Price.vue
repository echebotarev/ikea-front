<template>
  <div class="product-price">
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
  },
}
</script>

<style scoped></style>
