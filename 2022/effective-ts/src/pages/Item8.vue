<template>
	<div>
		<h1>타입 공간과 값 공간의 심벌 구분하기</h1>
	</div>
</template>

<script setup lang="ts">
// 
interface Person {
	first: string;
	last: string;
}

const p: Person = { first: "m", last: "sh" };

type Response = string;

const email = (p: Person, subject: string, body: string): Response => {
	return `
        -${subject}-\n
        ${body}\n
        from ${p}.
    `;
};

type T1 = typeof p; // Person
type T2 = typeof email; //(p: Person, subject: string, body: string) => string

const v1 = typeof p;
const v2 = typeof email;

// 
class Cylinder {
    radius = 1;
    height = 1;
}

type T3 = typeof Cylinder;
const c1: Cylinder = { radius: 1, height: 1 };
type C = InstanceType<typeof Cylinder>;

</script>
<style scoped></style>
