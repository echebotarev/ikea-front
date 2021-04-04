<template>
  <v-card v-if="geo" class="confirm-city">
    <v-card-title>{{ geo.city }} - это ваш город?</v-card-title>
    <v-card-actions class="confirm-city-actions float-right">
      <v-btn
        elevation="0"
        width="100px"
        class="button button-black"
        @click="confirm"
      >
        Да
      </v-btn>
      <v-btn
        elevation="0"
        width="100px"
        class="button button-black"
        @click="confirm"
      >
        Нет
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ConfirmCity',
  computed: {
    ...mapState({
      geo: (state) => state.geo.data,
    }),
  },
  methods: {
    confirm() {
      this.setConfirmed(true)
      this.checkCity()
    },
    ...mapActions({
      setConfirmed: 'geo/setConfirmed',
      checkCity: 'geo/checkCity',
    }),
  },
}
</script>

<style scoped lang="scss">
.confirm-city {
  position: absolute;
}
</style>
