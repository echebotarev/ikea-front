<template>
  <v-row v-if="loaderType === 'category'">
    <v-col v-for="i in 4" :key="`${i}-${Math.random()}`" cols="4">
      <v-skeleton-loader
        type="image, paragraph"
        :height="getHeight('category')"
        tile
      ></v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SkeletonItems',
  props: {
    loaderType: {
      type: String,
      default: () => '',
    },
  },
  methods: {
    getHeight(type) {
      if (type === 'category') {
        if (this.$vuetify.breakpoint.xs) {
          return 85
        } else if (this.$vuetify.breakpoint.sm) {
          return 160
        } else if (this.$vuetify.breakpoint.md) {
          return 190
        }
      }

      return 240
    },
  },
}
</script>

<style scoped lang="scss"></style>
