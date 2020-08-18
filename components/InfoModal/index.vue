<template>
  <portal v-if="isShow && data.type === 'info'" to="modal">
    <div class="modal-substrate" @click="hideModal">
      <v-row align="center">
        <v-col
          class="modal"
          :cols="$vuetify.breakpoint.xs ? 12 : 6"
          @click.stop=""
        >
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="2">
              <v-btn icon @click="hideModal">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <Details
            v-if="data.eventLabel === 'pip_details'"
            :data="data"
            :is-open-details="isOpenDetails"
          />

          <Dimensions
            v-if="data.eventLabel === 'pip_dimensions'"
            :data="data"
          />

          <Variations v-if="data.options" :data="data" />
        </v-col>
      </v-row>
    </div>
  </portal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Details from '@/components/InfoModal/Details'
import Dimensions from '@/components/InfoModal/Dimensions'
import Variations from '@/components/InfoModal/Variations'
export default {
  name: 'InfoModal',
  components: { Details, Dimensions, Variations },
  computed: mapState({
    isShow: (state) => state.page.modal.isShow,
    isOpenDetails: (state) => state.page.modal.isOpenDetails,
    data: (state) => state.page.modal.data,
  }),
  beforeDestroy() {
    this.hideModal()
    this.toggleDetails(false)
  },
  methods: mapActions({
    hideModal: 'page/hideModal',
    toggleDetails: 'page/toggleDetails',
  }),
}
</script>

<style scoped lang="scss">
.modal {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  overflow: auto;
}
</style>
