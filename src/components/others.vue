<template>
    <v-app>
        <v-card class="pa-4 mx-auto">
          <v-card-text class="text-center">
            <v-tabs align-tabs="center"
            v-model="tab" stacked  slider-color="red" show-arrows >
                <v-tab value="usd">
                 <v-icon icon="mdi-currency-usd" color="#1C9BC1"></v-icon>
                     USD
                 </v-tab>
                <v-tab value="eur">
                    <v-icon icon="mdi-currency-eur" color="#BDD52D"></v-icon>
                    EUR
                </v-tab>
                <v-tab value="gbp" >
                    <v-icon icon="mdi-currency-gbp" color="#8C3087"></v-icon>
                    GBP
                </v-tab>

            </v-tabs>
            <v-tabs-window v-model="tab">
             <v-tabs-window-item value="usd"> 
                <v-card flat>
                    <v-card-text>
                       
                        <card2View :data="data['usd']" currency="USD" icon="mdi-currency-usd"></card2View>
                    </v-card-text>
                </v-card>

             </v-tabs-window-item>
             <v-tabs-window-item value="eur"> 
                <v-card flat>
                    <v-card-text><card2View :data="data['eur']" currency="EUR" icon="mdi-currency-eur"></card2View></v-card-text>
                </v-card>

             </v-tabs-window-item>
             <v-tabs-window-item value="gbp"> 
                <v-card flat>
                    <v-card-text><card2View :data="data['gbp']" currency="GBP" icon="mdi-currency-gbp"></card2View></v-card-text>
                </v-card>

             </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>


        </v-card>

    </v-app>
  
</template>

<script>
import card2View from './card2.vue'
export default {
    props:['data'],
    components:{
        card2View
    },

    name:"othersView",
    data(){
       return {
        tab:"usd"
       } 
    }

}
</script>

<style>

</style>