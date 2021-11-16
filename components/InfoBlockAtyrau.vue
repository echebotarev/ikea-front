<template>
  <v-card class="info-block pb-4">
    <v-card-title>Атырау:</v-card-title>
    <v-card-subtitle>Услуги предоставляет:</v-card-subtitle>
    <v-card-text>
      <p class="mb-2">
        Казахстан - ИП IDEA B DOM <br />
        ИНН: 901003350618
      </p>
      <p class="mb-2">
        Если у вас остались вопросы, или нужна помощь, звоните: <br />
        +7 (778) 248 9000 -
        <a
          href="https://api.whatsapp.com/send?phone=+77782489000"
          class="social-link whatsapp"
          target="_blank"
          rel="nofollow"
          title="WhatsApp"
        >
          WhatsApp </a
        >,
      </p>
    </v-card-text>
    <v-card-subtitle class="py-0"><b>Адрес:</b></v-card-subtitle>
    <v-card-text>
      Казахстан, г. Атырау, ул. Азаттык 55 за ТД «Адал»
    </v-card-text>
    <v-card-subtitle class="py-0"><b>Доставка:</b></v-card-subtitle>
    <v-card-text>
      Доставляем до склада по адресу ул. Азаттык 55 за ТД «Адал» <br />
      <span
        v-html="
          delivery
            ? `Закажите сегодня и мы привезем ваш заказ к <b>${delivery.deliveryDay}</b>`
            : `Привезем ваш заказ в течении 2х недель`
        "
      ></span>
    </v-card-text>
    <v-card-actions class="pl-4">
      <v-btn
        elevation="0"
        class="button button-black"
        @click="openReturn('004')"
      >
        Условия возврата
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'InfoBlockAtyrau',
  props: {
    delivery: {
      type: Object,
      default: () => null,
    },
    openReturn: {
      type: Function,
      default: () => () => {},
    },
  },
}
</script>

<style scoped></style>
