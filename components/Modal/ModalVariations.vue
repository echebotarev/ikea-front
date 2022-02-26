<template>
  <v-row class="modal-product-variations">
    <v-spacer></v-spacer>
    <v-col cols="10">
      <h2>{{ data.title }}</h2>
      <v-card
        v-for="option in data.allOptions ? data.allOptions : data.options"
        :key="option.linkId"
        outlined
        hover
        :class="`mb-5${option.isSelected ? ' selected' : ''}`"
      >
        <nuxt-link :to="`/product/${option.linkId}`">
          <v-row align="center" class="pl-3 pr-3">
            <v-col v-if="option.image" cols="2">
              <v-avatar>
                <v-img :src="getImage(option.image.url, 2)"></v-img>
              </v-avatar>
            </v-col>

            <v-col cols="6">
              <v-card-subtitle>{{ option.title }}</v-card-subtitle>
            </v-col>

            <v-col
              v-if="getPriceDifference(data.currentVariation, option).price"
              cols="auto"
              class="text-right"
            >
              <v-card-subtitle>{{
                getPriceDifference(data.currentVariation, option).text
              }}</v-card-subtitle>
              <!--<Price
                :price="getPriceDifference(data.currentVariation, option).price"
                :prepend="
                  getPriceDifference(data.currentVariation, option).sign
                "
                :without-label="true"
                class="light"
              />-->
            </v-col>
          </v-row>
        </nuxt-link>
      </v-card>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
// import Price from '@/components/Price'
import getImage from '@/assets/utils/getImage'

export default {
  name: 'Variations',
  // components: { Price },
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
      if (!currentVariation.priceProps || !option.priceProps) {
        return ''
      }

      if (currentVariation.linkId === option.linkId) {
        return ''
      }

      if (
        currentVariation.priceProps.priceNumeral >
        option.priceProps.priceNumeral
      ) {
        return {
          sign: '-',
          price:
            currentVariation.priceProps.priceNumeral -
            option.priceProps.priceNumeral,
          text: 'Дешевле',
        }
      } else if (
        currentVariation.priceProps.priceNumeral <
        option.priceProps.priceNumeral
      ) {
        return {
          sign: '+',
          price:
            option.priceProps.priceNumeral -
            currentVariation.priceProps.priceNumeral,
          text: 'Дороже',
        }
      } else {
        return {}
      }
    },
  },
}
</script>

<style scoped lang="scss">
.v-card {
  &.selected {
    border: 2px solid #0058a3;
  }
}
</style>
