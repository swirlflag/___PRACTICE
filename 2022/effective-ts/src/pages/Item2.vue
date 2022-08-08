<template>
	<div>
		- noImplicitAny
		<br />
		설정시 암묵적인 any를 오류로 표시
	</div>
</template>

<script setup lang="ts">
const testfunc = (a, b) => {
	return a + b;
};
</script>
<style scoped></style>
