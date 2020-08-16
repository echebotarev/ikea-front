<template>
  <v-app-bar color="transparent" elevation="0" hide-on-scroll class="mt-5">
    <v-toolbar-title>
      <nuxt-link to="/" class="brand">
        <img src="~/assets/images/ikea-logo.svg" />
        <span class="logo-text ml-3 pl-3">
          Доставка
        </span>
      </nuxt-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <Search />
    <nav>
      <nuxt-link
        v-for="link in links"
        :key="link.url"
        :to="link.url"
        class="ml-5"
        >{{ link.label }}</nuxt-link
      >
    </nav>
    <span v-if="countCart" class="count ml-2 text-center">{{ countCart }}</span>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import Search from '@/components/Search'
export default {
  name: 'NavBar',
  components: { Search },
  props: {
    links: {
      type: Array,
      default: null,
    },
  },
  computed: {
    ...mapGetters({
      countCart: 'cart/getCountCart',
    }),
  },
}
</script>

<style scoped lang="scss">
.count {
  display: inline-block;
  padding: 3px;
  width: 30px;
  border-radius: 50%;
  background: rgb(0, 88, 163);
  color: #fff;
}
.logo-text {
  line-height: 40px;
  display: inline-block;
  float: right;
  border-left: thin solid rgba(0, 0, 0, 0.12);
  transition: all 0.3s;

  &:hover {
    border-left-color: rgba(0, 0, 0, 1);
  }
}
a:hover {
  .logo-text {
    border-left-color: rgba(0, 0, 0, 1);
  }
}
</style>
