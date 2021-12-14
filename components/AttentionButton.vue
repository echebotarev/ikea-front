<template>
  <div v-if="isShow" :class="`attention-button mb-5 ${className}`">
    <div class="attention-button-close" @click="close">
      <v-icon color="#fff">{{ mdiClose }}</v-icon>
    </div>
    <div class="attention-button-info mb-5" v-html="text"></div>
    <nuxt-link v-if="hasButton" to="/sales">
      <div class="attention-button-action">Перейти</div>
    </nuxt-link>
  </div>
</template>

<script>
import { mdiClose } from '@mdi/js'

export default {
  name: 'AttentionButton',
  props: {
    text: {
      type: String,
      default: () => 'Товары в наличии со скидкой!',
    },
    hasButton: {
      type: Boolean,
      default: () => true,
    },
    className: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      mdiClose,
      isShow: true,
    }
  },
  methods: {
    close() {
      this.isShow = false
    },
  },
}
</script>

<style scoped lang="scss">
.attention-button {
  background-color: #c7391a;
  padding: 7%;
  z-index: 3;

  &.success {
    background-color: #3ba133;
    padding-top: 2%;
    padding-bottom: 2%;
  }

  .attention-button-close {
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
  }

  .attention-button-info {
    color: #fff;
    font-size: 1.35rem;
    font-weight: bold;
    padding-top: 20px;
  }

  .attention-button-action {
    display: inline-block;
    padding: 8px 20px;
    border-radius: 30px;
    background: #000;
    color: #fff;
  }
}
</style>
