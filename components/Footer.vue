<template>
  <v-footer>
    <v-row>
      <v-col class="bottom-nav">
        <b>Навигация:</b>

        <v-list-item v-for="link in links" :key="link.url" nuxt>
          <v-list-item-content>
            <v-list-item-title>
              <nuxt-link :to="link.url">{{ link.label }}</nuxt-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>

      <v-col class="social-icons">
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
        </div>
      </v-col>
      <v-col class="text-right">{{ new Date().getFullYear() }}</v-col>
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
    }
  }
}

.bottom-nav .v-list-item {
  padding-left: 0;
}
</style>
