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
import { mapGetters, mapState } from 'vuex'
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
    ...mapState({
      shopId: (state) => state.geo.shopId,
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
              shopId: this.shopId,
              coefficient: this.coefficient,
              list: this.listType,
            }),
          },
          event: 'gtm-ee-event',
          'gtm-ee-event-category': 'Enhanced Ecommerce',
          'gtm-ee-event-action': 'Product Impressions',
          'gtm-ee-event-non-interaction': true,
        })
    },
  },
}
</script>

<style scoped></style>
