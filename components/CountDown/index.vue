<template>
  <v-card v-if="delivery.lastOrderDayRawData" class="count-down">
    <v-card-title>До окончания приема заказов осталось:</v-card-title>
    <v-card-text>
      <Timer
        :start="Date.now()"
        :end="new Date(delivery.lastOrderDayRawData).getTime()"
      />
    </v-card-text>
    <v-card-subtitle class="font-weight-bold pt-0">
      Ближайшая поездка:
    </v-card-subtitle>
    <v-card-text>
      Магазин: {{ ikeaShopDisplayName }}<br />
      Дата: {{ $dayjs(delivery.shoppingDayRawData).format('DD.MM.YYYY') }},
      {{ days[$dayjs(delivery.shoppingDayRawData).day()] }}<br />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import Timer from '@/components/CountDown/Timer'

export default {
  name: 'Index',
  components: { Timer },

  async fetch() {
    await this.getDeliveryData()
  },

  data() {
    return {
      days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    }
  },

  computed: {
    ...mapGetters({
      ikeaShopDisplayName: 'geo/getIkeaShopDisplayName',
    }),
    ...mapState({
      delivery: (state) => state.page.delivery,
    }),
  },

  methods: {
    ...mapActions({
      getDeliveryData: 'page/getDeliveryData',
    }),
  },
}
</script>

<style scoped lang="scss">
.count-down {
  .v-card__title {
    word-break: normal;
  }
}
</style>
