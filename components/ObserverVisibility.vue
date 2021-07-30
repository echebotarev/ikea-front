<template>
  <div
    v-observe-visibility="{
      callback: visibilityChanged,
      once: true,
      throttle: 300,
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ec from '@/utils/ec'

export default {
  name: 'ObserverVisibility',

  props: {
    listType: {
      type: String,
      default: () => 'Category',
    },
    product: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    ...mapGetters({
      coefficient: 'variables/coefficient',
    }),
  },

  methods: {
    visibilityChanged(isVisible) {
      isVisible &&
        this.$gtag.ec({
          ecommerce: {
            currencyCode: 'RUB',
            impressions: ec.getProductsViewed({
              products: [this.product],
              $getPrice: this.$getPrice,
              coefficient: this.coefficient,
              list: this.listType,
            }),
          },
        })
    },
  },
}
</script>

<style scoped></style>
