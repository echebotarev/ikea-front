<template>
  <div v-if="productCount" id="scroll-target">
    <v-row align="center">
      <v-col :cols="$vuetify.breakpoint.xs ? 12 : 10">
        <v-tabs hide-slider :show-arrows="!$vuetify.breakpoint.xs">
          <v-tab>
            <v-btn
              v-if="sortOrders"
              rounded
              elevation="0"
              class="text-capitalize btn-filters"
              @click="
                () => {
                  setOpenPanels([0])
                  showModal(
                    Object.assign(
                      {},
                      { sortOrders: sortOrders },
                      { type: 'info' }
                    )
                  )
                }
              "
            >
              Сортировать
            </v-btn>
          </v-tab>

          <v-tab
            v-for="(filter, index) in getFiltersData(filters)"
            :key="filter.id"
          >
            <v-btn
              rounded
              elevation="0"
              :class="`text-capitalize btn-filters${
                filter.selected ? ' selected' : ''
              }`"
              :disabled="!filter.enabled"
              @click="setFilter({ filter, index })"
            >
              {{ filter.name }}
            </v-btn>
          </v-tab>
        </v-tabs>
      </v-col>

      <v-col class="text-right product-count">
        <span>{{ productCount }} товаров(-а)</span>
      </v-col>
    </v-row>

    <v-divider class="my-3"></v-divider>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import getFiltersData from 'assets/utils/getFiltersData'

export default {
  name: 'Filters',
  computed: mapState({
    filters: (state) => state.filters.filters,
    sortOrders: (state) => state.filters.sortOrders,

    productCount: (state) => parseInt(state.products.productCount),
  }),
  methods: {
    ...mapActions({
      showModal: 'page/showModal',
      setOpenPanels: 'filters/setOpenPanels',
    }),

    setFilter({ filter, index }) {
      if (filter.type === 'BOOLEAN') {
        // eslint-disable-next-line no-useless-call
        return this.$toggleFilters.call(this, filter.parameter, 'true')
      }

      this.setOpenPanels([index + 1])
      this.showModal(
        Object.assign({}, { sortOrders: this.sortOrders }, { type: 'info' })
      )
    },

    getFiltersData,
  },
}
</script>

<style scoped lang="scss">
.product-count {
  color: #929292;
  font-size: 0.75rem;
  font-weight: 500;
}
.btn-filters {
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.87) !important;

  &.selected {
    background: rgb(29, 29, 29) !important;
    color: #fff !important;
  }
}
</style>
