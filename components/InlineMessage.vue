<template>
  <v-card class="mt-5">
    <v-row no-gutters>
      <v-col cols="auto" class="pt-4 pl-4">
        <v-icon :class="`icon ${message.class}`">{{
          getIcon(message.class)
        }}</v-icon>
      </v-col>
      <v-col>
        <v-card-subtitle
          v-if="message.title"
          class="text-weight-600 inline-msg-subtitle pl-2 pb-2"
        >
          {{ message.title }}
        </v-card-subtitle>

        <v-card-text class="inline-msg-text pl-2">
          {{ message.body || message.text }}<br />
          <a
            v-if="message.link && message.link !== 'javascript:void(0)'"
            :href="message.link"
            :target="message.link.includes('pdf') ? 'blanc' : ''"
            class="inline-msg-link"
          >
            {{ message.link_text }}
          </a>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'InlineMessage',
  props: {
    message: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    getIcon(type) {
      if (type.includes('cautionary')) {
        return 'mdi-alert-outline'
      } else if (type.includes('informative')) {
        return 'mdi-information-outline'
      } else if (type.includes('positive')) {
        return 'mdi-check-circle-outline'
      }
    },
  },
}
</script>

<style scoped lang="scss">
.inline-msg-subtitle,
.inline-msg-text {
  color: #111 !important;
}
.inline-msg-link {
  text-decoration: underline;
}
.icon {
  &.range-revamp-inline-message--cautionary {
    color: #ffa524;
  }

  &.range-revamp-inline-message--informative {
    color: #0058a3;
  }

  &.range-revamp-inline-message--positive {
    color: #0a8a00;
  }
}
</style>
