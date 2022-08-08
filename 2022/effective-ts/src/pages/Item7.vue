<template>
	<div>
		<h1>타입이 값들의 집합이라고 생각하기</h1>
	</div>
</template>

<script setup lang="ts">
//
interface Person {
	name: string;
}
interface Lifespan {
	birth: Date;
	death: Date;
}

type Personspan = Lifespan & Person;
type MyKey = keyof (Lifespan | Person); // Lifespan에도 있거나 Person에도 있는 key. 없으면 never

const me: Personspan = {
	name: "msh",
	birth: new Date(),
	death: new Date(),
};

//
const list: number[] = [1, 2];
const tuple: [number, number] = list; // error

//
interface Point {
	x: number;
	y: number;
}

type PointKeys = keyof Point;

function sortBy<K extends keyof T, T>(vals: T[], key: K): T[] {
    return vals.sort((a,b) => +a[key] - +b[key]);
}

const pts: Point[] = [
	{ x: 5, y: 2 },
	{ x: 3, y: 1 },
];

console.log(sortBy(pts, 'x'));
 ;
// sortBy(pts, 'e'); // error

</script>
<style scoped></style>
