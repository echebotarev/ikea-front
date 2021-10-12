<template>
  <div :class="`attention-button mb-5 ${className}`">
    <div class="attention-button-info mb-5" v-html="text"></div>
    <nuxt-link v-if="hasButton" to="/sales">
      <div class="attention-button-action">Перейти</div>
    </nuxt-link>
  </div>
</template>

<script>
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
}
</script>

<style scoped lang="scss">
.attention-button {
  background-color: #c7391a;
  padding: 7%;
  z-index: 3;

  .attention-button-info {
    color: #fff;
    font-size: 1.35rem;
    font-weight: bold;
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
