<template>

  <div id="app">
    <img src="./assets/logo.png">
    <!-- <router-view></router-view> -->
    <login-form></login-form>
  </div>

</template>

<script>

import LoginForm from './components/LoginForm.vue'
import myFirstComponent from './compornents/myFirstComponent.vue'

export default {
  name: 'App',
  components : {
    'login-form' : LoginForm
  },
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
