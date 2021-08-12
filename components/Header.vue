<template>
  <div>
    <NavBar />
    <client-only v-if="$vuetify.breakpoint.smAndUp">
      <nav class="text-right py-3">
        <NavLinks />
      </nav>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'Header',
  components: {
    NavLinks: () => import('@/components/NavLinks'),
  },
}
</script>

<style scoped>
nav {
  background: #f5f5f5;
}
</style>
