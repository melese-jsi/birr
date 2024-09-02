<template>
    <v-app>
      
        <v-card
    class="mx-auto"
    prepend-icon="mdi-currency-usd"
     
   
  >
    <template v-slot:title>
      <span class="font-weight-black text-wrap">Recent USD exchange rates of CBE</span>
      
    </template>

    <v-card-text class="bg-surface-light pt-4 text-wrap">
       
    </v-card-text>
    <v-timeline align="start" density="compact">
        <v-timeline-item
          v-for="message in data"
          :key="message.date"
          :dot-color="red"
          :icon="message.icon"
          size="xsmall"
          hide-dot=true
        >
        
          <div class="mb-4">
            <strong class="pa-2">{{ message.date }}</strong>
           
            <v-divider></v-divider>
            
            <div><span class="text-primary pa-3">Buying</span> &mdash; <span class="chip">{{ message.buying }} </span>
              <br/>
              <span class="text-primary pa-3">Selling </span>&mdash;<span class="chip1" > {{ message.selling }}</span>
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card>
        
    </v-app>
</template>

<script>
const httpdata = async ()=>{
    console.log("heyyy")
    
    const response = await fetch("https://banksethiopia.com/wp-json/graph/v1/all?bankName=cbe&dateRange=ThisMonth")
   
    
    const data_thismonth = await response.json()
    const response2 = await fetch("https://banksethiopia.com/wp-json/graph/v1/all?bankName=cbe&dateRange=LastMonth")
    const data_lastmonth = await response2.json()

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
            console.log(thismonth_dates)
        
        for(let i=0;i<=thismonth_dates.length; i++)
        {
            
            
            let temp ={}
            temp['date']=thismonth_dates[i]
            temp['buying']=thismonth_usd_buying[i]
            temp['selling']=thismonth_usd_selling[i]
            usd_data.push(temp)
        }

    }
     
    console.log(usd_data)

  return usd_data
}

export default {

    name: "cbecardView",
    props:['data'],
    data() {
    return { thismonth: [] ,
        lastmonth:[]
    };
  },
  mounted() {
    httpdata()
      .then((result1) => {
        this.thismonth = result1;
        //this.lastmonth = result2;
      })
      .catch((err) => console.log("error " + err.message));
  }
}
</script>

        
      