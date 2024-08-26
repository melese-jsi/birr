<template>
  <v-app>
    <v-main>

  <v-card>
    <v-tabs
      v-model="tab"
      
       align-tabs="center"
      color="deep-purple-accent-4"
      stacked
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
export default {
  name: "App",
  components:{
    usdcardView,
    eurcardView,
    gbpcardView
  },

  data: () => ({
    tab:null
  }),
};
</script>
