<template>
  <div>
    <b>Контакты:</b>
    <div class="vcard mt-2 mb-4">
      <div class="fn org">ИП Чеботарева Дарья</div>
      <div class="adr">
        <span class="country-name">Казахстан</span>,

        <span v-if="shopId === '001'" class="locality">г. Актау,</span>
        <span v-if="shopId === '001'" class="street-address">7-1-16</span>

        <span v-if="shopId === '003'" class="locality">г. Уральск,</span>
        <span v-if="shopId === '003'" class="street-address">
          ул. Елизарова, д. 48
        </span>

        <span v-if="shopId === '004'" class="locality">г. Атырау,</span>
        <span v-if="shopId === '004'" class="street-address">
          ул. Азаттык 55 за ТД «Адал»
        </span>

        <div>
          <a class="tel" href="tel:+77760149480">+7 (776) 014-9480</a>
        </div>
        <br />
        <a class="url" href="https://doma-doma.org/">https://doma-doma.org</a>
      </div>
    </div>

    <div class="social-icons">
      <b>Напишите нам:</b>

      <div>
        <span>
          <a
            class="whatsapp"
            href="https://api.whatsapp.com/send?phone=77760149480"
            target="_blank"
            rel="nofollow"
            title="WhatsApp"
          ></a>
        </span>

        <span>
          <a
            class="telegram"
            href="https://t.me/echebotarev"
            target="_blank"
            rel="nofollow"
            title="Telegram"
          ></a>
        </span>

        <span>
          <a
            class="instagram"
            href="https://instagram.com/domadoma.kz"
            target="_blank"
            rel="nofollow"
            title="Instagram"
          ></a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterContactAktau',
  props: {
    shopId: {
      type: String,
      default: () => '001',
    },
  },
}
</script>

<style scoped></style>
