<template>
  <v-row>
    <v-spacer></v-spacer>
    <v-col cols="10">
      <h4>{{ data.title }}</h4>
      <v-card
        v-for="(option, indexOption) in data.options"
        :key="indexOption"
        outlined
      >
        <nuxt-link :to="`/product/${option.linkId}`">
          <v-row align="center">
            <v-col v-if="option.image" cols="2">
              <v-avatar>
                <v-img :src="getImage(option.image.url, 2)"></v-img>
              </v-avatar>
            </v-col>

            <v-col cols="7">
              <v-card-subtitle>{{ option.title }}</v-card-subtitle>
            </v-col>

            <v-col v-if="data.currentVariation.priceProps">{{
              getPriceDifference(data.currentVariation, option)
            }}</v-col>
          </v-row>
        </nuxt-link>
      </v-card>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import getImage from '@/assets/utils/getImage'
export default {
  name: 'Variations',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    ...mapActions({
      hideModal: 'page/hideModal',
    }),
    getImage,
    getPriceDifference(currentVariation, option) {
      if (currentVariation.linkId === option.linkId) {
        return ''
      }

      if (
        currentVariation.priceProps.priceNumeral >
        option.priceProps.priceNumeral
      ) {
        return `- ${
          currentVariation.priceProps.priceNumeral -
          option.priceProps.priceNumeral
        }`
      } else if (
        currentVariation.priceProps.priceNumeral <
        option.priceProps.priceNumeral
      ) {
        return `+ ${
          option.priceProps.priceNumeral -
          currentVariation.priceProps.priceNumeral
        }`
      } else {
        return ''
      }
    },
  },
}
</script>

<style scoped></style>
