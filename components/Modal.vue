<template>
  <portal v-if="isShow" to="modal">
    <div class="modal-substrate" @click="toggleModal">Hey</div>
  </portal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Modal',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: mapState({
    isShow: (state) => state.page.modal.isShow,
    data: (state) => state.page.modal.data,
  }),
  methods: mapActions({
    toggleModal: 'page/toggleModal',
  }),
}
</script>

<style scoped lang="scss">
.modal-substrate {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.15);
}
</style>
