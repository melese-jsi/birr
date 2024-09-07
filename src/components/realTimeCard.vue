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
        <v-row align="center" no-gutters>
          <v-col
            class="text-h5 text-light-green-darken-3"
            cols="6"
          >
            {{ data.buying }}
          </v-col>
  
          <v-col class="text-right text-h6 text-orange-darken-4" cols="6">
            {{ data.selling }}
          </v-col>
        </v-row>
      </v-card-text>
  
       <div class="d-flex py-3 justify-space-between">
        <v-list-item
          density="compact"
          
        >
          <v-list-item-subtitle><v-chip color="light-green-darken-3" variant="elevated">Buying</v-chip></v-list-item-subtitle>
        </v-list-item>
  
        <v-list-item
          
        >
          <v-list-item-subtitle><v-chip color="orange-darken-4" variant="elevated">Selling</v-chip></v-list-item-subtitle>
        </v-list-item>
      </div>
  
      
  
    
  
     
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
    mounted(){
        boaRates().then((data)=>this.data=data).catch((err)=>console.log("error while parsing site "+ err.message))

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