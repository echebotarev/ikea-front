<template>
  <v-btn
    elevation="0"
    fab
    color="#0058a3"
    width="40"
    height="40"
    class="float-right add-to-cart"
    :loading="isLoading"
    @click.stop.prevent="add({ product, qnt: 1 })"
  >
    <v-icon color="#fff" class="add-to-cart-icon">
      {{ mdiBasketPlusOutline }}
    </v-icon>
    <template v-slot:loader>
      <span class="custom-loader">
        <v-icon light color="#fff">{{ mdiLoading }}</v-icon>
      </span>
    </template>
  </v-btn>
</template>

<script>
import { mdiBasketPlusOutline, mdiLoading } from '@mdi/js'

export default {
  name: 'CircleBtn',
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
    addProduct: {
      type: Function,
      default: () => () => {},
    },
  },
  data() {
    return {
      isLoading: false,
      mdiBasketPlusOutline,
      mdiLoading,
    }
  },
  methods: {
    async add(payload) {
      this.isLoading = true
      await this.addProduct(payload)
      this.isLoading = false
    },
  },
}
</script>

<style scoped lang="scss">
.add-to-cart-icon {
  width: 100%;
}
</style>
