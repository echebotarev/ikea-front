<template>
  <div v-if="count && count > PER_PAGE" class="pagination text-center mt-5">
    <v-pagination
      v-model="currentPage"
      :length="Math.ceil(count / PER_PAGE)"
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
    categoryId: {
      type: String,
      default: () => '',
    },
    // eslint-disable-next-line vue/prop-name-casing
    PER_PAGE: {
      type: Number,
      default: () => 24,
    },
  },
  data() {
    return {
      currentPage: parseInt(this.$route.query.page || 1),
    }
  },
  computed: mapState({
    count: (state) => state.products.productCount,
  }),
  methods: {
    async input(page) {
      await this.$router.push({ query: { page } })
      await this.$store.dispatch('products/fetchProductsByCategoryId', {
        id: this.categoryId,
        page,
      })
    },
  },
}
</script>

<style scoped></style>
