<template>
  <div>
    <NavBar />
    <client-only v-if="$vuetify.breakpoint.smAndUp">
      <nav class="text-right py-3">
        <nuxt-link
          v-for="(link, i) in links"
          :key="link.url"
          :to="link.url"
          :class="`${links.length !== i + 1 ? 'mr-10' : ''} ${
            link.className ? link.className : ''
          }`"
        >
          {{ link.label }}
        </nuxt-link>
        <Count class="mr-10 ml-2" />
      </nav>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'Header',
  components: {
    Count: () => import('@/components/Count'),
  },
  props: {
    links: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style scoped>
nav {
  background: #f5f5f5;
}
</style>
