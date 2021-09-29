<template>
  <v-card class="info-block pb-4">
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
        +7 (911) 172-1308 -
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
    <v-card-subtitle class="py-0"><b>Адрес:</b></v-card-subtitle>
    <v-card-text> Казахстан, г. Актау, 7-1-16</v-card-text>
    <v-card-subtitle class="py-0"><b>Доставка:</b></v-card-subtitle>
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
</template>

<script>
export default {
  name: 'InfoBlockAktau',
  props: {
    openReturn: {
      type: Function,
      default: () => () => {},
    },
  },
}
</script>

<style scoped></style>
