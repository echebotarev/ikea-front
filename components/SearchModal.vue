<template>
  <portal v-if="isShow && data.type === 'search'" to="modal">
    <div class="modal-substrate" @click="hideModal">
      <v-row class="modal" no-gutters @click.stop="">
        <v-text-field></v-text-field>
      </v-row>
    </div>
  </portal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'SearchModal',
  computed: mapState({
    isShow: (state) => state.page.modal.isShow,
    data: (state) => state.page.modal.data,
  }),
  methods: mapActions({
    hideModal: 'page/hideModal',
  }),
}
</script>

<style scoped lang="scss">
.modal {
  min-height: 500px;
  background: #fff;
}
</style>
