<template>
  <div class="attention-button mb-5">
    <div class="attention-button-info mb-5">Товары в наличии со скидкой!</div>
    <div class="attention-button-action">Перейти</div>
  </div>
</template>

<script>
export default {
  name: 'AttentionButton',
}
</script>

<style scoped lang="scss">
.attention-button {
  background-color: #c7391a;
  padding: 7%;

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
