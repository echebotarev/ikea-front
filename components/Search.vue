<template>
  <div class="search">
    <v-text-field
      flat
      hide-details
      rounded
      filled
      placeholder="Что вы ищете?"
      :prepend-inner-icon="mdiMagnify"
      full-width
      :height="$vuetify.breakpoint.smAndUp ? '50' : ''"
      @focus="showModal({ type: 'search' })"
    ></v-text-field>
    <SearchModal />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import { mdiMagnify } from '@mdi/js'

export default {
  name: 'Search',
  components: { SearchModal: () => import('@/components/SearchModal') },
  data() {
    return {
      mdiMagnify,
    }
  },
  computed: mapState({
    isFocus: (state) => state.search.isFocus,
  }),
  methods: mapActions({
    showModal: 'page/showModal',
  }),
}
</script>

<style scoped lang="scss">
.search {
  width: 40%;
}
.sm-and-down .search {
  width: 100%;
}
</style>
