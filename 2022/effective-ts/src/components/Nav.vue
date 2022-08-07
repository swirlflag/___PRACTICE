<template>
	<nav>
		<ul>
			<li v-for="(item, idx) in routesInfo" :key="`${idx}-${item.path}`">
				<router-link :to="item.path">
                    {{ item.name }}
                </router-link>
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts">
import routesInfo from "@/router/routesInfo.ts";

const data = [...routesInfo];
</script>

<style scoped>
nav a {
	color: #acc;
}
</style>
