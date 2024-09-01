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
                <!-- <span class="font-weight-bold">more</span> -->
                <v-icon icon="mdi-dots-vertical" size="x-large" color='#6200EA'></v-icon>
                

                <!-- <v-icon icon="mdi-menu-down" end></v-icon> -->
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
          
          <cardView :data="obj['usd']" currency="USD" ></cardView>  
        </v-tabs-window-item>

        <v-tabs-window-item value="eur">
          <cardView :data="obj['eur']" currency="EUR" ></cardView>  
        </v-tabs-window-item>

        <v-tabs-window-item value="gbp">
          <cardView :data="obj['gbp']" currency="GBP" ></cardView>  
        </v-tabs-window-item>
        <v-tabs-window-item value="boa">
          <boacardView></boacardView>  
        </v-tabs-window-item>
        <v-tabs-window-item value="cbe">
          <cbecardView></cbecardView>
        </v-tabs-window-item>

      </v-tabs-window>
    </v-card-text>
  </v-card>

      
    </v-main>
  </v-app>
</template>

<script>

const formatted_data = (data,currency)=>{
    let lists =[]
    
    for(let x=0; x<=data.length;x++)
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
export default {
  name: "App",
  components:{
    cardView,
    boacardView,
    cbecardView
  },

  data: () => ({
    tab:'usd',
    obj:{}
  }),
  methods: {
      addItem (item) {
        
        this.$nextTick(() => { this.tab = item })
      },
    },
    mounted(){
      httpdata().then(
      (obj)=>{
       this.obj=obj
      }
    ).catch((err)=>console.log("error "+err.message))
    }
};
</script>
