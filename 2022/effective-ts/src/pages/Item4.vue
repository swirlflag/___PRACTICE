<template>
	<div></div>
</template>

<script setup lang="ts">
interface Vector3D {
	x: number;
	y: number;
	z: number;
}

interface NamedVector extends Vector3D {
	name: string;
}

let calculateLength = (model: Vector3D): number => {
	let length = 0;
	for (let axis in model) {
		const coord = model[axis]; //error!
		length += Math.abs(coord);
	}
	return length;
};

calculateLength = (model: Vector3D): number => {
	return Math.abs(model.x) + Math.abs(model.y) + Math.abs(model.z);
};

const modelA: NamedVector = {
	x: 10,
	y: 2,
	z: 1,
	name: "A",
};

console.log(calculateLength(modelA));

interface Author {
	first: string;
	last: string;
}
interface DB {
	runQuery: (sql: string) => any[];
}

const getAuthors = (database: DB): Author[] => {
	const rows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
	return rows.map(([first, last]) => ({first, last}));
};

</script>
<style scoped></style>
