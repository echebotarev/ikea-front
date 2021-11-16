<template>
  <v-row class="pt-10">
    <v-col cols="12">
      <h1>Doma-Doma – сервис по доставке товаров IKEA</h1>
    </v-col>

    <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
      <InfoBlockAktau
        :open-return="openReturn"
        :delivery="shopId === '001' ? delivery : null"
      />
    </v-col>

    <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
      <InfoBlockAtyrau
        :open-return="openReturn"
        :delivery="shopId === '004' ? delivery : null"
      />
    </v-col>

    <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
      <InfoBlockUralsk :open-return="openReturn" />
    </v-col>

    <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
      <InfoBlockSaransk />
    </v-col>

    <v-dialog v-model="isOpen" scrollable max-width="500px">
      <v-card>
        <div v-if="shopId === '001' || shopId === '004'">
          <v-card-title>Возврат:</v-card-title>

          <v-card-text>
            Если вы отказываетесь от доставленного заказа
            <b>по причине ненадлежащего качества</b>, <b>количества</b> или
            <b>комплектности</b> товаров, также имея
            <b>заводское или механическое повреждение</b>, мы или производим
            обмен данного товара или возвращаем денежные средства в течение 2-х
            недель, после того как мы вернем товар в официальный магазин IKEA г.
            Самара.
          </v-card-text>

          <v-card-text>
            Если вам не понравился товар, не подошёл по размеру, или заказали не
            то, мы вернем вам деньги. <br />
            – Для оформления возврата необходим чек <br />
            – Возвращается стоимость заказа за вычетом стоимости доставки <br />
            – Стоимость доставки не превышает 30% стоимости заказа <br />
            – Деньги возвращаются после возврата товаров в магазин IKEA в Самаре
          </v-card-text>

          <v-card-actions>
            <v-btn
              elevation="0"
              class="button button-black"
              width="150px"
              @click="closeReturn"
            >
              Закрыть
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Information',

  data() {
    return {
      isOpen: false,
      shopId: '001',
    }
  },

  computed: {
    ...mapState({
      delivery: (state) => state.page.delivery,
    }),
  },

  mounted() {
    this.getDeliveryData()
    this.shopId = this.$store.$cookies.get('domaDomaShopId')
  },

  methods: {
    ...mapActions({
      getDeliveryData: 'page/getDeliveryData',
    }),
    openReturn(shopId) {
      this.shopId = shopId
      this.isOpen = true
    },
    closeReturn() {
      this.isOpen = false
    },
  },

  head: () => ({
    title: 'Doma-doma – доставка товаров IKEA в Актау',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Doma-doma – сервис по доставке IKEA в Актау, Уральск и Атырау',
      },
    ],
  }),
}
</script>

<style scoped lang="scss">
h1 {
  font-size: 2em;
  line-height: 1.2;
}
</style>
