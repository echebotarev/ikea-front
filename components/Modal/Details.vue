<template>
  <v-row align="center">
    <v-spacer></v-spacer>
    <v-col v-if="data.productDescriptionProps" cols="10">
      <h2>{{ data.title }}</h2>
      <p
        v-for="(paragraph, index) in data.productDescriptionProps.paragraphs"
        :key="index"
      >
        {{ paragraph }}
      </p>
      <p>
        <b>{{ data.productDescriptionProps.designerLabel }}: </b>
        {{ data.productDescriptionProps.designerName }}
      </p>

      <v-expansion-panels v-if="data.accordionObject" accordion flat>
        <v-expansion-panel
          v-for="(accordionItem, index) in accordion(data.accordionObject)"
          :id="accordionItem.id"
          :key="index"
        >
          <v-expansion-panel-header>{{
            accordionItem.title
          }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div
              v-for="(blocks, name) in accordionItem.contentProps"
              :key="name"
            >
              <div
                v-for="(block, indexBlocks) in blocks"
                :key="`${indexBlocks}-blocks`"
              >
                <!--Используется в "Материалы и уход"-->
                <p
                  v-for="(material, indexMaterial) in block.materials"
                  :key="`${indexMaterial}-material`"
                >
                  {{ material.material }}
                </p>

                <!--Используется всеми-->
                <p
                  v-for="(text, indexText) in block.texts"
                  :key="`${indexText}-text`"
                >
                  {{ text }}
                </p>

                <!--Используется в "Информация об упаковке"-->
                <div v-if="accordionItem.id === 'product-details-packaging'">
                  <p>
                    <span class="product-detail-header">{{ block.name }}</span>
                    <span>{{ block.typeName }}</span>
                    <span
                      v-if="block.articleNumber"
                      class="product-detail-identifier"
                      >{{ block.articleNumber.label }}:
                      {{ block.articleNumber.value }}</span
                    >
                  </p>

                  <p
                    v-for="(measurement,
                    indexMeasurement) in block.measurements"
                    :key="`${indexMeasurement}-measurement`"
                  >
                    <span
                      v-for="(measurementValue,
                      indexMeasurementValue) in measurement"
                      :key="`${indexMeasurementValue}-measurement-value`"
                    >
                      {{ measurementValue.label }}:
                      {{ measurementValue.value }}
                    </span>
                  </p>
                  <span v-if="block.quantity">
                    {{ block.quantity.label }}:
                    {{ block.quantity.value }}
                  </span>
                </div>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
export default {
  name: 'Details',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    accordion: (accObject) => {
      const acc = accObject
      const out = []
      for (const key in acc) {
        const item = acc[key]
        if (item) {
          out.push(item)
        }
      }
      return out
    },
  },
}
</script>

<style scoped></style>
