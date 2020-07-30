<template>
  <v-text-field
    flat
    hide-details
    :rounded="!isFocus"
    filled
    prepend-inner-icon="mdi-magnify"
    full-width
    :class="isFocus ? 'position-absolute' : ''"
    @focus="setFocusValue(true)"
    @blur="setFocusValue(false)"
  ></v-text-field>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Search',
  computed: mapState({
    isFocus: (state) => state.search.isFocus,
  }),
  methods: mapActions({
    setFocusValue: 'search/setFocusValue',
  }),
}
</script>

<style scoped>
.position-absolute {
  position: absolute;
  width: 100%;
  background: #fff;
  left: 0;
  z-index: 1;
}
</style>
