<template>
  <v-row class="modal-product-variations">
    <v-spacer></v-spacer>
    <v-col cols="10">
      <h2>{{ data.title }}</h2>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
// import { mapActions } from 'vuex'
import Price from '@/components/Price'
import getImage from '@/assets/utils/getImage'

export default {
  name: 'ModalSuggestion',
  // eslint-disable-next-line vue/no-unused-components
  components: { Price },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: { getImage },
}
</script>

<style scoped></style>
