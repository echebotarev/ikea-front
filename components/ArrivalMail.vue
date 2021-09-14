<template>
  <v-card>
    <v-btn class="close-btn" icon @click="close">
      <v-icon>{{ mdiClose }}</v-icon>
    </v-btn>
    <v-card-subtitle v-if="isSent" class="product-description">
      Отлично! Мы скоро с вами свяжемся.
    </v-card-subtitle>
    <v-card-subtitle v-if="!isSent" class="product-description">
      Обычно товары появляются в течении пары недель. Оставьте вашу почту и мы
      сообщим вам об этом
    </v-card-subtitle>
    <v-card-text v-if="!isSent">
      <v-text-field
        v-model="scopedEmail"
        flat
        hide-details
        rounded
        filled
        placeholder="mail@example.com"
        full-width
        height="50"
        required
        class="mb-2"
      >
      </v-text-field>

      <v-text-field
        v-model="comment"
        flat
        hide-details
        rounded
        filled
        placeholder="Комментарий..."
        full-width
        height="50"
        class="mb-4"
      ></v-text-field>

      <v-btn
        block
        rounded
        color="#111"
        min-height="50"
        :loading="isLoading"
        class="button"
        @click="send"
      >
        Отправить
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

import { mdiClose } from '@mdi/js'

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
    close: {
      type: Function,
      default: () => () => {},
    },
  },

  data() {
    return {
      email: '',
      comment: '',
      isLoading: false,
      isSent: false,
      mdiClose,
    }
  },

  computed: {
    scopedEmail: {
      get() {
        return this.storagedMail || ''
      },
      set(v) {
        this.email = v
      },
    },
    ...mapState({
      storagedMail: (state) => state.availability.email,
    }),
  },

  methods: {
    checkEmail(value) {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value.trim())
    },

    async send() {
      if (this.checkEmail(this.email)) {
        this.isLoading = true
        await this.$store.dispatch('availability/setAvailabilityNotification', {
          email: this.email,
          comment: this.comment,
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

<style scoped lang="scss">
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
.product-description {
  width: 90%;
}
</style>
