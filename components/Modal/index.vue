<template>
  <portal v-if="isShow" to="modal">
    <div class="modal-substrate" @click="toggleModal">
      <v-row no-gutters align="center">
        <v-col class="modal" cols="5" @click.stop="">
          <Details v-if="data.eventLabel === 'pip_details'" :data="data" />
        </v-col>
      </v-row>
    </div>
  </portal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Details from '~/components/Modal/Details'
export default {
  name: 'Modal',
  components: { Details },
  computed: mapState({
    isShow: (state) => state.page.modal.isShow,
    data: (state) => state.page.modal.data,
    accordion: (state) => {
      const acc = state.page.modal.data.accordionObject
      const out = []
      for (const key in acc) {
        const item = acc[key]
        if (item) {
          out.push(item)
        }
      }
      return out
    },
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

  .modal {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background: rgba(255, 255, 255, 1);
  }
}
</style>
