<template>
  <v-card class="confirm-city">
    <v-card-title>{{ geo && geo.city }} - это ваш город?</v-card-title>
    <v-card-actions class="confirm-city-actions float-right">
      <v-btn elevation="0" width="100px" class="button button-black">Да</v-btn>
      <v-btn elevation="0" width="100px" class="button button-black">Нет</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ConfirmCity',
  computed: {
    ...mapState({
      geo: (state) => state.geo.data,
    }),
  },
}
</script>

<style scoped lang="scss">
.confirm-city {
  position: absolute;
}
</style>
