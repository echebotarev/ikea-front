<template>
  <v-radio-group v-model="appliedFilters" multiple>
    <v-radio
      v-for="value in values"
      :key="`${value.id || value.key}}`"
      class="radio"
      color="rgb(0,0,0)"
      :label="value.name"
      :value="value.id || value.key"
      :disabled="value.count === 0"
      @click="() => toggleFilters(parameter, value.id || value.key)"
    ></v-radio>
  </v-radio-group>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FilterRadioGroup',
  props: {
    parameter: {
      type: String,
      default: () => '',
    },
    values: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    ...mapState({
      appliedFiltersFromState: (state) => state.filters.appliedFilters,
    }),

    appliedFilters: {
      get() {
        return this.appliedFiltersFromState
      },
      set(newFilter) {
        return newFilter
      },
    },
  },

  methods: {
    async toggleFilters(parameter, value) {
      // сделано так, потому что по другому не достучаться до this
      // eslint-disable-next-line no-useless-call
      await this.$toggleFilters.call(this, parameter, value)
    },
  },
}
</script>

<style scoped lang="scss">
.radio {
  flex-direction: row-reverse;
  text-transform: capitalize;
}
</style>
