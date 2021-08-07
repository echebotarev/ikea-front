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
  </div>
</template>

<script>
import { mdiSale } from '@mdi/js'
import links from '@/assets/data/links'

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
      links,
      icons: {
        sale: mdiSale,
      },
    }
  },
}
</script>

<style scoped lang="scss">
.header-links {
  display: inline;
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
