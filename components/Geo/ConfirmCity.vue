<template>
  <v-card class="confirm-city">
    <v-card-title>{{ geo && geo.city }} - это ваш город?</v-card-title>
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
