<template>
    <v-app>
        
        <v-card 
      class="mx-auto"
      
         >
        
     
      <template v-slot:title><div class="wrap">

        <span class="font-weight-black text-wrap">Latest Exchange Rate of BOA</span>
        <br/><span class="text-caption"> {{ data.date }}</span>
      </div>
    </template>
    </v-card>
    </v-app>
</template>

<script>
import * as cheerio from 'cheerio'



const boaRates = async ()=>{
    
  
     const res = await fetch("https://www.bankofabyssinia.com/exchange-rate-2")
     const data = await res.text()
     const $ = cheerio.load(data)
     const date = $('div.middle_content tr.row-1 th.column-1').text()
     console.log($('div.middle_content tr.row-1 th.column-1').text())
     const usd_buying = $('div.middle_content tbody.row-hover tr.row-4 td.column-2').text()
     const usd_selling = $('div.middle_content tbody.row-hover tr.row-4 td.column-3').text()
     const usd_obj ={'date':date,'buying':usd_buying,'selling':usd_selling}
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
        boaRates().then((data)=>this.data).catch((err)=>console.log("error while parsing site "+ err.message))

    }

}
</script>

<style>

</style>