<template>
  <v-row v-if="isOpen" class="message" no-gutters align="center">
    <v-col class="text-right" cols="2">
      <v-icon color="#fff" small>mdi-store-outline</v-icon>
    </v-col>

    <v-col class="pl-2" cols="8">
      <v-carousel
        cycle
        height="19"
        vertical
        hide-delimiter-background
        hide-delimiters
        :show-arrows="false"
      >
        <v-carousel-item v-for="message in messages" :key="message">{{
          message
        }}</v-carousel-item>
      </v-carousel>
    </v-col>

    <v-col cols="2">
      <v-btn icon @click="close">
        <v-icon color="#fff" small>mdi-close</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Message',
  data: () => ({
    isOpen: true,
    messages: [
      'Доставим прямо до двери',
      'Привезем заказ через 2 недели',
      'Цены уже включают стоимость закупки, надежной упаковки и доставки',
    ],
  }),
  methods: {
    close() {
      this.isOpen = false
    },
  },
}
</script>

<style scoped lang="scss">
.message {
  background-color: #3ba133;
  color: #fff;
  font-size: 0.8rem;
}
</style>
