<template>
  <div>
    <div
      v-if="
        availabilityProduct(identifier).StockAvailability &&
        availabilityProduct(identifier).StockAvailability.RetailItemAvailability
      "
      class="status"
    >
      <v-icon>mdi-store-outline</v-icon>
      <div
        :class="`status-dot__${
          availabilityProduct(identifier).StockAvailability
            .RetailItemAvailability.InStockProbabilityCode.$
        } ${withQnt ? 'with-qnt' : ''} pl-5`"
      >
        <span
          v-if="
            withQnt &&
            availabilityProduct(identifier).StockAvailability
              .RetailItemAvailability.InStockProbabilityCode.$ !== 'LOW'
          "
          >{{
            availabilityProduct(identifier).StockAvailability
              .RetailItemAvailability.AvailableStock.$
          }}</span
        >

        <span
          v-if="
            availabilityProduct(identifier).StockAvailability
              .RetailItemAvailability.InStockProbabilityCode.$ === 'HIGH'
          "
          >В наличии</span
        >

        <span
          v-if="
            availabilityProduct(identifier).StockAvailability
              .RetailItemAvailability.InStockProbabilityCode.$ === 'MEDIUM'
          "
          >Заканчивается</span
        >

        <span
          v-if="
            availabilityProduct(identifier).StockAvailability
              .RetailItemAvailability.InStockProbabilityCode.$ === 'LOW'
          "
          >Нет в наличии</span
        >
      </div>
    </div>

    <div
      v-if="!availabilityProduct(identifier).StockAvailability"
      class="status"
    >
      <v-icon>mdi-clock-time-three-outline</v-icon>
      <div>Проверяем наличие</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Available',
  props: {
    type: {
      type: String,
      default: () => '',
    },
    identifier: {
      type: String,
      default: () => '',
    },
    withQnt: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    ...mapGetters({
      availabilityProduct: 'availability/availabilityProduct',
    }),
  },
  mounted() {
    this.fetchAvailabilityProduct({
      type: this.type,
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

<style scoped lang="scss">
.status {
  font-size: 14px;

  div {
    display: inline-block;
  }
}
[class^='status-dot'] {
  position: relative;
}
[class^='status-dot']:before {
  position: absolute;
  content: '';
  top: 8px;
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  left: 5px;
  flex-shrink: 0;
}
.status-dot__MEDIUM {
  &:before {
    background: #ffa524;
  }

  &.with-qnt {
    color: #ffa524;
    text-transform: lowercase;
  }
}
.status-dot__HIGH {
  &:before {
    background: #0a8a00;
  }

  &.with-qnt {
    color: #0a8a00;
    text-transform: lowercase;
  }
}
.status-dot__LOW {
  &:before {
    background: red;
  }

  &.with-qnt {
    color: red;
  }
}
</style>
