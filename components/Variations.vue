<template>
  <v-row v-if="product.variations">
    <v-col class="product-variations">
      <v-banner
        v-for="(variation, indexVariation) in product.variations.variations"
        :key="indexVariation"
        single-line
      >
        {{ variation.title }}
        <v-subheader>{{
          currentVariation(product.identifier, variation.options).title
        }}</v-subheader>
        <template v-slot:actions>
          <v-btn
            icon
            @click="
              showModal(
                Object.assign({}, product.variations, {
                  type: 'info',
                })
              )
            "
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </template>
      </v-banner>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Variations',
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    ...mapActions({
      showModal: 'page/showModal',
    }),
    currentVariation(id, options) {
      return options.find((option) => option.linkId === id)
    },
  },
}
</script>

<style scoped></style>
