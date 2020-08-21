<template>
  <div>
    <v-text-field
      flat
      hide-details
      rounded
      filled
      placeholder="Что вы ищете?"
      prepend-inner-icon="mdi-magnify"
      full-width
      :height="$vuetify.breakpoint.smAndUp ? '50' : ''"
      @focus="showModal({ type: 'search' })"
    ></v-text-field>
    <SearchModal />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SearchModal from '@/components/SearchModal'
export default {
  name: 'Search',
  components: { SearchModal },
  computed: mapState({
    isFocus: (state) => state.search.isFocus,
  }),
  methods: mapActions({
    showModal: 'page/showModal',
  }),
}
</script>

<style scoped></style>
