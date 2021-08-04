<template>
  <video
    height="100%"
    :src="src"
    autoplay
    playsinline
    muted
    class="video"
  ></video>
</template>

<script>
export default {
  name: 'VideoPlayer',
  props: {
    src: {
      type: String,
      default: () => '',
    },
    poster: {
      type: String,
      default: () => '',
    },
  },
}
</script>

<style scoped></style>
