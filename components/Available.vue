<template>
  <div>Наличие {{ url }} {{ identifier }} {{ availabilityProduct }}</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Available',
  props: {
    url: {
      type: String,
      default: () => '',
    },
    identifier: {
      type: String,
      default: () => '',
    },
  },
  computed: mapState({
    availabilityProduct: (state) => state.availability.availabilityProduct,
  }),
  mounted() {
    const checkAvailability = () => {
      this.fetchAvailabilityProduct({
        url: this.url,
        identifier: this.identifier,
      }).then(() => {
        // опрашиваем сервер каждые 5 секунд, пока данные не пришли
        this.availabilityProduct.status !== 'success' &&
          setTimeout(checkAvailability, 5000)
      })
    }

    checkAvailability()
  },
  methods: {
    ...mapActions({
      fetchAvailabilityProduct: 'availability/fetchAvailabilityProduct',
    }),
  },
}
</script>

<style scoped></style>
