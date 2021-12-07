<template>
  <v-row no-gutters>
    <v-col>
      <div class="product-summary mt-6 mb-10">
        <p v-if="product.summary_description">
          {{ product.summary_description }}
        </p>
        <span class="product-identifier-label">Артикул:</span><br />
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
                <v-icon>{{ mdiChevronRight }}</v-icon>
              </v-btn>
            </template>
          </v-banner>
        </a>

        <!-- Техническая информация -->
        <a
          v-if="product.information.technicalInformationProps"
          @click="
            showModal(
              Object.assign({}, product.information.technicalInformationProps, {
                type: 'info',
              })
            )
          "
        >
          <v-banner single-line>
            {{ product.information.technicalInformationProps.title }}
            <template v-slot:actions>
              <v-btn icon>
                <v-icon>{{ mdiChevronRight }}</v-icon>
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
                <v-icon>{{ mdiChevronRight }}</v-icon>
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
import { mdiChevronRight } from '@mdi/js'

export default {
  name: 'ProductInformationButtons',
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return { mdiChevronRight }
  },
  methods: {
    ...mapActions({
      showModal: 'page/showModal',
    }),
  },
}
</script>

<style scoped lang="scss">
.product-summary {
  p {
    color: rgb(72, 72, 72);
    font-size: 1.25rem;
    line-height: 1.71429;
    padding-bottom: 1.25rem;
  }

  .product-identifier-label {
    font-size: 0.875rem;
  }
}
</style>
