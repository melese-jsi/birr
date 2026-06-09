<template>
    <v-app>
    <v-card
      class="mx-auto"
      
      variant="elevated"
      prepend-icon="mdi-currency-usd"
    >
      
        
        <template v-slot:title>
           <div><span class="font-weight-medium text-wrap text-h6">Current exchange rate of {{bank}}</span></div> 
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
            class="text-h6" style="color:#1C9BC1"
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

const cbeRates = async ()=>{
   //const res = await fetch("https://bad-gaylene-addis-05dd0974.koyeb.app/api/cbe")

   // const res = await fetch("http://196.189.92.13/api/cbe")
    // const data = await res.json()
    // console.log(data)
    // const buying = parseFloat(data[0].buying).toFixed(2)
     //const selling = parseFloat(data[0].selling).toFixed(2)
   //  console.log(parseFloat(buying[0]).toFixed(2))
    // const usd_obj ={'date':data.date,'buying':buying,'selling':selling}
   //  return usd_obj


     console.log("heyyy")
    
    const response = await fetch("https://banksethiopia.com/wp-json/graph/v1/all?bankName=cbe&dateRange=ThisMonth")
   
    
    const data_thismonth = await response.json()
    

    //format data for presentation
    let thismonth = data_thismonth[0]
    let usd_data =[]
    if (thismonth)
    {
        let thismonth_usd_buying = thismonth['USD']['buying']
        
        let thismonth_usd_selling = thismonth['USD']['selling']
        let thismonth_dates = thismonth['categories']
        //reverse them
        thismonth_usd_buying.reverse()
            thismonth_usd_selling.reverse()
            thismonth_dates.reverse()
            //console.log(thismonth_dates)
        
        for(let i=0;i<1; i++)
        {
            
            
            let temp ={}
            temp['date']=thismonth_dates[i]
            temp['buying']=thismonth_usd_buying[i]
            temp['selling']=thismonth_usd_selling[i]
            usd_data.push(temp)
        }

    }
     
    console.log(usd_data)
    const buying = parseFloat(usd_data[0].buying).toFixed(2)
     const selling = parseFloat(usd_data[0].selling).toFixed(2)
   console.log(parseFloat(buying[0]).toFixed(2))
    const usd_obj ={'date':usd_data[0].date,'buying':buying,'selling':selling}
    console.log(usd_obj)
   return usd_obj

  //return usd_data
}


const boaRates = async ()=>{
    
  
     const res = await fetch("https://bad-gaylene-addis-05dd0974.koyeb.app/api/")
   
     const data = await res.json()
     console.log(data)
     const buying = parseFloat(data.buying).toFixed(2)
     const selling = parseFloat(data.selling).toFixed(2)
     console.log(parseFloat(buying).toFixed(2))
     const usd_obj ={'buying':buying,'selling':selling}
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
        if (this.bank ==="BOA"){
          boaRates().then((data)=>this.data=data).catch((err)=>console.log("error while parsing site "+ err.message))
        }
        else if(this.bank ==="CBE"){
            cbeRates().then((data)=>this.data=data).catch((err)=>console.log("error while fetching data from cbe site "+ err.message))  
        }
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
