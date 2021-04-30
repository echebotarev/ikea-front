<template>
  <div>
    <h1 class="text-center mb-10">{{ page.title }}</h1>
    <v-row>
      <v-col>
        <v-card color="#0058a3" class="py-5 px-15">
          <div class="text-center">
            <v-icon x-large color="#fff">{{ mdiNumeric1Circle }}</v-icon>
          </div>
          <v-card-title class="card-title text-center text-break">
            Заказ отправлен на указанную вами почту
          </v-card-title>
        </v-card>
      </v-col>
      <v-col>
        <v-card color="#0058a3" class="py-5 px-15">
          <div class="text-center">
            <v-icon x-large color="#fff">{{ mdiNumeric2Circle }}</v-icon>
          </div>
          <v-card-title class="card-title text-center text-break">
            В ближайшее время мы с вами свяжемся
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiNumeric1Circle, mdiNumeric2Circle } from '@mdi/js'

export default {
  name: 'Information',

  data() {
    return {
      page: {},
      mdiNumeric1Circle,
      mdiNumeric2Circle,
    }
  },

  beforeMount() {
    const { type } = this.$route.params
    switch (type) {
      case 'order-is-sent':
        return (this.page = {
          type,
          title: 'Заказ отправлен',
        })
    }
  },

  methods: {},
}
</script>

<style scoped lang="scss">
.card-title {
  color: #fff;
  display: block;
}
</style>
