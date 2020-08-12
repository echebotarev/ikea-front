<template>
  <v-row>
    <v-col class="product-variations">
      <v-banner
        v-for="variation in product.variations.variations"
        :key="variation.code"
        single-line
      >
        {{ variation.title }}
        <v-subheader>{{ variation.selectedOption }}</v-subheader>
        <template v-slot:actions>
          <v-btn
            icon
            @click="
              showModal(
                Object.assign({}, variation, {
                  type: 'info',
                  currentVariation: currentVariation(
                    product.identifier,
                    variation.options
                  ),
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
