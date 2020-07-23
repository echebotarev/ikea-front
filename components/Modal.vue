<template>
  <portal v-if="isShow" to="modal">
    <div class="modal-substrate" @click="toggleModal">
      <v-row no-gutters align="center">
        <v-col class="modal" cols="5" @click.stop="">
          <v-row v-if="data.eventLabel === 'pip_details'" align="center">
            <v-spacer></v-spacer>
            <v-col v-if="data.productDescriptionProps" cols="9">
              <h2>{{ data.title }}</h2>
              <p
                v-for="(paragraph, index) in data.productDescriptionProps
                  .paragraphs"
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
                  v-for="(accordionItem, index) in accordion"
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
                        <div
                          v-if="
                            accordionItem.id === 'product-details-packaging'
                          "
                        >
                          <p>
                            <span class="product-detail-header">{{
                              block.name
                            }}</span>
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
        </v-col>
      </v-row>
    </div>
  </portal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Modal',
  computed: mapState({
    isShow: (state) => state.page.modal.isShow,
    data: (state) => state.page.modal.data,
    accordion: (state) => {
      const acc = state.page.modal.data.accordionObject
      const out = []
      for (const key in acc) {
        const item = acc[key]
        if (item) {
          out.push(item)
        }
      }
      return out
    },
  }),
  methods: mapActions({
    toggleModal: 'page/toggleModal',
  }),
}
</script>

<style scoped lang="scss">
.modal-substrate {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.15);

  .modal {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background: rgba(255, 255, 255, 1);
  }
}
</style>
