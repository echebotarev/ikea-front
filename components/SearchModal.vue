<template>
  <portal v-if="isShow && data.type === 'search'" to="modal">
    <div class="modal-substrate" @click="hideModal">
      <v-row class="modal" no-gutters @click.stop="">
        <v-spacer></v-spacer>
        <v-col cols="11">
          <v-row>
            <v-col cols="1">
              <v-btn class="top-indent" icon @click="hideModal">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="11">
              <v-text-field
                clearable
                placeholder="Что вы ищете?"
                append-icon="mdi-arrow-right"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-spacer></v-spacer>
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

  .top-indent {
    margin-top: 16px;
  }
}
</style>
