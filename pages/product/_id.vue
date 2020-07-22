<template>
  <div>
    <h1>Hi</h1>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Breadcrumbs from '@/components/Breadcrumbs'

export default {
  components: { Breadcrumbs },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('products/fetchProductById', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable API server',
      })
    }
  },
  computed: mapState({
    product: (state) => state.products.product,
    breadcrumbs: (state) => state.page.breadcrumbs,
  }),
}
</script>

<style scoped></style>
