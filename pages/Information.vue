<template>
  <v-row class="pt-10">
    <v-col cols="12">
      <h1>Doma-Doma – сервис по доставке товаров IKEA</h1>
    </v-col>

    <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
      <v-card class="pb-4">
        <v-card-title>Актау:</v-card-title>
        <v-card-subtitle>Услуги предоставляет:</v-card-subtitle>
        <v-card-text>
          <p class="mb-2">
            Казахстан - ИП Чеботарева Дарья Андреевна <br />
            ИНН: 840721401346
          </p>
          <p class="mb-2">
            Россия - ИП Чеботарев Егор Андреевич <br />
            ИНН: 780262965912<br />
            ОГРНИП: 320784700166917 <br />
          </p>
          <p class="mb-2">
            Если у вас остались вопросы, или нужна помощь, звоните: <br />
            <b>+7 (911) 172-1308</b> -
            <a
              href="https://api.whatsapp.com/send?phone=+79111721308&text=Привет"
              class="social-link whatsapp"
              target="_blank"
              rel="nofollow"
              title="Telegram"
              >WhatsApp</a
            >,
            <a
              href="https://t.me/echebotarev"
              class="social-link telegram"
              target="_blank"
              rel="nofollow"
              title="Telegram"
              >Telegram</a
            >
          </p>
        </v-card-text>
        <v-card-subtitle>Адрес:</v-card-subtitle>
        <v-card-text> Казахстан, г. Актау, 7-1-16</v-card-text>
        <v-card-subtitle>Доставка:</v-card-subtitle>
        <v-card-text>
          В стоимость товаров включена доставка прямо до квартиры <br />
          Привезем ваш заказ в течении 2х недель
        </v-card-text>
        <v-card-actions class="pl-4">
          <v-btn
            elevation="0"
            class="button button-black"
            @click="openReturn('001')"
          >
            Условия возврата
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
      <v-card class="pb-4">
        <v-card-title>Саранск:</v-card-title>
        <v-card-subtitle>Услуги предоставляет:</v-card-subtitle>
        <v-card-text>
          <p class="mb-2">ProIKEA</p>
          <p class="mb-2">
            Если у вас остались вопросы, или нужна помощь, звоните: <br />
            <a href="tel:+79179922663">+7 (917) 992 2663</a><br />
            <a href="tel:+78342342233">+7 (8342) 34 22 33</a>
          </p>
        </v-card-text>
        <v-card-subtitle>Адрес:</v-card-subtitle>
        <v-card-text> Россия, г.Саранск. ул.Большевистская 85 </v-card-text>
      </v-card>
    </v-col>

    <v-dialog v-model="isOpen" scrollable max-width="500px">
      <v-card>
        <div v-if="shopId === '001'">
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
              >Закрыть</v-btn
            >
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'Information',

  data() {
    return {
      isOpen: false,
      shopId: '001',
    }
  },

  methods: {
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
          'Doma-doma – сервис по доставке товаров из магазина IKEA в Самаре в Актау',
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
.social-link {
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }

  &.whatsapp {
    color: #1cab13;
  }

  &.telegram {
    color: #129bd0;
  }
}
</style>
