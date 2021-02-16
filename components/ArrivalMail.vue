<template>
  <v-card>
    <v-card-subtitle v-if="isSent">
      Отлично! Мы скоро с вами свяжемся.
    </v-card-subtitle>
    <v-card-subtitle v-if="!isSent" class="product-description">
      Обычно товары появляются в течении пары недель. Оставьте вашу почту и мы
      сообщим вам об этом
    </v-card-subtitle>
    <v-card-text v-if="!isSent">
      <v-text-field
        v-model="email"
        flat
        hide-details
        rounded
        filled
        placeholder="mail@example.com"
        full-width
        height="50"
        required
      >
      </v-text-field>
      <v-btn
        block
        rounded
        color="#111"
        min-height="50"
        :loading="isLoading"
        class="button mt-2"
        @click="send"
      >
        Отправить
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ArrivalMail',

  props: {
    id: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      email: '',
      isLoading: false,
      isSent: false,
    }
  },

  methods: {
    checkEmail(value) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value.trim())
    },

    async send() {
      if (this.checkEmail(this.email)) {
        this.isLoading = true
        await this.$store.dispatch('availability/setAvailabilityNotification', {
          email: this.email,
          id: this.id,
          type: this.type,
        })

        this.isLoading = false
        this.isSent = true
      } else {
        this.$notify({
          group: 'all',
          title: 'Не правильно указана почта.',

          type: 'warn',
          duration: 10000,
        })
      }
    },
  },
}
</script>

<style scoped></style>
