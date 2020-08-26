<template>
  <v-row>
    <v-spacer></v-spacer>
    <v-col cols="10">
      <v-expansion-panels accordion flat>
        <!-- Сортировка -->
        <v-expansion-panel v-if="data.sortOrders.name">
          <v-expansion-panel-header>
            Сортировать
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-row
              v-for="value in prepareSortData(data.sortOrders.values)"
              :key="value.id"
            >
              <v-col>{{ value.name }}</v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
export default {
  name: 'InfoFilters',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    prepareSortData(data) {
      const dictName = {
        RELEVANCE: 'Популярность',
        PRICE_LOW_TO_HIGH: 'Цена: от низкой до высокой',
        PRICE_HIGH_TO_LOW: 'Цена: от высокой до низкой',
        NAME_ASCENDING: 'По алфавиту: от А до Я',
      }

      return data
        .filter((item) => item.id !== 'MOST_POPULAR')
        .map((item) => Object.assign({}, item, { name: dictName[item.id] }))
    },
  },
}
</script>

<style scoped></style>
