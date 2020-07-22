<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />

    <v-row>
      <v-col cols="8">
        <v-row>
          <v-col
            v-for="img in product.images.fullMediaList"
            :key="img.content.url"
            cols="6"
          >
            <v-img :src="img.content.url" :alt="img.content.alt"></v-img>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4"></v-col>
    </v-row>
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
