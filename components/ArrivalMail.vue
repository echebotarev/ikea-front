<template>
  <v-card>
    <v-card-subtitle class="product-description">
      Обычно товары появляются в течении пары недель. Оставьте почту и мы
      сообщим вам об этом
    </v-card-subtitle>
    <v-card-text>
      <v-text-field
        v-model="mail"
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
  },

  data() {
    return {
      mail: '',
    }
  },

  methods: {
    checkEmail(value) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value.trim())
    },

    send() {
      console.log('Mail', this.mail)
      if (this.checkEmail(this.mail)) {
        this.$store.dispatch('availability/setAvailabilityNotification', {
          mail: this.mail,
          id: this.id,
        })
      }
    },
  },
}
</script>

<style scoped></style>
