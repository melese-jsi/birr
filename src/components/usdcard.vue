<template>
  <v-app>
    <div>
      <v-card
    class="mx-auto"
    prepend-icon="mdi-currency-usd"
     
    width="450"
  >
    <template v-slot:title>
      <span class="font-weight-black">USD exchange rates</span>
      <br/><span class="text-caption"> {{ date }}</span>
    </template>

    <v-card-text class="bg-surface-light pt-4">
      <v-table height="450px" fixed-header>
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
      </v-table>
    </v-card-text>
  </v-card>
    </div>
  </v-app>
</template>

<script lang="js">

const httpdata = async ()=>{
    const response = await fetch("https://api.addissoftware.com/banks-ethiopia/api/exchanges/cardData")
    if (response.status !==200) {
      throw Error("No data found")
    }
    //console.log(response)
    const data = await response.json()

    //console.log(data)
    let usd_data=data.filter((item)=>Object.keys(item).includes('USD'))[0]

    // for(let obj of data)
    // {

    //    if(obj&& Object.keys(obj).includes('USD')){
    //      usd_data=obj['USD'];
    //      break;
    //    }
    // }

    return usd_data['USD'];

}

export default {
    name: 'usdcardView',
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

<style></style>
