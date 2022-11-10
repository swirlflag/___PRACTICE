<template>

  <div>
    <user-profile v-bind:info='userInfo'>
      <div slot="username">
        {{ userInfo.id }}
      </div>
      <template slot="time">
        <span>Joined {{ userInfo.created }}</span>
      </template>
      <div slot="karma">
        <span>{{ userInfo.karma }}</span>        
      </div>
    </user-profile>
  </div>
  
</template>

<script>

import UserProfile from '../components/UserProfile.vue';

export default {

  components : {
    'user-profile' : UserProfile,
  },

  computed :{
    userInfo(){
      return this.$store.state.user;
    },
  },
  
  created(){
    const userName = this.$route.params.id;
    this.$store.dispatch('FETCH_USER', userName);
  },
}

</script>

<style>

</style>
