<template>
  <div v-if="availabilityProduct.status === 'success'" class="status">
    <v-icon>mdi-store-outline</v-icon>
    <div class="status-text">{{ availabilityProduct.data.statusText }}</div>
    <div :class="`status-dot__${availabilityProduct.data.statusColor}`"></div>
  </div>
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

<style scoped lang="scss">
.status div {
  display: inline-block;
}
[class^='status-dot'] {
  position: relative;
  top: -2px;
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  left: 0.625rem;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}
.status-dot__orange {
  background: #ffa524;
}
.status-dot__green {
  background: #0a8a00;
}
</style>
