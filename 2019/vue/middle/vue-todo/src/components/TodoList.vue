<template>
  <div>
    <transition-group name="list" tag="ul">
      <li class="shadow list-item" v-for="(todoItem, index) in todoItems" v-bind:key="todoItem.item">
        <span class="checkbtn" v-bind:class="{'checkbtn-completed' : todoItem.completed}" v-on:click="toggleComplete({todoItem,index})">
          <i class="fas fa-check"></i>
        </span>

        <span class="" v-bind:class="{'text-completed' : todoItem.completed}">
          {{todoItem.item}}
        </span>

        <span class="removebtn" v-on:click="removeTodo({todoItem,index})">
          <i class="fas fa-trash-alt"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>

import { mapGetters,mapState,mapMutations,mapActions } from 'vuex';

export default {

  computed : {
    ...mapState([
      'todoItems',
    ]),
  },

  methods : {
    ...mapMutations({
      removeTodo : 'removeOneItem',
      toggleComplete : 'toggleOneItem',
    }),
  },

}// ~ export
</script>

<style scoped>

ul{
  list-style-type: none;
  padding-left: 0;
  margin-top: 0;
  text-align: left;
}
li{
  display: flex;
  min-height: 50px;
  height : 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: #fff;
  border-radius: 5px;
}
.checkbtn{
  line-height: 45px;
  color: #62acde;
  margin-right :5px;
    cursor:pointer;
}
.checkbtn-completed{
  color : #b3adad;
}
.text-completed{
  text-decoration: line-through;
  color : #b3adad;
}
.removebtn{
  cursor: pointer;
  margin-left: auto;
  color: #de4343;
}

.list-enter-active, .list-leave-active {
  transition: all 0.5s ease-out;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

</style>
