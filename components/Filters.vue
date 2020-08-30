<template>
  <div id="scroll-target">
    <v-row>
      <v-col :cols="$vuetify.breakpoint.xs ? 12 : 10">
        <v-tabs grow hide-slider :show-arrows="!$vuetify.breakpoint.xs">
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
              @click="
                () => {
                  setOpenPanels([index + 1])
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
              {{ filter.name }}
            </v-btn>
          </v-tab>
        </v-tabs>
      </v-col>

      <v-col class="text-right product-count">
        <span>{{ productCount }} товаров(-а)</span>
      </v-col>
    </v-row>

    <v-divider class="mt-3"></v-divider>
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

    productCount: (state) => state.products.productCount,
  }),
  methods: {
    ...mapActions({
      showModal: 'page/showModal',
      setOpenPanels: 'filters/setOpenPanels',
    }),

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
