<template>
  <v-spacer>
    <v-text-field
      flat
      hide-details
      rounded
      filled
      prepend-inner-icon="mdi-magnify"
      full-width
      @focus="setFocusValue(true)"
      @blur="setFocusValue(false)"
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
    setFocusValue: 'search/setFocusValue',
  }),
}
</script>

<style scoped></style>
