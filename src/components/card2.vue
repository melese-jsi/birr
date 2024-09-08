<template>
  <v-app>
  <v-card class="mx-auto" >
    <v-card-title class="wrap">
      <v-icon :icon="icon" color="#1C9BC1"></v-icon>
        <span class="font-weight-black text-wrap">Current exchange rates of banks</span>
       
    </v-card-title>
    <v-card-subtitle>{{getCurrentDate}}</v-card-subtitle>

    <v-vard-text>
      <v-list density="compact">
    <v-list-item v-for="item in data" :key="item.title">
 <v-card variant="outlined" class="mt-3 mb-3 rounded-lg" elevation="24" density="compact" rounded="24" >
  <v-card-title>{{ item.title }}</v-card-title>
  <!-- <v-card-subtitle>{{ new Date().toDateString() }}</v-card-subtitle> -->
  <v-divider class="mt-1 mb-2"></v-divider>
  <v-card-text class="py-0">
        <v-row >
          <v-col
            class="text-h5" style="color:#1C9BC1"
            cols="6"

          >
           {{ item.buying }}
          </v-col>
  
          <v-col class=" text-h6" style="color:#BDD52D" cols="6">
            {{item.selling}}
          </v-col>
        </v-row>
        <v-row class="pb-3 mt-0" >
        <v-col cols="6"
          >
         <v-chip size="small" color="#1C9BC1" variant="elevated">Buying</v-chip>
        </v-col>
  
        <v-col cols="6">
          <v-chip size="small" color="#BDD52D" variant="elevated">Selling</v-chip>
        </v-col>
    </v-row>
    </v-card-text>
 </v-card>
    </v-list-item>
  </v-list>

    </v-vard-text>

  </v-card>
</v-app>
 
</template>

<script>
export default {
  props:['data','currency','bank','icon'],

    name:"card2View",
    computed:{
        getCurrentDate(){
       

          return new Date().toDateString();
  
        }
  
      },
}
</script>

<style type="text/css">
.rounded-card {
      border-radius: 24px;
  }

</style>