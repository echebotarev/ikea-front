<template>
  <client-only>
    <v-row v-if="isOpen" class="message" no-gutters align="center">
      <v-col class="text-right" cols="2">
        <v-icon color="#fff" small>{{ mdiStoreOutline }}</v-icon>
      </v-col>

      <v-col class="pl-2" cols="8">
        <v-carousel
          cycle
          :height="$vuetify.breakpoint.xs ? 45 : 19"
          vertical
          hide-delimiter-background
          hide-delimiters
          :show-arrows="false"
        >
          <v-carousel-item v-for="message in messages" :key="message">
            <v-row class="fill-height pl-3" align="center" no-gutters>
              <div class="message-text">{{ message }}</div>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-col>

      <v-col cols="2">
        <v-btn icon @click="close">
          <v-icon color="#fff" small>{{ mdiClose }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </client-only>
</template>

<script>
import { mdiStoreOutline, mdiClose } from '@mdi/js'

export default {
  name: 'Message',
  data: () => ({
    isOpen: true,
    messages: [
      'Доставим прямо до двери',
      'Привезем заказ через 2 недели',
      'Цены уже включают стоимость закупки, надежной упаковки и доставки',
    ],
    mdiStoreOutline,
    mdiClose,
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

  .message-text {
    color: #fff;
  }
}
</style>
