<template>
  <v-row align="center">
    <v-spacer></v-spacer>
    <v-col cols="10">
      <h2>{{ data.title }}</h2>

      <span
        v-for="(dimension, indexDimension) in data.dimensions"
        :key="`${indexDimension}-dimension`"
      >
        <b>{{ dimension.name }}:</b> {{ dimension.measure }}
      </span>

      <v-img :src="data.fallbackImage.url"></v-img>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
export default {
  name: 'Dimensions',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped></style>
