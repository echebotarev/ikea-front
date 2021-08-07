<template>
  <client-only v-if="countCart">
    <nuxt-link to="/cart" class="count text-center">
      {{ countCart }}
    </nuxt-link>
  </client-only>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Count',
  computed: {
    ...mapGetters({
      countCart: 'orders/getCountCart',
    }),
  },
}
</script>

<style scoped>
.count {
  display: inline-block;
  padding: 3px;
  width: 30px;
  border-radius: 50%;
  background: rgb(0, 88, 163);
  color: #fff;
  text-decoration: none !important;
}
</style>
