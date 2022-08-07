<template>
	<div>item1</div>
</template>

<script setup lang="ts">
interface State {
	name: string;
}
const a: State = {
	name: "1",
};
console.log(a);
</script>
<style scoped></style>
