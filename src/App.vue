<template>
  <v-app>
     <v-main> 

  <v-card class="mx-auto">
 
    
   


    <v-card-text class="text-center">
      <v-tabs
      
      v-model="tab"
      
       align-tabs="title"
      color="deep-purple-accent-4"
      stacked
      
      show-arrows
      
    >
    <!-- <v-tab value="test">
        <v-icon icon="mdi-bank" color="#F3AD14"></v-icon>
        test</v-tab> -->

    <v-tab value="boa_now" max-width="40" min-width="40">
        <v-icon icon="mdi-bank" color="#F3AD14" size="small"></v-icon>
        BOA</v-tab>
        <v-tab value="cbe_now" max-width="40" min-width="40">
          <v-icon icon="mdi-bank" color="#8C3087" size="small"></v-icon>
          CBE
        </v-tab>
        <v-tab value="others" max-width="40" min-width="40">
          <v-icon icon="mdi-shopping" color="#1C9BC1" size="small"> </v-icon>
          Others
        </v-tab>


      <!-- <v-tab value="usd">
        <v-icon icon="mdi-currency-usd"></v-icon>
        USD
      </v-tab>
      <v-tab value="eur">
        <v-icon icon="mdi-currency-eur"></v-icon>
        EUR
      </v-tab>
      <v-tab value="gbp">
        <v-icon icon="mdi-currency-gbp"></v-icon>
        GBP</v-tab> -->
       
        
        <v-menu><template v-slot:activator="{ props }">
               <v-btn
                class="align-self-center"
                height="100%"
                rounded="0"
                variant="text"
                v-bind="props"
                prepend-icon="mdi-history"
                stacked
                v-icon="mdi-menu-down"
                density="compact"
                
              >
              <template v-slot:prepend>
                     <v-icon color="success"></v-icon>
               </template>
                
                <!-- <v-icon icon="mdi-dots-vertical" size="x-large" color='#6200EA'></v-icon> -->
                

                <span class="h6-text">Previous Rates</span>
               </v-btn> 
            </template>
            <v-list class="bg-grey-lighten-3" min-width="20px">
              <v-list-item @click="addItem('boa')">BOA</v-list-item>
              <v-list-item @click="addItem('cbe')">CBE</v-list-item>
            </v-list>

          </v-menu>
          <!-- <v-tab value="usd" @click="refresh"> <v-icon icon="mdi-refresh"></v-icon></v-tab> -->
          
    </v-tabs>
    <divider></divider>
    
      
      <v-tabs-window v-model="tab">

        <!-- <v-tabs-window-item value="test">
          <card2View :data="obj" currency="USD" icon="mdi-currency-usd"></card2View>
        </v-tabs-window-item> -->

        <v-tabs-window-item value="boa_now">
          <realTimeCardView bank="BOA" ></realTimeCardView>  
        </v-tabs-window-item>
        <v-tabs-window-item value="cbe_now">
          <realTimeCardView bank="CBE" ></realTimeCardView>  
        </v-tabs-window-item>
        <v-tabs-window-item value="others">
          <othersView :data="obj"></othersView>  
        </v-tabs-window-item>

        <!-- <v-tabs-window-item value="usd">
          
          <cardView :data="obj['usd']" currency="USD" icon="mdi-currency-usd" ></cardView>  
        </v-tabs-window-item>

        <v-tabs-window-item value="eur">
          <cardView :data="obj['eur']" currency="EUR" icon="mdi-currency-eur" ></cardView>  
        </v-tabs-window-item>

        <v-tabs-window-item value="gbp">
          <cardView :data="obj['gbp']" currency="GBP" icon="mdi-currency-gbp" ></cardView>  
        </v-tabs-window-item>-->
        <v-tabs-window-item value="boa">
          
          <card2View :data="boa_data" bank="BOA" history="true"></card2View>  
        </v-tabs-window-item>
        <v-tabs-window-item value="cbe">
          <card2View :data="cbe_data" bank="CBE" history="true"></card2View>
        </v-tabs-window-item> 
        
        

      </v-tabs-window>
    </v-card-text>
  </v-card>

      
  </v-main> 
  </v-app>
</template>

<script>
//prepare boa and cbe history data
const format_boa_cbe_history_data = (thismonth)=>{
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
            console.log(thismonth_dates)
        
        for(let i=0;i<thismonth_dates.length; i++)
        {
            
            
            let temp ={}
            temp['title']=thismonth_dates[i]
            temp['buying']=thismonth_usd_buying[i]
            temp['selling']=thismonth_usd_selling[i]
            usd_data.push(temp)
        }

    }
   
    return usd_data
}

