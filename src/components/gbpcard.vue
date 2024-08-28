<template>
    <v-app>
      <div>
        <v-card
    class="mx-auto"
    prepend-icon="mdi-currency-gbp"
     
    width="450"
  >
    <template v-slot:title>
      <span class="font-weight-black">GBP exchange rates of banks</span>
      <br/><span class="text-caption"> {{ date }}</span>
    </template>

    <v-card-text class="bg-surface-light pt-4">
        <!-- <v-table height="450px" fixed-header>
          <thead>
            <tr>
              <th class="font-weight-bold">Bank</th>
              <th class="font-weight-bold">Buying</th>
              <th class="font-weight-bold">Selling</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="res in result" v-bind:key="res">
                
              <td class="font-weight-medium">{{ res.bank.charAt(0).toUpperCase()+ res.bank.slice(1)}}</td>
              <td>{{ res.buying.toFixed(2) }}</td>
              <td>{{ res.selling.toFixed(2) }}</td>
            </tr>
          </tbody>
        </v-table> -->
        <v-list
      :items="result"
      lines="three"
      item-props
    >
      <template v-slot:subtitle="{ subtitle }">
        <div v-html="subtitle"></div>
      </template>
    </v-list>
        </v-card-text>
        </v-card>
      </div>
    </v-app>
  </template>
  
  <script lang="js">
    import logos from './logos.json'
    
  const httpdata = async ()=>{
      const response = await fetch("https://api.addissoftware.com/banks-ethiopia/api/exchanges/cardData")
      if (response.status !==200) {
        throw Error("No data found")
      }
      //console.log(response)
      const data = await response.json()
  
      //console.log(data)
      let usd_data=data.filter((item)=>Object.keys(item).includes('GBP'))[0]
  
      let lists =[]
    for(let x=0; x<=usd_data['GBP'].length;x++)
    {
      let obj = usd_data['GBP'][x]
      console.log(obj)
     const temp = {}
     if (obj !=undefined){
      temp.title=obj['bank'].charAt(0).toUpperCase() + obj['bank'].slice(1)
      temp.subtitle = `<span class="text-primary pa-3">Buying</span> &mdash; <span class="chip"> `+obj['buying'].toFixed(2)+` </span><br/><br/> <span class="text-primary pa-3">Selling </span>&mdash;<span class="chip1"> `+obj['selling'].toFixed(2)+`</span>`
      temp.prependAvatar=logos[obj['bank']]
      lists.push(temp)
      lists.push({ type: 'divider', inset: true })
     }

     
      // temp.subtitle= d['buying']
     
    }
    console.log(lists)

    // for(let obj of data)
    // {

    //    if(obj&& Object.keys(obj).includes('USD')){
    //      usd_data=obj['USD'];
    //      break;
    //    }
    // }

    return lists;
  
  }
  
  export default {
      name: 'gbpcardView',
      data(){
          return {result:[],
            date:new Date().toDateString()
          };
      },
      mounted(){
      httpdata().then(
        (result)=>{
         this.result=result
        }
      ).catch((err)=>console.log("error "+err.message))
    }
  
      }
  </script>
  
  <style>

.chip {
  display: inline-block;
  padding: 0 25px;
  height: 20px;
  font-size: 16px;
  line-height: 20px;
  border-radius: 25px;
  background-color:lightsteelblue;
}
.chip1 {
  display: inline-block;
  padding: 0 25px;
  height: 17px;
  font-size: 14px;
  line-height: 17px;
  border-radius: 25px;
  background-color:lightgray;
}
</style>
  