<template>
  <v-spacer>
    <v-text-field
      flat
      hide-details
      rounded
      filled
      prepend-inner-icon="mdi-magnify"
      full-width
      @focus="showModal({ type: 'search' })"
    ></v-text-field>
    <SearchModal />
  </v-spacer>
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
