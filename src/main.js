import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import VueTelegram from 'vue-tg'
import "vuetify/styles";
import { createVuetify } from "vuetify";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/dist/vuetify.min.css";
//import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
const vuetify = createVuetify({
  components,
  directives,
});
import WebApp from "@twa-dev/sdk";
WebApp.ready();

createApp(App).use(router).use(vuetify).mount("#app");
