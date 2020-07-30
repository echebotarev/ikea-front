<template>
  <portal v-if="isFocus" to="modal">
    <div class="modal-substrate" @click="toggleModal">Hi</div>
  </portal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'SearchModal',
  computed: mapState({
    isFocus: (state) => state.search.isFocus,
  }),
  methods: mapActions({
    toggleModal: 'page/toggleModal',
  }),
}
</script>

<style scoped></style>
