<template>
  <v-app>
    <v-main>

  <v-card>
    <v-tabs
      v-model="tab"
      
       align-tabs="center"
      color="deep-purple-accent-4"
      stacked
      text-wrap
    >
      <v-tab value="usd">
        <v-icon icon="mdi-currency-usd"></v-icon>
        USD
      </v-tab>
      <v-tab value="eur">
        <v-icon icon="mdi-currency-eur"></v-icon>
        EUR
      </v-tab>
      <v-tab value="gbp">
        <v-icon icon="mdi-currency-gbp"></v-icon>
        GBP</v-tab>
        <v-menu><template v-slot:activator="{ props }">
              <v-btn
                class="align-self-center me-4"
                height="100%"
                rounded="0"
                variant="plain"
                v-bind="props"
              >
                <span class="font-weight-bold">more</span>

                <v-icon icon="mdi-menu-down" end></v-icon>
              </v-btn>
            </template>
            <v-list class="bg-grey-lighten-3" min-width="20px">
              <v-list-item @click="addItem('boa')">BOA</v-list-item>
              <v-list-item @click="addItem('cbe')">CBE</v-list-item>
            </v-list>

          </v-menu>
    </v-tabs>


    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="usd">
          <usdcardView></usdcardView>
        </v-tabs-window-item>

        <v-tabs-window-item value="eur">
          <eurcardView></eurcardView>
        </v-tabs-window-item>

        <v-tabs-window-item value="gbp">
          <gbpcardView></gbpcardView>
        </v-tabs-window-item>
        <v-tabs-window-item value="boa">
          <boacardView></boacardView>  
        </v-tabs-window-item>
        <v-tabs-window-item value="cbe">
          <eurcardView></eurcardView>
        </v-tabs-window-item>

      </v-tabs-window>
    </v-card-text>
  </v-card>

      
    </v-main>
  </v-app>
</template>

<script>

import usdcardView from  '@/components/usdcard.vue'
import eurcardView from '@/components/eurcard.vue'
import gbpcardView from '@/components/gbpcard.vue'
import boacardView from '@/components/boacard.vue'
export default {
  name: "App",
  components:{
    usdcardView,
    eurcardView,
    gbpcardView,
    boacardView
  },

  data: () => ({
    tab:'usd'
  }),
  methods: {
      addItem (item) {
        
        this.$nextTick(() => { this.tab = item })
      },
    }
};
</script>
