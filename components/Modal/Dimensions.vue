<template>
  <v-row align="center" class="product-dimensions">
    <v-spacer></v-spacer>
    <v-col cols="10">
      <h2>{{ data.title }}</h2>

      <span
        v-for="(dimension, indexDimension) in data.dimensions"
        :key="`${indexDimension}-dimension`"
      >
        <b>{{ dimension.name }}:</b> {{ dimension.measure }}
      </span>

      <div v-if="data.images.length">
        <v-img
          v-for="(image, indexImg) in data.images"
          :key="`${indexImg}-image`"
          :src="getImage(image.url, 4)"
        ></v-img>
      </div>
      <v-img
        v-if="data.images.length === 0"
        :src="getImage(data.fallbackImage.url, 4)"
      ></v-img>

      <v-expansion-panels v-if="data.packaging" accordion flat>
        <!-- Упаковка -->
        <v-expansion-panel v-if="data.packaging" class="packaging">
          <v-expansion-panel-header>
            {{ data.packaging.title }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div :id="data.packaging.id">
              <div
                v-if="data.packaging.contentProps.totalNoOfPackagesText"
                class="font-weight-bold mb-5"
              >
                {{ data.packaging.contentProps.totalNoOfPackagesText }}
              </div>
              <div v-if="data.packaging.contentProps.packages">
                <div
                  v-for="(packageItem, indexPackage) in data.packaging
                    .contentProps.packages"
                  :key="`${indexPackage}-package`"
                  class="mb-10"
                >
                  <h4>{{ packageItem.name }}</h4>
                  <div>{{ packageItem.typeName }}</div>
                  <div v-if="packageItem.articleNumber" class="mb-5">
                    <div>{{ packageItem.articleNumber.label }}</div>
                    <span class="product-identifier">
                      {{ packageItem.articleNumber.value }}
                    </span>
                  </div>
                  <div v-if="packageItem.measurements">
                    <div
                      v-for="(
                        measurements, indexMeasurements
                      ) in packageItem.measurements"
                      :key="`${indexMeasurements}-measurements`"
                      class="mb-3"
                    >
                      <div
                        v-for="(measurement, indexMeasurement) in measurements"
                        :key="`${indexMeasurement}-measurement`"
                      >
                        <div>
                          <b>{{ measurement.label }}:</b>
                          {{ measurement.value }}
                        </div>
                      </div>
                      <div>
                        <b>{{ packageItem.quantity.label }}:</b>
                        {{ packageItem.quantity.value }}
                      </div>
                    </div>
                  </div>
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
import getImage from '~/assets/utils/getImage'
export default {
  name: 'Dimensions',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    getImage,
  },
}
</script>

<style scoped lang="scss">
.product-dimensions {
  span {
    display: block;
  }

  .packaging span {
    display: inline-block;
  }
}
</style>