//fetch boa last month and this month data
const boa_cbe_data = async (bank)=>{
    
    
    const response = await fetch("https://banksethiopia.com/wp-json/graph/v1/all?bankName="+bank+"&dateRange=ThisMonth")
   
    
    const data_thismonth = await response.json()
   
    const response2 = await fetch("https://banksethiopia.com/wp-json/graph/v1/all?bankName="+bank+"&dateRange=LastMonth")
    const data_lastmonth = await response2.json()

    //format data for presentation
    let thismonth = data_thismonth[0]
    let lastmonth = data_lastmonth[0]
  
  let data = format_boa_cbe_history_data(thismonth)
  data= data.concat(format_boa_cbe_history_data(lastmonth))
  console.log("---merged data ---")
  console.log(data)
  return data
}


const formatted_data = (data,currency)=>{
    let lists =[]
    
    for(let x=0; x<data.length;x++)
    {
      let obj = data[x]
      
     const temp = {'currency':currency}
     if (obj !=undefined){
      temp.title=obj['bank'].charAt(0).toUpperCase() + obj['bank'].slice(1)
      temp.buying=obj['buying'].toFixed(2)
      temp.selling=obj['selling'].toFixed(2)
      temp.subtitle = `<span class="text-primary pa-3">Buying</span> &mdash; <span class="chip"> `+obj['buying'].toFixed(2)+` </span><br/><br/> <span class="text-primary pa-3">Selling </span>&mdash;<span class="chip1"> `+obj['selling'].toFixed(2)+`</span>`
      //temp.prependAvatar= logos[obj['bank']]
      temp.icon ="<v-icon='home'></v-icon>"
      lists.push(temp)
      //lists.push({ type: 'divider', inset: true })
     }
     
    }
    return lists
}


const httpdata = async ()=>{
  
  const response = await fetch("https://api.addissoftware.com/banks-ethiopia/api/exchanges/cardData")
  if (response.status !==200) {
    throw Error("No data found")
  }
  //console.log(response)
  const data = await response.json()
  console.log("from app vue")
  console.log(data)
  /console.log(data)
    let usd_data=data.filter((item)=>Object.keys(item).includes('USD'))[0]
    let eur_data=data.filter((item)=>Object.keys(item).includes('EUR'))[0]
    let gbp_data=data.filter((item)=>Object.keys(item).includes('GBP'))[0]
    usd_data = formatted_data(usd_data['USD'],"USD")
    console.log("from app")
    console.log(usd_data)
    eur_data = formatted_data(eur_data['EUR'],"EUR")
    gbp_data = formatted_data(gbp_data['GBP'],"GBP")

    return {'usd':usd_data, 'eur':eur_data,'gbp':gbp_data}
   
}


import boacardView from '@/components/boacard.vue'
import cbecardView from '@/components/cbecard.vue'
import cardView from '@/components/card.vue'
import realTimeCardView from './components/realTimeCard.vue'
import card2View from './components/card2.vue'
import othersView from './components/others.vue'
export default {
  name: "App",
  components:{
    cardView,
    boacardView,
    cbecardView,
    realTimeCardView,
    card2View,
    othersView

},

  data: () => ({
    tab:'boa_now',
    obj:{},
    boa_data :[],
    cbe_data:[]
  }),
  methods: {
      addItem (item) {
        
        this.$nextTick(() => { this.tab = item })
      },
      refresh (){
        console.log("--refreshed")
        httpdata().then(
      (obj)=>{
       this.obj=obj
      }
    ).catch((err)=>console.log("error "+err.message))
    
    boa_cbe_data('abyssinia').then((data)=>{this.boa_data=data}).catch((err)=>console.log("error "+err.message))
    boa_cbe_data('cbe').then((data)=>{this.cbe_data=data}).catch((err)=>console.log("error "+err.message))

      }
    },
    mounted(){
      httpdata().then(
      (obj)=>{
       this.obj=obj
      }
    ).catch((err)=>console.log("error "+err.message))
    
    boa_cbe_data('abyssinia').then((data)=>{this.boa_data=data}).catch((err)=>console.log("error "+err.message))
    boa_cbe_data('cbe').then((data)=>{this.cbe_data=data}).catch((err)=>console.log("error "+err.message))

    }
};
</script>
