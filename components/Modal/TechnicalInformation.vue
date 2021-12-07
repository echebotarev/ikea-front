<template>
  <v-row align="center" class="product-tech">
    <v-spacer></v-spacer>
    <v-col cols="10">
      <h2>{{ data.title }}</h2>
      <div class="product-tech-name">
        <div>
          <b>{{ data.productName }}</b>
        </div>
        <div>{{ data.productDescription }}</div>
      </div>
      <v-divider class="mt-8"></v-divider>

      <div v-for="prop in data.technicalInformation" :key="prop.name">
        <v-row class="product-tech-prop py-8">
          <v-col>
            <b>{{ prop.name }}</b>
          </v-col>
          <v-col>{{ prop.value }}</v-col>
        </v-row>

        <v-divider></v-divider>
      </div>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
export default {
  name: 'TechnicalInformation',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped></style>
