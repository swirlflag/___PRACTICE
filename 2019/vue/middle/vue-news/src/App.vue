<template>
  <div id="app">

    <tool-bar></tool-bar>

    <spinner :loading="loadingStatus"></spinner>

    <!-- <transition name="page"> -->
      <router-view></router-view>
    <!-- </transition> -->

  </div>
</template>

<script>

import ToolBar from './components/ToolBar.vue';
import Spinner from './components/Spinner.vue';
import bus from './utils/bus.js'

export default {

  components :{
    'tool-bar' : ToolBar,
    'spinner' : Spinner,
  },

  methods : {
    startSpinner(){
      this.loadingStatus = true;
    },
    endSpinner(){
      this.loadingStatus = false;
    },
  },

  data(){
    return {
      loadingStatus : false,
    };
  },

  created(){
    bus.$on('start:spinner',this.startSpinner);
    bus.$on('end:spinner',this.endSpinner);
  },

  beforeDestroy(){
    bus.$off('start:spinner',this.startSpinner);
    bus.$off('end:spinner',this.endSpinner);
  },
  
};

</script>

<style>

body{
  padding: 0;
  margin: 0;
}
a{
  text-decoration: none;
  color: #34495e;
}
a:hover{
  color: #42b883;
  text-decoration: underline;
}
a.router-link-exact-active{
  text-decoration: underline;
}

.page-enter-active, .page-leave-active {
  /* transition: opacity .5s; */
  transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);
}
.page-enter, .page-leave-to {
  opacity: 0;
  
  /* margin-left : 100%; */
}

</style>
