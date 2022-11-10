<template lang="html">
  <p class="my-first-global-component">
    {{ msg }}
  </p>
</template>

<script>
export default {
  name : 'myFirstGlobalComponent',
  data : function(){
    return {
      msg : 'this is my first global component! ghohohooh'
    }
  },
  created : function(){
    console.log('create myFirstGlobalComponent')
  },
}
</script>

<style lang="css" scoped>
.my-first-global-component{
  color : #3d3;
  font-size: 10px;
  text-decoration: underline;

  border-radius: 10px;
 }

</style>
