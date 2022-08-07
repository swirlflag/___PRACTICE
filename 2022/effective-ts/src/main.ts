import * as Vue from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index.ts";

const VM = Vue.createApp(App);

VM.use(router);
VM.mount("#app");