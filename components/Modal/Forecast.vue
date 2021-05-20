<template>
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
</template>

<script>
export default {
  name: 'Forecast',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    getFormatDate(s) {
      return this.$dayjs(s).format('dd, D MMM YYYY')
    },
  },
}
</script>

<style scoped></style>
