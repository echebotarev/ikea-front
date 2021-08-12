<template>
  <div :class="`${place}-links`">
    <nuxt-link
      v-for="(link, i) in links"
      :key="link.url"
      :to="link.url"
      :class="`${links.length !== i + 1 && place === 'header' ? 'mr-10' : ''} ${
        link.className ? link.className : ''
      }`"
    >
      <v-icon v-if="link.icon" color="rgb(0, 88, 163)">
        {{ icons[link.icon] }}
      </v-icon>
      {{ link.label }}
    </nuxt-link>

    <Count v-if="place === 'header'" class="ml-2" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { mdiSale } from '@mdi/js'

export default {
  name: 'NavLinks',
  props: {
    place: {
      type: String,
      default: () => 'header',
    },
  },
  data() {
    return {
      icons: {
        sale: mdiSale,
      },
    }
  },
  computed: {
    ...mapState({
      saleProducts: (state) => state.products.saleProducts,
      links: (state) =>
        state.page.links.filter((link) =>
          link.url === '/sales' ? state.products.saleProducts.length : true
        ),
    }),
  },
}
</script>

<style scoped lang="scss">
.header-links {
  display: inline;
  margin-right: 40px;
}
.aside-links {
  padding: 40px 20px;

  a {
    display: block;
    height: 40px;
    font-size: 1.2rem;
  }
}
.footer-links a {
  display: block;
  height: 30px;
}
</style>
