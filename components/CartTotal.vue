<template>
  <div>
    <div v-if="saleForVolume" class="cart-total sale-for-volume mb-3 px-5 py-3">
      <v-row>
        <v-col>
          <div>Скидка при заказе:</div>
          <div v-for="(item, i) in saleForVolume" :key="i" class="text-nowrap">
            <span>
              от
              <Price
                :price="item.down"
                :without-label="true"
                :is-only-formatted="true"
                class-name="f-size-4"
              />
            </span>
            <span v-if="item.up">
              <Price
                :price="item.up"
                :without-label="true"
                :is-only-formatted="true"
                class-name="f-size-4"
              />
            </span>
            - {{ item.sale }}%
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="cart-total mb-10 px-5 py-7">
      <v-row v-if="sale" class="cart-sale mb-3">
        <v-col class="font-weight-bold">Скидка:</v-col>
        <v-col class="text-right font-weight-bold">
          {{ sale.value }}% –
          <Price
            :price="sale.absoluteValue"
            :without-label="true"
            :is-only-formatted="true"
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="font-weight-bold">{{ text }}</v-col>
        <v-col class="text-right">
          <Price
            :price="total"
            :is-only-formatted="true"
            :text="sale ? 'Цена с учетом<br /> скидки и доставки' : null"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CartTotal',
  components: { Price: () => import('@/components/Price') },
  props: {
    total: {
      type: Number,
      default: () => 0,
    },
    text: {
      type: String,
      default: () => '',
    },
    sale: {
      type: [Object, Number],
      default: () => 0,
    },
  },
  computed: {
    ...mapGetters({
      saleForVolume: 'variables/saleForVolume',
    }),
  },
}
</script>

<style scoped lang="scss">
.cart-total {
  border: 1px solid #dfdfdf;
  font-size: 22px;

  .cart-sale {
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
  }

  &.sale-for-volume {
    font-size: 16px;
  }
}
</style>
