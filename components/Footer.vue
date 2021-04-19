<template>
  <v-footer class="footer py-10 px-10 mt-10">
    <v-row class="footer-line">
      <v-col cols="6">
        <client-only>
          <FooterContactAktau v-if="shopId === '001'" />
          <FooterContactSaransk v-if="shopId === '002'" />
        </client-only>
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
import { mapState } from 'vuex'

import FooterContactAktau from '@/components/FooterContactAktau'
import FooterContactSaransk from '@/components/FooterContactSaransk'

import links from '@/assets/data/links'

export default {
  name: 'Footer',
  components: { FooterContactAktau, FooterContactSaransk },
  computed: {
    links: () => links,
    ...mapState({
      shopId: (state) => state.geo.shopId,
    }),
  },
}
</script>

<style scoped lang="scss">
.footer {
  color: #484848;
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
.bottom-nav .v-list-item {
  padding-left: 0;
}
</style>
