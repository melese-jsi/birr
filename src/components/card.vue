<template>
    <v-app>
        <v-card
      class="mx-auto"
      prepend-icon="mdi-currency-usd"
       
      
    >
     
      <template v-slot:title><div class="wrap" v-if="!bank">

        <span class="font-weight-black text-wrap">{{currency}} exchange rates of banks</span>
        <br/><span class="text-caption"> {{ getCurrentDate }}</span>
      </div>
      <div class="wrap" v-else>
        <span class="font-weight-black text-wrap">Recent USD exchange rates of {{bank}}</span>
      </div> 

      </template>
  
      <v-card-text class="bg-surface-light pt-4">
       
        
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
              <!-- <v-icon size="x-large" ><v-img :src="message.prependAvatar"></v-img></v-icon>--><strong class="pa-2">{{ message.title }}</strong>
               
              <v-divider></v-divider>
              
              <div><span class="text-primary pa-3">Buying</span> &mdash; <span class="chip">{{ message.buying }} </span>
                <br/>
                <span class="text-primary pa-3">Selling </span>&mdash;<span class="chip1" > {{ message.selling }}</span>
              </div>
            </div>
          </v-timeline-item>
        </v-timeline>
     
        
    </v-card-text>
  
    </v-card>
      
    </v-app>
  </template>
  
  <script lang="js">
  
  
  
  export default {
      name: 'cardView',
      props:['data','currency','bank'],
      computed:{
        getCurrentDate(){
          //let path ="https://banksethiopia.com/wp-content/themes/banksaffiliate/assets/svgs/dbe.png"
          //return path

          return new Date().toDateString();
  
        }
  
      },
      data(){
          return {
            
             };
      },
      mounted(){
   
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
  