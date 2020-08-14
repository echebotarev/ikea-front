<template>
  <v-row>
    <v-col class="product-variations">
      <a
        v-for="variation in product.variations.variations"
        :key="variation.code"
        @click="
          showModal(
            Object.assign({}, variation, {
              type: 'info',
              currentVariation: currentVariation(variation.options),
            })
          )
        "
      >
        <v-banner single-line>
          {{ variation.title }}
          <v-subheader>{{ variation.selectedOption }}</v-subheader>
          <template v-slot:actions>
            <v-btn icon>
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </template>
        </v-banner>
      </a>
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
    currentVariation(options) {
      return options.find((option) => option.isSelected)
    },
  },
}
</script>

<style scoped></style>
