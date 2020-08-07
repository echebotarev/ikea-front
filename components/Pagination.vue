<template>
  <div v-if="count && count > QTY_PRODUCTS" class="pagination text-center">
    <v-pagination
      v-model="page"
      :length="Math.ceil(count / QTY_PRODUCTS)"
      :total-visible="7"
      circle
      @input="input"
    ></v-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Pagination',
  props: {
    count: {
      type: Number,
      default: () => 0,
    },
    // eslint-disable-next-line vue/prop-name-casing
    QTY_PRODUCTS: {
      type: Number,
      default: () => 24,
    },
  },
  computed: mapState({
    page: (state) => 1,
  }),
  methods: {
    input(page) {
      console.log(page)
    },
  },
}
</script>

<style scoped></style>
