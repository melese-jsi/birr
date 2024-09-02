<template>
    <v-app>
      
        <v-card
    class="mx-auto"
    prepend-icon="mdi-currency-usd"
     
   
  >
    <template v-slot:title>
      <span class="font-weight-black text-wrap">Recent USD exchange rates of {{bank}}</span>
      
    </template>

    <v-card-text class="bg-surface-light pt-4 text-wrap">
     
    </v-card-text>
    <v-timeline align="start" density="compact">
        <v-timeline-item
          v-for="message in data"
          :key="message.title"
          :dot-color="red"
          :icon="message.icon"
          size="xsmall"
          hide-dot=true
        >
        
          <div class="mb-4">
            <strong class="pa-2">{{ message.title }}</strong>
           
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


export default {
    name: "boacardView",
    props:['data','bank'],
    data() {
    
  },
  mounted() {
   
  }
}
</script>

        
      