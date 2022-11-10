<template>
<div>
  <div class="inputbox shadow">
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
    <span class="addcontainer" v-on:click="addTodo">
      <i class="fas fa-plus addbtn"></i>
    </span>
  </div>
</div>
</template>

<script>

import { mapGetters,mapState,mapMutations,mapActions } from 'vuex';

export default {

  computed : {
    ...mapState([
      'todoItems', 
      'isOnModal', 
      'modalText'
    ]),
  },

  data(){
    return {
      newTodoItem : "",
    }
  },

  methods : {
    
    addTodo(){
      if(this.hasItemCheck()){
        this.showModal({
          header : '중복 리스트',
          text : '이미 해당 내용의 리스트가 있습니다.',
        });
      }else if(this.newTodoItem == ''){
        this.showModal({
          header : '빈 입력창',
          text : '텍스트를 입력해주세요.',
        });
      }else{
        this.addOneItem(this.newTodoItem);
        this.newTodoItem = "";
      };
    },

    hasItemCheck(){
      for(var key of this.todoItems){
        if(key.item == this.newTodoItem){
          return true;
        };
      };
      return false;
    },

    ...mapMutations({
      showModal : 'showModal',
      addOneItem : 'addOneItem',
    }),

  },
}
</script>

<style scoped>

input:focus{
  outline:none;
}

.inputbox{
  background: #fff;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
  position: relative;
}
.inputbox input{
  border-style : none;
  font-size: 1rem;
  height: 90%;
  font-size: 24px;
  line-height: 50px;
  width: 80%;
}
.addcontainer{
  position: absolute;
  right: 0;top: 0;
  background : linear-gradient(to right, #6478FB, #8763FB);
  display: inline-block;
  width :3rem;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}
.addbtn{
  color : #fff;
  vertical-align : middle;
}
.close-modalbtn{
  color: #42b983;
}

button{
  cursor: pointer;
}
i{
  cursor: pointer;
}

</style>
