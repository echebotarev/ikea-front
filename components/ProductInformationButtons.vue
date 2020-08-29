<template>
  <v-row no-gutters>
    <v-col>
      <div class="product-summary mb-10">
        <p v-if="product.summary_description">
          {{ product.summary_description }}
        </p>
        <span class="product-identifier">{{ product.display_identifier }}</span>
      </div>

      <div class="product-information">
        <a
          v-if="product.information.productDetailsProps"
          @click="
            showModal(
              Object.assign({}, product.information.productDetailsProps, {
                type: 'info',
              })
            )
          "
        >
          <v-banner single-line>
            {{ product.information.productDetailsProps.title }}
            <template v-slot:actions>
              <v-btn icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </template>
          </v-banner>
        </a>

        <a
          v-if="product.information.dimensionProps"
          @click="
            showModal(
              Object.assign({}, product.information.dimensionProps, {
                type: 'info',
              })
            )
          "
        >
          <v-banner single-line>
            {{ product.information.dimensionProps.title }}
            <v-subheader v-if="product.information.dimensionProps.subtitle">{{
              product.information.dimensionProps.subtitle
            }}</v-subheader>
            <template v-slot:actions>
              <v-btn icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </template>
          </v-banner>
        </a>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ProductInformationButtons',
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
  },
}
</script>

<style scoped></style>
