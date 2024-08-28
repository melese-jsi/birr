<template>
  <v-app>
    <div>
      <v-card
    class="mx-auto"
    prepend-icon="mdi-currency-usd"
     
    width="450"
  >
    <template v-slot:title>
      <span class="font-weight-black">USD exchange rates of banks</span>
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
            <td class="font-weight-medium">{{ res.bank.charAt(0).toUpperCase()+ res.bank.slice(1)}}
             
            
            </td>
            <td>{{ res.buying.toFixed(2) }}</td>
            <td>{{ res.selling.toFixed(2) }}</td>
          </tr>
        </tbody>
      </v-table> -->
      <v-timeline align="start" density="compact">
        <v-timeline-item
          v-for="message in result"
          :key="message.title"
          :dot-color="red"
          :icon="message.prependAvatar"
          size="x-small"
        >
          <div class="mb-4">
            <div class="font-weight-normal">
              <strong>{{ message.title }}</strong>
            </div>

            <div><span class="text-primary pa-3">Buying</span> &mdash; <span class="chip">{{ message.buying }} </span>
              <br/>
              <span class="text-primary pa-3">Selling </span>&mdash;<span class="chip1"> {{ message.selling }}</span>
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
   
      
  </v-card-text>
  </v-card>
    </div>
  </v-app>
</template>

<script lang="js">
import logos from './logos.json'
console.log(logos['abay'])



const httpdata = async ()=>{
  
    const response = await fetch("https://api.addissoftware.com/banks-ethiopia/api/exchanges/cardData")
    if (response.status !==200) {
      throw Error("No data found")
    }
    //console.log(response)
    const data = await response.json()

    //console.log(data)
    let usd_data=data.filter((item)=>Object.keys(item).includes('USD'))[0]
    //console.log(usd_data["USD"].length)
    let lists =[]
    for(let x=0; x<=usd_data['USD'].length;x++)
    {
      let obj = usd_data['USD'][x]
      console.log(obj)
     const temp = {}
     if (obj !=undefined){
      temp.title=obj['bank'].charAt(0).toUpperCase() + obj['bank'].slice(1)
      temp.buying=obj['buying'].toFixed(2)
      temp.selling=obj['selling'].toFixed(2)
      temp.subtitle = `<span class="text-primary pa-3">Buying</span> &mdash; <span class="chip"> `+obj['buying'].toFixed(2)+` </span><br/><br/> <span class="text-primary pa-3">Selling </span>&mdash;<span class="chip1"> `+obj['selling'].toFixed(2)+`</span>`
      temp.prependAvatar= logos[obj['bank']]
      lists.push(temp)
      //lists.push({ type: 'divider', inset: true })
     }

     
      // temp.subtitle= d['buying']
     
    }
    console.log(lists)
    

    return lists;

}



export default {
    name: 'usdcardView',
    computed:{
      getBankLogo(){
        let path ="https://banksethiopia.com/wp-content/themes/banksaffiliate/assets/svgs/dbe.png"
        return path

      }

    },
    data(){
        return {result:[],
          date:new Date().toDateString(),
          items: [
        { type: 'subheader', title: 'Today' },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: `<span class="text-primary">Buying</span> &mdash; <span class="chip">109 </span><br/> <span class="text-primary">Selling </span>&mdash;<span class="chip1">109 </span>`,
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ',
          subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ]

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
.v-img__img{
  size:17px;
  height: 17px;
}
</style>
