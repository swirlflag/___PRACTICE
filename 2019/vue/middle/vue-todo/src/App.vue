<template>
  <div id="app">
    <todo-header></todo-header>
    <todo-input></todo-input>
    <todo-list></todo-list>
    <todo-footer></todo-footer>
    <modal></modal>
  </div>
</template>

<script>

import TodoHeader from './components/Todoheader.vue';
import TodoInput  from './components/TodoInput.vue';
import TodoList   from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';
import Modal from './components/common/Modal.vue';

import { mapGetters,mapState,mapMutations,mapActions } from 'vuex';

export default {

  components : {
    'todo-header' : TodoHeader,
    'todo-input' : TodoInput,
    'todo-list' : TodoList,
    'todo-footer' : TodoFooter,
    'modal' : Modal,
  },

}// ~ export 

</script>

<style>

body{
  text-align: center;
  font-family: 'Ubuntu', sans-serif;
  background-color: #f6f6f6;
}
input{
  border-style: groove;
  width : 200px;
}
button{
  border-style: groove;
}
.shadow{
  box-shadow: 5px 10px 10px rgba(0,0,0,0.03);
}
.fas.fa-times{
  cursor: pointer;
}

</style>
