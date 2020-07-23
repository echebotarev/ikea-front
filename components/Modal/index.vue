<template>
  <portal v-if="isShow" to="modal">
    <div class="modal-substrate" @click="toggleModal">
      <v-row align="center">
        <v-col class="modal" cols="5" @click.stop="">
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="2">
              <v-btn icon @click="toggleModal">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <Details v-if="data.eventLabel === 'pip_details'" :data="data" />
          <Dimensions
            v-if="data.eventLabel === 'pip_dimensions'"
            :data="data"
          />
        </v-col>
      </v-row>
    </div>
  </portal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Details from '~/components/Modal/Details'
import Dimensions from '~/components/Modal/Dimensions'
export default {
  name: 'Modal',
  components: { Details, Dimensions },
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

  .modal {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background: rgba(255, 255, 255, 1);
  }
}
</style>
