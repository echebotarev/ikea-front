<template>
  <portal v-if="isShow" to="modal">
    <div class="modal-substrate" @click="toggleModal">
      <v-row no-gutters class="row">
        <v-col class="modal" cols="5"></v-col>
      </v-row>
    </div>
  </portal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Modal',
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

  .row {
    height: 100%;
  }

  .modal {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background: rgba(255, 255, 255, 1);
  }
}
</style>
