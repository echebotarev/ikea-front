<template>
  <portal v-if="modalShow" to="modal" class="modal-substrate">Hey</portal>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Modal',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: mapState({
    modalShow: (state) => state.page.modalShow,
  }),
}
</script>

<style scoped lang="scss">
.modal-substrate {
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
