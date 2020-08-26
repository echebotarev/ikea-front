<template>
  <div>
    <v-row>
      <v-col>
        <v-btn
          v-if="sortOrders.name"
          rounded
          elevation="0"
          class="text-capitalize btn-filters"
          >Сортировать</v-btn
        >
      </v-col>
      <v-col class="text-right product-count" align-self="middle">
        <span>{{ productCount }} товаров(-а)</span>
      </v-col>
    </v-row>

    <v-divider class="mt-3"></v-divider>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Filters',
  computed: mapState({
    filters: (state) => state.filters.filters,
    sortOrders: (state) => state.filters.sortOrders,

    productCount: (state) => state.products.productCount,
  }),
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
}
</style>
