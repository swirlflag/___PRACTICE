<template>
	<nav>
		<ul>
			<li v-for="(item, idx) in routesInfo" :key="`${idx}-${item.path}`">
				<router-link :to="item.path" exact-active-class="_exact">
                    {{ item.name }}
                </router-link>
			</li>
		</ul>
	</nav>
</template>

<!-- <script setup lang="ts">
</script> -->

<script lang="ts">

import routesInfo from "@/router/routesInfo.ts";

export default {
    data: () => {
        return {
            routesInfo,
        }
    }
}
</script>

<style scoped>
nav a {
	color: #acc;
}
nav a._exact {
    color: dodgerblue;
}
</style>
