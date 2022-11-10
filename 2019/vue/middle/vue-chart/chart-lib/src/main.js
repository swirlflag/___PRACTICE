import Vue from 'vue';
import App from './App.vue';
import ChartPlugin from './plugins/ChartPlugin.js';

Vue.config.productionTip = false

//install chart.js
Vue.use(ChartPlugin);

new Vue({
  render: h => h(App),
}).$mount('#app')
