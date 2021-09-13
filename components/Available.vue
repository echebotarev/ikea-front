<template>
  <div>
    <div
      v-if="availabilityProduct(identifier).StockAvailability"
      class="status"
    >
      <v-icon v-if="!$vuetify.breakpoint.mobile">{{ mdiStoreOutline }}</v-icon>
      <div
        v-if="
          !availabilityProduct(identifier).StockAvailability
            .RetailItemAvailability
        "
        class="status-dot__LOW pl-5"
      >
        <span class="text-nowrap">Информация о наличии не доступна.</span>
      </div>
      <div
        v-else
        :class="`status-dot__${
          availabilityProduct(identifier).StockAvailability
            .RetailItemAvailability.InStockProbabilityCode['@']
        } ${withQnt ? 'with-qnt' : ''} pl-5`"
      >
        <span
          v-if="
            withQnt &&
            availabilityProduct(identifier).StockAvailability
              .RetailItemAvailability.InStockProbabilityCode['@'] !== 'LOW'
          "
          >{{
            availabilityProduct(identifier).StockAvailability
              .RetailItemAvailability.AvailableStock['@']
          }}</span
        >

        <span
          @click="
            showModal(
              Object.assign(
                { type: 'info' },
                {
                  forecast:
                    availabilityProduct(identifier).StockAvailability
                      .AvailableStockForecastList.AvailableStockForecast,
                  identifier,
                }
              )
            )
          "
        >
          {{
            availabilityProduct(identifier).StockAvailability
              .RetailItemAvailability.AvailableStock['@'] === '0'
              ? labels['LOW']
              : labels[
                  availabilityProduct(identifier).StockAvailability
                    .RetailItemAvailability.InStockProbabilityCode['@']
                ]
          }}
        </span>
      </div>
    </div>

    <div
      v-if="!availabilityProduct(identifier).StockAvailability"
      class="status"
    >
      <v-icon>{{ mdiClockTimeThreeOutline }}</v-icon>
      <div>Проверяем наличие</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { mdiStoreOutline, mdiClockTimeThreeOutline } from '@mdi/js'

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
  data() {
    return {
      mdiStoreOutline,
      mdiClockTimeThreeOutline,
      labels: {
        HIGH: 'В наличии',
        MEDIUM: 'Заканчивается',
        LOW: 'Нет в наличии',
      },
    }
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
      showModal: 'page/showModal',
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
  white-space: nowrap;
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
