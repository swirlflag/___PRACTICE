<template>
	<div id="app">
        <Nav />
        <router-view class="page"></router-view>
    </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Nav from "./components/Nav.vue";

</script>

<style scoped>
.page {
    margin-top: 20px;
}

</style>
