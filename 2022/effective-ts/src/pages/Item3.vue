<template>
	<div></div>
</template>

<script setup lang="ts">
interface Square {
	width: number;
}
interface Rectangle {
	width: number;
	height: number;
}

const isRectangle = (shape: Square | Rectangle):boolean => {
    return "height" in shape;
}

let calculateSize = (shape: Square | Rectangle):any => {
    if (isRectangle(shape)) {
        const rectangleShape = shape as Rectangle;
        return rectangleShape.width * rectangleShape.height;
    } else {
        const squareShape = shape as Rectangle;
        return squareShape.width * squareShape.width;
    }
};

const mySquareShape: Square = {
	width: 10,
};
const myRectangleShape: Rectangle = {
    width: 10,
    height: 12,
};

console.log(calculateSize(mySquareShape) , " Square");
console.log(calculateSize(myRectangleShape) , " Rectangle");

</script>
<style scoped></style>
