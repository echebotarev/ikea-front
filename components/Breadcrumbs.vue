<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon>{{ mdiChevronRight }}</v-icon>
      </template>
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :to="item.href" :disabled="item.disabled" nuxt>
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>

    <v-divider light class="mb-6"></v-divider>
  </div>
</template>

<script>
import { mdiChevronRight } from '@mdi/js'

export default {
  name: 'Breadcrumbs',
  props: {
    breadcrumbs: { type: Array, default: () => [] },
  },
  data() {
    return { mdiChevronRight }
  },
}
</script>

<style scoped>
.v-breadcrumbs {
  padding: 18px 0 10px;
}
</style>
