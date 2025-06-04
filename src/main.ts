import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import vuetify from './vuetify'

import router from './router'
import i18n from './i18n'
import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(vuetify)

app.mount('#app')

app.config.errorHandler = (err) => {
  console.error(err)
}
