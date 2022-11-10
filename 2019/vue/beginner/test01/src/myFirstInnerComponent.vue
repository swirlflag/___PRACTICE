<template lang="html">
<div class="my-first-inner-component  ">
  <p>{{msg}}</p>
</div>
</template>

<script>
export default {
  name : 'myFirstInnerComponent',
  data : function(){
    return {
      msg : 'this is inner component!!'
    }
  }
}
</script>

<style lang="css" scoped>
.my-first-inner-component{
  color : #d3d;
}
</style>
