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
          currentOption(product.identifier, variation.options).title
        }}</v-subheader>
        <template v-slot:actions>
          <v-btn icon @click="showModal()">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </template>
      </v-banner>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Variations',
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    currentOption(id, options) {
      return options.find((option) => option.linkId === id)
    },
  },
}
</script>

<style scoped></style>
