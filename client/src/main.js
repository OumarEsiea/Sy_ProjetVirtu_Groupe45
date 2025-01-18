import { createApp } from 'vue'
import App from './App.vue'
import router  from './API_CALL/routes'


const app = createApp(App)
app.use(router)
app.mount('#app')
