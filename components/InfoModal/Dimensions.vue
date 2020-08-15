<template>
  <v-row align="center product-dimensions">
    <v-spacer></v-spacer>
    <v-col cols="10">
      <h2>{{ data.title }}</h2>

      <span
        v-for="(dimension, indexDimension) in data.dimensions"
        :key="`${indexDimension}-dimension`"
      >
        <b>{{ dimension.name }}:</b> {{ dimension.measure }}
      </span>

      <div v-if="data.images.length">
        <v-img
          v-for="(image, indexImg) in data.images"
          :key="`${indexImg}-image`"
          :src="getImage(image.url, 4)"
        ></v-img>
      </div>
      <v-img
        v-if="data.images.length === 0"
        :src="getImage(data.fallbackImage.url, 4)"
      ></v-img>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
import getImage from '~/assets/utils/getImage'
export default {
  name: 'Dimensions',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    getImage,
  },
}
</script>

<style scoped lang="scss">
.product-dimensions {
  span {
    display: block;
  }
}
</style>
