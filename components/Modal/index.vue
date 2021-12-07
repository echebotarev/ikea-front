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
                <v-icon>{{ mdiClose }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <Details
            v-if="data.eventLabel === 'pip_details'"
            :data="data"
            :is-open-details="isOpenDetails"
          />

          <Dimensions
            v-if="data.eventLabel === 'pip_measurements'"
            :data="data"
          />

          <TechnicalInformation
            v-if="data.eventLabel === 'pip_technical-information'"
            :data="data"
          />

          <Variations v-if="data.options" :data="data" />

          <Filters v-if="data.filters || data.sortOrders" :data="data" />

          <Suggestion v-if="data.suggestion" :data="data" />

          <Forecast v-if="data.forecast" :data="data" />
        </v-col>
      </v-row>
    </div>
  </portal>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import { mdiClose } from '@mdi/js'

import Details from '@/components/Modal/Details'
import Dimensions from '@/components/Modal/Dimensions'
import TechnicalInformation from '@/components/Modal/TechnicalInformation'
import Variations from '@/components/Modal/ModalVariations'
import Filters from '@/components/Modal/ModalFilters'
import Suggestion from '@/components/Modal/ModalSuggestion'
import Forecast from '@/components/Modal/Forecast'

export default {
  name: 'InfoModal',
  components: {
    Details,
    Dimensions,
    TechnicalInformation,
    Variations,
    Filters,
    Suggestion,
    Forecast,
  },
  data() {
    return { mdiClose }
  },
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
