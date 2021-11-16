<template>
  <div>
    <b>Контакты:</b>
    <div class="vcard mt-2 mb-4">
      <div v-if="shopId === '004'" class="fn org">ИП IDEA B DOM</div>
      <div class="adr">
        <span class="country-name">Казахстан</span>,

        <span v-if="shopId === '004'" class="locality">г. Атырау,</span>
        <span v-if="shopId === '004'" class="street-address">
          ул. Азаттык 55 за ТД «Адал»
        </span>

        <div>
          <a v-if="shopId === '004'" class="tel" href="tel:+77782489000">
            +7 (778) 248-9000
          </a>
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
            href="https://api.whatsapp.com/send?phone=77782489000"
            target="_blank"
            rel="nofollow"
            title="WhatsApp"
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
  name: 'FooterContactAtyrau',
  props: {
    shopId: {
      type: String,
      default: () => '004',
    },
  },
}
</script>

<style scoped></style>
