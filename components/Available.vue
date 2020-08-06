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
    this.fetchAvailabilityProduct({
      url: this.url,
      identifier: this.identifier,
    })
  },
  methods: {
    ...mapActions({
      fetchAvailabilityProduct: 'availability/fetchAvailabilityProduct',
    }),
  },
}
</script>

<style scoped></style>
