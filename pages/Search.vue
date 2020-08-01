<template>
  <h1>"{{ this.$route.query.q }}"</h1>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Search',
  async fetch({ store, error, query }) {
    try {
      await store.dispatch('products/fetchProductsByWord', query.q)
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable API server',
      })
    }
  },
  computed: mapState({
    products: (state) => state.products.products,
  }),
}
</script>

<style scoped></style>
