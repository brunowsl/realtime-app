import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// @ts-ignore
import VueSSE from 'vue-sse';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueSSE)

app.mount('#app')
