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
                class="radio"
                color="rgb(0,0,0)"
                :label="value.name"
                :value="value.id"
              ></v-radio>
            </v-radio-group>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel
          v-for="filter in getFiltersData(filters)"
          :key="filter.id"
        >
          <v-expansion-panel-header>{{ filter.name }}</v-expansion-panel-header>

          <div
            v-if="
              filter.type === 'CLASS_FILTER' || filter.type === 'CATEGORY_TREE'
            "
          >
            <v-expansion-panel-content>
              <FilterRadioGroup
                :values="filter.values || filter.categories"
                :parameter="filter.parameter"
              />
            </v-expansion-panel-content>
          </div>

          <div v-if="filter.type === 'TYPED_CLASS_FILTER'">
            <v-expansion-panel-content>
              <div v-for="(type, index) in filter.types" :key="index">
                <h3>{{ type.name }}</h3>
                <FilterRadioGroup
                  :values="type.values"
                  :parameter="filter.parameter"
                />
              </div>
            </v-expansion-panel-content>
          </div>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import getFiltersData from 'assets/utils/getFiltersData'
import FilterRadioGroup from '@/components/Modal/FilterRadioGroup'

export default {
  name: 'Filters',
  components: { FilterRadioGroup },
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
      filters: (state) => state.filters.filters,

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
      await this.$router.push({ query: { ...this.$route.query, sort: value } })
    },

    getFiltersData,
  },
}
</script>

<style scoped lang="scss">
.current-sort {
  font-weight: 400;
}
</style>
