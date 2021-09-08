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
    targetId: {
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
      // скроллинг до начала страницы
      // try {
      //   await this.$vuetify.goTo(`#${this.targetId}`, {
      //     duration: 200,
      //     easing: 'easeOutQuint',
      //   })
      // } catch (e) {
      //   this.$sentry.captureMessage(`Pagination - GoTo: ${this.$route}`)
      // }

      await this.$router.push({ query: { ...this.$route.query, page } })
    },
  },
}
</script>

<style scoped></style>
