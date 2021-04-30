<!-- Используется на внутренних страницах категорий -->
<template>
  <div class="card-category">
    <nuxt-link :to="`/category/${category.identifier}`">
      <v-img
        v-if="category.image"
        :src="getUrlImage(category.image)"
        lazy-src="/images/placeholder-horizontal.png"
        aspect-ratio="1.785"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-icon x-large>{{ mdiImageMultipleOutline }}</v-icon>
          </v-row>
        </template>
      </v-img>
      <p v-if="category.title">{{ category.title }}</p>
    </nuxt-link>
  </div>
</template>
<script>
import { mdiImageMultipleOutline } from '@mdi/js'

export default {
  name: 'InnerCategoryCard',
  props: {
    category: { type: Object, default: () => {} },
  },
  data() {
    return { mdiImageMultipleOutline }
  },
  methods: {
    getUrlImage(url) {
      return this.$vuetify.breakpoint.mobile
        ? url.replace('imwidth=400', 'imwidth=200')
        : url.replace('imwidth=400', 'imwidth=500')
    },
  },
}
</script>
<style scoped lang="scss">
.card-category {
  p {
    word-break: break-word;
  }
}
</style>
