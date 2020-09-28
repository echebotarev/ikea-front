<template>
  <v-row class="pt-10">
    <v-col cols="12">
      <p>
        <b>Doma-doma</b> – сервис по доставке товаров из магазина IKEA в Самаре
      </p>
    </v-col>

    <v-col cols="12">
      <h4>Контакты:</h4>

      <p>
        Услуги предоставляет ИП Чеботарева Дарья Андреевна <br />
        ИНН: 840721401346
      </p>

      <p>
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
    </v-col>

    <v-col cols="12">
      <h4>Доставка:</h4>

      <p>В стоимость товаров включена доставка прямо до квартиры</p>
      <p>Привезем ваш заказ в течении 2х недель</p>
    </v-col>

    <v-col cols="12">
      <h4>Возврат:</h4>

      <p>
        Если вы отказываетесь от доставленного заказа
        <b>по причине ненадлежащего качества</b>, <b>количества</b> или
        <b>комплектности</b> товаров, также имея
        <b>заводское или механическое повреждение</b>, мы или производим обмен
        данного товара или возвращаем денежные средства в течение 2-х недель,
        после того как мы вернем товар в официальный магазин IKEA г. Самара.
      </p>

      <p>
        Если вам не понравился товар, не подошёл по размеру, или заказали не то,
        мы вернем вам деньги. <br />
        – Для оформления возврата необходим чек <br />
        – Возвращается стоимость заказа за вычетом стоимости доставки <br />
        – Стоимость доставки не превышает 30% стоимости заказа <br />
        – Деньги возвращаются после возврата товаров в магазин IKEA в Самаре
      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Information',

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
