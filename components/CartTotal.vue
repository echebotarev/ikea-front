<template>
  <div class="mb-10 cart-total">
    <v-row v-if="sale" class="cart-sale mb-3">
      <v-col class="font-weight-bold">Скидка</v-col>
      <v-col class="text-right font-weight-bold">{{ sale.value }}%</v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="font-weight-bold">{{ text }}</v-col>
      <v-col class="text-right">
        <Price :price="value" :is-only-formatted="true" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Price from '@/components/Price'

export default {
  name: 'CartTotal',
  components: { Price },
  props: {
    value: {
      type: Number,
      default: () => 0,
    },
    text: {
      type: String,
      default: () => '',
    },
    sale: {
      type: Object,
      default: () => null,
    },
  },
}
</script>

<style scoped lang="scss">
.cart-total {
  border: 1px solid #dfdfdf;
  padding: 1.875rem 1.25rem;

  .cart-sale {
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
  }
}
</style>
