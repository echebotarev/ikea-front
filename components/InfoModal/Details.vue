<template>
  <v-row align="center">
    <v-spacer></v-spacer>
    <v-col v-if="data.productDescriptionProps" cols="10">
      <h2>{{ data.title }}</h2>
      <div
        class="product-details-content"
        :style="
          isOpenDetails === false &&
          data.productDescriptionProps.paragraphs.length > 1
            ? 'height: 156px;'
            : ''
        "
      >
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
      </div>

      <a
        v-if="data.productDescriptionProps.paragraphs.length > 1"
        @click="toggleDetails(!isOpenDetails)"
        >{{ isOpenDetails ? 'Скрыть' : 'Читать далее' }}</a
      >

      <!-- Материалы и уход -->
      <v-expansion-panels v-if="data.accordionObject" accordion flat>
        <v-expansion-panel v-if="data.accordionObject.materialsAndCare">
          <v-expansion-panel-header>
            {{ data.accordionObject.materialsAndCare.title }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div :id="data.accordionObject.materialsAndCare.id">
              <div
                v-if="
                  data.accordionObject.materialsAndCare.contentProps.materials
                "
              >
                <div
                  v-for="(materials, indexMaterials) in data.accordionObject
                    .materialsAndCare.contentProps.materials"
                  :key="`${indexMaterials}-materials`"
                >
                  <div v-if="materials.materials">
                    <p
                      v-for="(material, indexMaterial) in materials.materials"
                      :key="`${indexMaterial}-material`"
                    >
                      <span v-if="material.part"
                        ><b>{{ material.part }}</b></span
                      >
                      <span v-if="material.material">{{
                        material.material
                      }}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div
                v-if="
                  data.accordionObject.materialsAndCare.contentProps
                    .careInstructions
                "
              >
                <div
                  v-for="(instruction, indexInstruction) in data.accordionObject
                    .materialsAndCare.contentProps.careInstructions"
                  :key="`${indexInstruction}-instruction`"
                >
                  <div v-if="instruction.texts">
                    <p
                      v-for="(text, indexInstructionText) in instruction.texts"
                      :key="`${indexInstructionText}-instruction-text`"
                    >
                      {{ text }}
                    </p>
                  </div>
                </div>
              </div>

              <div
                v-if="
                  data.accordionObject.materialsAndCare.contentProps
                    .proposition65
                "
              ></div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- Упаковка -->
        <v-expansion-panel v-if="data.accordionObject.packaging">
          <v-expansion-panel-header>
            {{ data.accordionObject.packaging.title }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div :id="data.accordionObject.packaging.id">
              <div
                v-if="
                  data.accordionObject.packaging.contentProps
                    .totalNoOfPackagesText
                "
              >
                {{
                  data.accordionObject.packaging.contentProps
                    .totalNoOfPackagesText
                }}
              </div>
              <div v-if="data.accordionObject.packaging.contentProps.packages">
                <div
                  v-for="(packageItem, indexPackage) in data.accordionObject
                    .packaging.contentProps.packages"
                  :key="`${indexPackage}-package`"
                >
                  <h4>{{ packageItem.name }}</h4>
                  <div>{{ packageItem.typeName }}</div>
                  <div v-if="packageItem.articleNumber">
                    <div>{{ packageItem.articleNumber.label }}</div>
                    <span class="product-identifier">
                      {{ packageItem.articleNumber.value }}
                    </span>
                  </div>
                  <div v-if="packageItem.measurements">
                    <div
                      v-for="(measurements,
                      indexMeasurements) in packageItem.measurements"
                      :key="`${indexMeasurements}-measurements`"
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

        <!-- Документы -->
        <v-expansion-panel v-if="data.accordionObject.assemblyAndDocuments">
          <v-expansion-panel-header>{{
            data.accordionObject.assemblyAndDocuments.title
          }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div :id="data.accordionObject.assemblyAndDocuments.id">
              <div
                v-if="
                  data.accordionObject.assemblyAndDocuments.contentProps
                    .attachments.assembly.attachments.length
                "
              >
                <div>
                  {{
                    data.accordionObject.assemblyAndDocuments.contentProps
                      .attachments.assembly.header
                  }}
                </div>
                <div
                  v-for="(attachment, indexAttachment) in attachments(
                    data.accordionObject.assemblyAndDocuments.contentProps
                      .attachments.assembly.attachments
                  )"
                  :key="`${indexAttachment}-attachment`"
                >
                  <a :href="attachment.url" target="_blank">
                    <span>{{ attachment.label }}</span>
                    <span>{{ attachment.id }}</span>
                  </a>
                </div>
              </div>

              <div
                v-if="
                  data.accordionObject.assemblyAndDocuments.contentProps
                    .attachments.software.attachments.length
                "
              >
                <div>
                  {{
                    data.accordionObject.assemblyAndDocuments.contentProps
                      .attachments.software.header
                  }}
                </div>
                <div
                  v-for="(attachment, indexAttachment) in attachments(
                    data.accordionObject.assemblyAndDocuments.contentProps
                      .attachments.software.attachments
                  )"
                  :key="`${indexAttachment}-attachment`"
                >
                  <a :href="attachment.url" target="_blank">
                    <span>{{ attachment.label }}</span>
                    <span>{{ attachment.id }}</span>
                  </a>
                </div>
              </div>

              <div
                v-if="
                  data.accordionObject.assemblyAndDocuments.contentProps
                    .attachments.other.attachments.length
                "
              >
                <div>
                  {{
                    data.accordionObject.assemblyAndDocuments.contentProps
                      .attachments.other.header
                  }}
                </div>
                <div
                  v-for="(attachment, indexAttachment) in attachments(
                    data.accordionObject.assemblyAndDocuments.contentProps
                      .attachments.other.attachments
                  )"
                  :key="`${indexAttachment}-attachment`"
                >
                  <a :href="attachment.url" target="_blank">
                    <span>{{ attachment.label }}</span>
                    <span>{{ attachment.id }}</span>
                  </a>
                </div>
              </div>

              <div
                v-if="
                  data.accordionObject.assemblyAndDocuments.contentProps
                    .attachments.disassembly.attachments.length
                "
              >
                <div>
                  {{
                    data.accordionObject.assemblyAndDocuments.contentProps
                      .attachments.disassembly.header
                  }}
                </div>
                <div
                  v-for="(attachment, indexAttachment) in attachments(
                    data.accordionObject.assemblyAndDocuments.contentProps
                      .attachments.disassembly.attachments
                  )"
                  :key="`${indexAttachment}-attachment`"
                >
                  <a :href="attachment.url" target="_blank">
                    <span>{{ attachment.label }}</span>
                    <span>{{ attachment.id }}</span>
                  </a>
                </div>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- Экологическая информация -->
        <v-expansion-panel
          v-if="data.accordionObject.sustainabilityAndEnvironment"
        >
          <v-expansion-panel-header>{{
            data.accordionObject.sustainabilityAndEnvironment.title
          }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div
              v-if="
                data.accordionObject.sustainabilityAndEnvironment.contentProps
              "
            >
              <div
                v-if="
                  data.accordionObject.sustainabilityAndEnvironment.contentProps
                    .environmentalData
                "
              >
                <div
                  v-for="(environmentalData, indexEnvironmentalData) in data
                    .accordionObject.sustainabilityAndEnvironment.contentProps
                    .environmentalData"
                  :key="indexEnvironmentalData"
                >
                  <div v-if="environmentalData.texts">
                    <p
                      v-for="(text, indexText) in environmentalData.texts"
                      :key="indexText"
                    >
                      {{ text }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- Экологическая информация -->
      </v-expansion-panels>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Details',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    isOpenDetails: {
      type: Boolean,
      default: () => false,
    },
  },
  methods: {
    ...mapActions({
      toggleDetails: 'page/toggleDetails',
    }),
    attachments: (atts) => {
      const ids = []
      return atts.filter((att) => {
        if (ids.includes(att.id)) {
          return false
        }

        ids.push(att.id)
        return true
      })
    },
  },
}
</script>

<style scoped>
a {
  display: inline-block;
  font-size: 14px;
  text-decoration: underline;
  margin-bottom: 1.875rem;
}
</style>
