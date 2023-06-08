import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {markRaw} from "vue";
import App from './App.vue'
import router from './router'
import { type Router } from "vue-router";

declare module 'pinia' {
    export interface PiniaCustomProperties {
        router: Router
    }
}

const app = createApp(App)
const pinia = createPinia()
pinia.use(({ store }) => { store.router = markRaw(router) });

app.use(pinia)
app.use(router)
app.mount('#app')
