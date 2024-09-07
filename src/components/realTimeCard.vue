<template>
    <v-app>
    <v-card
      class="mx-auto"
      max-width="368"
      variant="elevated"
      prepend-icon="mdi-currency-usd"
    >
      
        
        <template v-slot:title>
           <div><span class="font-weight-black text-wrap">Current Exchange Rate of BOA</span></div> 
          <v-icon
            class="me-1 pb-1"
            color="error"
          
            size="18"
          ></v-icon>
  
          <span class="text-caption">{{getCurrentDate}}</span>
        </template>
    
  
      <v-card-text class="py-0">
        <v-row >
          <v-col
            class="text-h5" style="color:#1C9BC1"
            cols="6"

          >
            {{ data.buying }}     
          </v-col>
  
          <v-col class=" text-h6" style="color:#BDD52D" cols="6">
            {{ data.selling }}
          </v-col>
        </v-row>
        <v-row class="pb-3 mt-0" v-if="data.selling">
        <v-col cols="6"
          >
         <v-chip size="small" color="#1C9BC1" variant="elevated">Buying</v-chip>
        </v-col>
  
        <v-col cols="6">
          <v-chip size="small" color="#BDD52D" variant="elevated">Selling</v-chip>
        </v-col>
    </v-row>
      <div v-else>
        <v-progress-circular
  color="light-green-darken-3"
  indeterminate
  :size="79"
  :width="9"
></v-progress-circular>
      </div>
      </v-card-text>
  
       
  
      
  
    
  
     
    </v-card>
</v-app>
  </template>



<script>
import * as cheerio from 'cheerio'



const boaRates = async ()=>{
    
  
     const res = await fetch("https://bad-gaylene-addis-05dd0974.koyeb.app/api")
     const data = await res.json()
     console.log(data)
     const buying = parseFloat(data.buying).toFixed(2)
     const selling = parseFloat(data.selling).toFixed(2)
     console.log(parseFloat(buying).toFixed(2))
   

    //  const data = await res.text()
    //  const $ = cheerio.load(data)
    //  const date = $('div.middle_content tr.row-1 th.column-1').text()
    //  console.log($('div.middle_content tr.row-1 th.column-1').text())
    //  const usd_buying = $('div.middle_content tbody.row-hover tr.row-4 td.column-2').text()
    //  const usd_selling = $('div.middle_content tbody.row-hover tr.row-4 td.column-3').text()
     const usd_obj ={'date':data.date,'buying':buying,'selling':selling}
     return usd_obj
   
}

export default {
    name: 'realTimeCardView',
    props:['bank'],
    data(){
        return {
           data:{}
        }
    },
    created(){
        boaRates().then((data)=>this.data=data).catch((err)=>console.log("error while parsing site "+ err.message))

    },
    mounted(){
       
    },
    computed:{
        getCurrentDate(){
        
          return new Date().toDateString();
  
        }
  
      },

}
</script>

<style>

</style>