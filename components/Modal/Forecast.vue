<template>
  <div>
    <v-row align="center" class="product-forecast">
      <v-spacer></v-spacer>
      <v-col cols="10">
        <h2>Прогноз наличия товара</h2>
        <v-divider></v-divider>
        <div class="py-5">
          <div v-for="item in data.forecast" :key="item.ValidDateTime['@']">
            <span class="text-capitalize">{{
              getFormatDate(item.ValidDateTime['@'])
            }}</span>
            - {{ item.AvailableStock['@'] }} шт.
          </div>
        </div>
        <v-divider></v-divider>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <v-row align="center" class="product-forecast">
      <v-spacer></v-spacer>
      <v-col v-if="restockForecast" cols="10">
        <h2>Более надежный прогноз:</h2>
        <v-divider></v-divider>
        <div class="py-5">
          <div v-if="restockForecast.itemKey.itemNo === data.identifier">
            <span>
              Сегодня:
              {{ restockForecast.buyingOption.cashCarry.availability.quantity }}
              шт. </span
            ><br />
            <span
              v-for="(item, i) in restockForecast.buyingOption.cashCarry
                .availability.restocks"
              :key="i"
            >
              Должен появится с {{ getFormatDate(item.earliestDate) }} по
              {{ getFormatDate(item.latestDate) }} <br />
              Надежность прогноза: {{ item.reliability }} <br />
              Количество: {{ item.quantity }}
            </span>
            <br />
          </div>
        </div>
        <v-divider></v-divider>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Forecast',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    ...mapGetters({
      restockForecast: 'availability/restockForecast',
    }),
  },

  mounted() {
    this.fetchRestockProduct({ identifier: this.data.identifier })
  },

  methods: {
    getFormatDate(s) {
      return this.$dayjs(s).format('dd, D MMM YYYY')
    },

    ...mapActions({
      fetchRestockProduct: 'availability/fetchRestockProduct',
    }),
  },
}
</script>

<style scoped></style>
