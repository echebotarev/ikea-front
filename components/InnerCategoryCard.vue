<!-- Используется на внутренних страницах категорий -->
<template>
  <div>
    <nuxt-link :to="`/category/${category.identifier}`">
      <v-img
        v-if="category.image"
        :src="category.image"
        :lazy-src="category.image"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <p v-if="category.title">{{ category.title }}</p>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  name: 'MainCategoryCard',
  props: {
    category: { type: Object, default: () => {} },
  },
}
</script>
<style scoped></style>
