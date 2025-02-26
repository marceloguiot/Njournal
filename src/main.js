import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueApexCharts from "vue3-apexcharts"

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(VueApexCharts)
  .mount('#app')
