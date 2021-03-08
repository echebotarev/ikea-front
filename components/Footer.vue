<template>
  <v-footer class="footer py-10 px-10 mt-10">
    <v-row class="footer-line">
      <v-col cols="6">
        <b>Контакты:</b>
        <div class="vcard">
          <div class="fn org">ИП Чеботарева Дарья</div>
          <div class="adr">
            <span class="”country-name”">Казахстан</span>,
            <span class="locality">г. Актау</span>,
            <span class="street-address">10 микрорайон, 2 дом</span>
            <div>
              <a class="tel" href="tel:+77017375736">+7 (701) 737-5736</a>
            </div>
            <div>
              <a class="tel" href="tel:+79111721308">+7 (911) 172-1308</a>
            </div>
            <br />
            <a class="url" href="https://doma-doma.kz/">https://doma-doma.kz</a>
          </div>
        </div>
      </v-col>

      <v-col class="bottom-nav" cols="6">
        <b>Навигация:</b>

        <v-list-item
          v-for="link in links"
          :key="link.url"
          dense
          nuxt
          class="list-item"
        >
          <v-list-item-content class="py-0">
            <v-list-item-subtitle class="list-item-subtitle">
              <nuxt-link :to="link.url">{{ link.label }}</nuxt-link>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>

      <v-col class="social-icons" cols="6">
        <b>Напишите нам:</b>

        <div>
          <span>
            <a
              class="whatsapp"
              href="https://api.whatsapp.com/send?phone=79111721308"
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
      </v-col>
    </v-row>
    <v-row class="footer-line">
      <v-divider></v-divider>
    </v-row>
    <v-row class="footer-line">
      <v-col cols="12">
        <b>2020 - {{ new Date().getFullYear() }}</b>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import links from '@/assets/data/links'

export default {
  name: 'Footer',
  computed: {
    links: () => links,
  },
}
</script>

<style scoped lang="scss">
.footer {
  color: #484848;
}
.vcard {
  font-size: 14px;
}
.footer-line {
  width: 100%;
}
.list-item {
  height: 30px;
  min-height: 30px;

  .list-item-subtitle {
    font-size: 14px;
    font-weight: normal;
  }
}
.social-icons {
  span {
    width: 40px;
    height: 40px;
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
    margin: 10px 5px 0 0;

    a {
      display: inline-block;
      width: 100%;
      height: 100%;
      background-color: #4f5a6b;
      background: url('/images/social.png') -4px -4px no-repeat;

      &.whatsapp {
        background-position: -54px -104px;
      }

      &.telegram {
        background-position: -153px -104px;
      }

      &.instagram {
        background-position: -154px -4px;
      }
    }
  }
}

.bottom-nav .v-list-item {
  padding-left: 0;
}
</style>
