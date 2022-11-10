import Vue from 'vue'
import App from './App.vue'
import myFirstGlobalComponent from './myFirstGlobalComponent.vue'
import './style.css'

//
// console.log(Vue)
// console.log(App)
// window.a = App;
console.log(myFirstGlobalComponent)

Vue.component('my-first-global-component',myFirstGlobalComponent);

new Vue({
  el: '#app',
  render: h => h(App),

  created : function(){
    // alert('#App created! ');
  },

})
