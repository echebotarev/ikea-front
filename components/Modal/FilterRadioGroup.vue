<template>
  <v-radio-group v-model="currentFilters" multiple>
    <v-radio
      v-for="value in values"
      :key="value.id"
      class="radio"
      color="rgb(0,0,0)"
      :label="value.name"
      :value="value.id"
      @click="() => toggleFilters(parameter, value.id)"
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
      appliedFilters: (state) => state.filters.appliedFilters,
    }),

    currentFilters: {
      get() {
        return this.appliedFilters
      },
      set(newFilter) {
        return newFilter
      },
    },
  },

  methods: {
    async toggleFilters(parameter, value) {
      let values = []
      const filter = this.$route.query[parameter]
      if (!filter) {
        return await this.setFilter(parameter, [value])
      }

      values = filter.split(',')
      if (values.includes(value)) {
        values = values.filter((id) => id !== value)
      } else {
        values.push(value)
      }

      return await this.setFilter(parameter, values)
    },

    async setFilter(parameter, values) {
      if (values.length === 0) {
        const { query } = this.$route
        delete query[parameter]

        // TODO: опасная реализаци, но пока не представляю как делать иначе
        // По другому страница не обновляется
        await this.$router.replace({ query: null })
        return await this.$router.replace({ query })
      }

      return await this.$router.push({
        query: {
          ...this.$route.query,
          [parameter]: values.toString(),
          page: 1,
        },
      })
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
