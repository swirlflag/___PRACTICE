<template>
  <div class="my-first-component">
    <p>{{ msg }}</p>
    <my-first-inner-component></my-first-inner-component>
  </div>
</template>

<script>
import myFirstInnerComponent from './myFirstInnerComponent.vue'


export default {
  name : 'myFirstComponent',
  data : function(){
    return {
      msg : 'this is my first Component Contents!'
    }
  },
  components : {
    'my-first-inner-component' : myFirstInnerComponent
  },
  created : function(){
    console.log('.myFisrtComponent created!');
  },
}

</script>

<style>
</style>
