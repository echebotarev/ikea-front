<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <v-card>
        <v-card-title>Ваш город:</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="content">
          <v-radio-group v-model="shopId" column>
            <v-radio
              v-for="(city, shopId) in cities"
              :key="shopId"
              :label="city"
              :value="shopId"
              @change="setShopId(shopId)"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ChooseCity',
  computed: {
    ...mapState({
      dialog: (state) => state.geo.isOpenCities,
      cities: (state) => state.geo.shopDisplayNames,
      shopId: (state) => state.geo.shopId,
    }),
  },
  methods: {
    ...mapActions({
      setShopId: 'geo/setShopId',
    }),
  },
}
</script>

<style scoped>
.content {
  max-width: 300px;
}
</style>
