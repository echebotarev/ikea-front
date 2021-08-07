<template>
  <div>
    <NavBar />
    <client-only v-if="$vuetify.breakpoint.smAndUp">
      <nav class="text-right py-3">
        <NavLinks />
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
    NavLinks: () => import('@/components/NavLinks'),
  },
}
</script>

<style scoped>
nav {
  background: #f5f5f5;
}
</style>
