<template>
  <v-row>
    <v-spacer></v-spacer>
    <v-col cols="10">
      <v-expansion-panels accordion flat>
        <!-- Сортировка -->
        <v-expansion-panel v-if="data.sortOrders">
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col>Сортировать</v-col>
              <v-col class="text--secondary current-sort">
                {{ dictName[currentSort] }}
              </v-col>
            </v-row>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-radio-group v-model="currentSort" @change="setCurrentSort">
              <v-radio
                v-for="value in prepareSortData(data.sortOrders)"
                :key="value.id"
                class="radio-sort"
                color="rgb(0,0,0)"
                :label="value.name"
                :value="value.id"
              ></v-radio>
            </v-radio-group>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'InfoFilters',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dictName: {
        RELEVANCE: 'Популярность',
        PRICE_LOW_TO_HIGH: 'Цена: от низкой до высокой',
        PRICE_HIGH_TO_LOW: 'Цена: от высокой до низкой',
        NAME_ASCENDING: 'По алфавиту: от А до Я',
      },
    }
  },
  computed: {
    ...mapState({
      currentSortFromState: (state) =>
        state.filters.sortOrders.find((item) => item.selected),
      categoryId: (state) => state.category.category.identifier,
    }),
    currentSort: {
      get() {
        return this.currentSortFromState.id
      },
      set(newName) {
        return newName
      },
    },
  },
  methods: {
    prepareSortData(data) {
      return data
        .filter((item) => item.id !== 'MOST_POPULAR')
        .map((item) =>
          Object.assign({}, item, { name: this.dictName[item.id] })
        )
    },
    async setCurrentSort(value) {
      await this.$router.push({ query: { page: 1, sort: value } })
    },
  },
}
</script>

<style scoped lang="scss">
.current-sort {
  font-weight: 400;
}
.radio-sort {
  flex-direction: row-reverse;
}
</style>
