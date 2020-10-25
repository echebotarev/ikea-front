<template>
  <div>
    <h2>Photos:</h2>

    <v-row>
      <v-col
        v-for="(img, index) in fullMediaList"
        :key="img.content.url"
        cols="3"
      >
        <a
          :download="`${product.identifier}_${index + 1}`"
          :href="getImage(img.content.url, 5)"
        >
          <v-img
            :src="getImage(img.content.url, 5)"
            lazy-src="/images/placeholder.png"
            :alt="img.content.alt"
            aspect-ratio="1"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-icon x-large>mdi-image-multiple-outline</v-icon>
              </v-row>
            </template>
          </v-img>
        </a>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import getImage from 'assets/utils/getImage'

export default {
  name: 'Photos',

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

  computed: {
    ...mapState({
      product: (state) => state.products.product,
      fullMediaList: (state) =>
        state.products.product.images.fullMediaList.filter(
          (img) => img.type === 'image'
        ),
    }),
  },

  methods: {
    getImage,
  },
}
</script>

<style scoped></style>
