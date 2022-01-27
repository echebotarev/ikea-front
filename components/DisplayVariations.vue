<template>
  <div>
    <v-row class="variationStyle-variations">
      <v-col>
        <a
          @click="
            showModal(
              Object.assign({}, variationStyle, {
                type: 'info',
                currentVariation: currentVariation(variationStyle.allOptions),
              })
            )
          "
        >
          <v-banner single-line>
            {{ variationStyle.title }}

            <v-subheader>{{ subtitle }}</v-subheader>

            <template v-slot:actions>
              <v-btn icon>
                <v-icon>{{ mdiChevronRight }}</v-icon>
              </v-btn>
            </template>
          </v-banner>
        </a>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="productVariant in variationStyle.options"
        :key="productVariant.linkId"
        cols="3"
      >
        <nuxt-link :to="`/product/${productVariant.linkId}`">
          <v-img
            :src="getImage(productVariant.image.url, 2)"
            lazy-src="/images/placeholder.png"
            :class="`selectable ${productVariant.isSelected ? 'selected' : ''}`"
            aspect-ratio="1"
            @mouseover="mouseOver(productVariant.title)"
            @mouseleave="mouseLeave()"
          ></v-img>
        </nuxt-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import { mdiChevronRight } from '@mdi/js'

import getImage from '@/assets/utils/getImage'

export default {
  name: 'DisplayVariations',
  props: {
    variationStyle: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return { mdiChevronRight }
  },
  computed: mapState({
    subtitle: (state) => state.displayVariations.subtitle,
  }),
  mounted() {
    this.setSubtitle(this.variationStyle.selectedOption)
  },
  methods: {
    ...mapActions({
      showModal: 'page/showModal',
      setSubtitle: 'displayVariations/setSubtitle',
    }),
    currentVariation(options) {
      return options.find((option) => option.isSelected)
    },
    mouseOver(subtitle) {
      this.setSubtitle(subtitle)
    },
    mouseLeave() {
      this.setSubtitle(this.variationStyle.selectedOption)
    },
    getImage,
  },
}
</script>

<style scoped lang="scss">
.selectable {
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  transition: border-color 0.2s ease-in-out;

  &:hover {
    border-color: #929292;
  }

  &.selected {
    border-color: #111;
    border-width: 2px;

    &:hover {
      border-color: #929292;
    }
  }
}
</style>
