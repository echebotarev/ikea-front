<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" scrollable max-width="300px">
      <v-card>
        <v-card-title>Ваш город:</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="content">
          <v-radio-group v-model="id" column>
            <v-radio
              v-for="(city, shopId) in cities"
              :key="shopId"
              :label="city"
              :value="shopId"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            elevation="0"
            width="100px"
            class="button button-black"
            @click="() => toggleDialog(false)"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ChooseCity',
  computed: {
    id: {
      get() {
        return this.shopId
      },
      set(shopId) {
        return this.setShopId(shopId)
      },
    },
    isOpen: {
      get() {
        return this.dialog
      },
      set(value) {
        return this.toggleDialog(value)
      },
    },
    ...mapState({
      dialog: (state) => state.geo.isOpenCities,
      cities: (state) => state.geo.shopDisplayNames,
      shopId: (state) => state.geo.shopId,
    }),
  },
  methods: {
    ...mapActions({
      setShopId: 'geo/setShopId',
      toggleDialog: 'geo/toggleDialog',
    }),
  },
}
</script>

<style scoped>
.content {
  max-width: 300px;
}
</style>
