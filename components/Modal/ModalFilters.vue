<template>
  <v-row>
    <v-spacer></v-spacer>
    <v-col cols="10" class="pb-15">
      <v-expansion-panels v-model="openPanels" accordion flat multiple>
        <!-- Сортировка -->
        <v-expansion-panel v-if="data.sortOrders">
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col>Сортировать</v-col>
              <v-col class="text--secondary current-filters">
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
          :disabled="!filter.enabled"
        >
          <v-expansion-panel-header
            :expand-icon="
              filter.type === 'BOOLEAN'
                ? filter.selected
                  ? 'mdi-checkbox-marked'
                  : 'mdi-checkbox-blank-outline'
                : 'mdi-chevron-down'
            "
            :disable-icon-rotate="filter.type === 'BOOLEAN'"
            @click="
              filter.type === 'BOOLEAN' ? toggleFilter(filter.parameter) : ''
            "
          >
            <v-row no-gutters>
              <v-col>{{ filter.name }}</v-col>
              <v-col class="text--secondary current-filters">
                {{ getSelectedNames(filter) }}
              </v-col>
            </v-row>
          </v-expansion-panel-header>

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

      <v-row
        :class="`fixed-buttons ${
          $vuetify.breakpoint.mobile ? 'mobile' : 'desktop'
        }`"
      >
        <v-col cols="6">
          <v-btn
            rounded
            elevation="0"
            width="100%"
            class="button-black"
            @click="cleanFilters"
          >
            Очистить фильтры
          </v-btn>
        </v-col>

        <v-col cols="6">
          <v-btn
            rounded
            elevation="0"
            width="100%"
            class="button-black"
            @click="hideModal"
          >
            Смотреть {{ productCount }}
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
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
        WIDTH: 'Ширина',
        HEIGHT: 'Высота',
        LENGTH: 'Длина',
        DEPTH: 'Глубина',
      },
    }
  },

  computed: {
    ...mapState({
      filters: (state) => state.filters.filters,
      productCount: (state) => state.products.productCount,

      currentSortFromState: (state) =>
        state.filters.sortOrders.find((item) => item.selected),
      openPanelsFromState: (state) => state.filters.openPanels,
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

    openPanels: {
      get() {
        return this.openPanelsFromState
      },
      set(openPanels) {
        this.setOpenPanels(openPanels)
      },
    },
  },

  methods: {
    ...mapActions({
      setOpenPanels: 'filters/setOpenPanels',
      hideModal: 'page/hideModal',
    }),

    prepareSortData(data) {
      return data
        .filter((item) => item.id !== 'MOST_POPULAR')
        .map((item) => {
          const name = this.dictName[item.id] || item.name
          return Object.assign({}, item, { name })
        })
    },

    async setCurrentSort(value) {
      await this.$router.push({ query: { ...this.$route.query, sort: value } })
    },

    async cleanFilters() {
      // проверяем есть ли установленные фильтры
      // если вызвать $router.replace, когда query уже null, вылетает ошибка
      if (Object.keys(this.$router.currentRoute.query).length) {
        await this.$router.replace({ query: null })
      }
    },

    getSelectedNames(filter) {
      if (filter.type === 'CLASS_FILTER') {
        return filter.values.reduce(
          (acc, value) =>
            value.selected ? `${acc}${acc ? ',' : ''} ${value.name}` : acc,
          ''
        )
      } else if (filter.type === 'TYPED_CLASS_FILTER') {
        let result = ''
        filter.types.map(
          (type) =>
            (result = type.values.reduce(
              (acc, value) =>
                value.selected ? `${acc}${acc ? ',' : ''} ${value.name}` : acc,
              result
            ))
        )
        return result
      }

      return ''
    },

    toggleFilter(parameter) {
      // eslint-disable-next-line no-useless-call
      return this.$toggleFilters.call(this, parameter, 'true')
    },

    getFiltersData,
  },
}
</script>

<style scoped lang="scss">
.current-filters {
  font-weight: 400;
}
.fixed-buttons {
  position: fixed;
  z-index: 10000;
  bottom: 20px;

  &.mobile {
    width: 80%;
  }

  &.desktop {
    width: 42%;
  }
}
</style>
