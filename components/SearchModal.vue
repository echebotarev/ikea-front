<template>
  <portal v-if="isShow && modalData.type === 'search'" to="modal">
    <div class="modal-substrate" @click="hideModal">
      <v-row class="modal" no-gutters @click.stop="">
        <v-spacer></v-spacer>
        <v-col cols="11">
          <v-row>
            <v-col cols="1">
              <v-btn class="top-indent" icon @click="hideModal">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>

            <v-col cols="11">
              <v-text-field
                clearable
                autofocus
                placeholder="Что вы ищете?"
                append-icon="mdi-arrow-right"
                @input="setValue"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="11">
              <v-list>
                <v-list-item
                  v-for="(completion, index) in universal"
                  :key="index"
                >
                  <!-- <Искать> -->
                  <v-list-item-icon v-if="completion.label === 'Искать'">
                    <v-icon>mdi-magnify</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content v-if="completion.label === 'Искать'">
                    <span @click="hideModal">
                      <nuxt-link
                        :to="`/search/?q=${completion.completion.text}`"
                      >
                        <v-list-item-title
                          v-text="completion.completion.text"
                        ></v-list-item-title>
                      </nuxt-link>
                    </span>
                  </v-list-item-content>
                  <!-- /<Искать> -->

                  <!-- <Категория> -->
                  <v-list-item-icon v-if="completion.label === 'Категория'">
                    <v-icon>mdi-apps</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content
                    v-if="completion.label === 'Категория'"
                    two-line
                  >
                    <span @click="hideModal">
                      <nuxt-link :to="`/category/${completion.category.key}`">
                        <v-list-item-title
                          v-text="completion.category.name"
                        ></v-list-item-title>
                      </nuxt-link>
                    </span>

                    <v-list-item-subtitle
                      v-text="'Категория'"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                  <!-- </Категория> -->

                  <!-- <Товар> -->
                  <v-list-item-icon v-if="completion.label === 'Товар'">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content
                    v-if="completion.label === 'Товар'"
                    two-line
                  >
                    <span @click="hideModal">
                      <nuxt-link :to="`/product/${completion.product.id}`">
                        <v-list-item-title
                          v-text="completion.product.name"
                        ></v-list-item-title>
                      </nuxt-link>
                    </span>

                    <v-list-item-subtitle
                      v-text="completion.product.typeName"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                  <!-- </Товар> -->
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </div>
  </portal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'SearchModal',
  computed: mapState({
    isShow: (state) => state.page.modal.isShow,
    modalData: (state) => state.page.modal.data,
    universal: (state) =>
      state.search.data && state.search.data.universal
        ? state.search.data.universal.filter(
            (item) =>
              item.label === 'Искать' ||
              item.label === 'Товар' ||
              item.label === 'Категория'
          )
        : [],
  }),
  methods: mapActions({
    hideModal: 'page/hideModal',
    setValue: 'search/setValue',
  }),
}
</script>

<style scoped lang="scss">
.modal {
  background: #fff;

  .top-indent {
    margin-top: 16px;
  }
}
</style>
