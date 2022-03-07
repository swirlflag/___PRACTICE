// https://www.youtube.com/watch?v=YK1Sw_hnm58
import * as THREE from "https://cdn.skypack.dev/three@0.137.5";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";

import gsap from "gsap";
window.gsap = gsap;

import * as dat from "dat.gui";

const gui = new dat.GUI();
const world = {
	plane: {
		width: 24,
		height: 24,
		widthSegments: 25,
		heightSegments: 25,
	},
};

const generatePlane = () => {
	planeMesh.geometry.dispose();

	planeMesh.geometry = new THREE.PlaneGeometry(
		world.plane.width,
		world.plane.height,
		world.plane.widthSegments,
		world.plane.heightSegments
	);

    // vertice position randomiztion
	const { array } = planeMesh.geometry.attributes.position;

	for (let i = 0; i < array.length; i += 3) {
		const x = array[i];
		const y = array[i + 1];
		const z = array[i + 2];
        array[i] = x + Math.random() - 0.5;
        array[i + 1] = y + Math.random() - 0.5;
		array[i + 2] = (Math.random() - 0.5) * 1.5;
	}

    planeMesh.geometry.attributes.position.originalPosition = planeMesh.geometry.attributes.position.array;

    // color attrivute addition
	const colors = [];

	for (let i = 0; i < planeMesh.geometry.attributes.position.count; ++i) {
		colors.push(0, 0.19, 0.4);
	}

	planeMesh.geometry.setAttribute(
		"color",
		new THREE.BufferAttribute(new Float32Array(colors), 3)
	);
};

gui.add(world.plane, "width", 1, 20).onChange(() => {
	generatePlane();
});
gui.add(world.plane, "height", 1, 20).onChange(() => {
	generatePlane();
});
gui.add(world.plane, "widthSegments", 1, 20).onChange(() => {
	generatePlane();
});
gui.add(world.plane, "heightSegments", 1, 20).onChange(() => {
	generatePlane();
});

const raycaster = new THREE.Raycaster();

const scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	1,
	1000
);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

// const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
const planeGeometry = new THREE.PlaneGeometry(
	world.plane.width,
	world.plane.height,
	world.plane.widthSegments,
	world.plane.heightSegments
);

const boxMaterial = new THREE.MeshBasicMaterial({
	// color: 0x00ff00,
});

const planeMaterial = new THREE.MeshPhongMaterial({
	side: THREE.DoubleSide,
	flatShading: THREE.FlatShading,
	vertexColors: true,
});

const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

const light1 = new THREE.DirectionalLight(0xffffff);

light1.position.set(0, 0, 3);

const light2 = new THREE.DirectionalLight(0xffffff);

light2.position.set(0, 0, -3);

const useHelper = () => {
	const light1Helper = new THREE.DirectionalLightHelper(light1, 1);
	const light2Helper = new THREE.DirectionalLightHelper(light2, 1);
	scene.add(light1Helper);
	scene.add(light2Helper);
};

scene.add(planeMesh);
scene.add(light1);
scene.add(light2);
// scene.add(boxMesh);
camera.position.set(0, 0, 5);

useHelper();

generatePlane();

new OrbitControls(camera, renderer.domElement);

let frame = 0;
const animate = () => {
	window.requestAnimationFrame(animate);
	renderer.render(scene, camera);
	raycaster.setFromCamera(mouse, camera);
    frame += 0.01;

    const { array , originalPosition } = planeMesh.geometry.attributes.position;

    for(let i = 0; i < array.length; ++i) {
        array[i] = originalPosition[i] + Math.cos(frame);

        if(i === 0) {
            console.log(Math.cos(frame));
        }
    }
    
    planeMesh.geometry.attributes.position.needsUpdate = true;

	const intersects = raycaster.intersectObject(planeMesh);

	if (intersects.length > 0) {
		const { color } = intersects[0].object.geometry.attributes;

		const initalColor = {
			r: 0,
			g: 0.19,
			b: 0.4,
		};

		const hoverColor = {
			r: 0.1,
			g: 0.5,
			b: 1,
		};

		const setHoverColor = () => {
			color.setX(intersects[0].face.a, hoverColor.r);
			color.setY(intersects[0].face.a, hoverColor.g);
			color.setZ(intersects[0].face.a, hoverColor.b);

			color.setX(intersects[0].face.b, hoverColor.r);
			color.setY(intersects[0].face.b, hoverColor.g);
			color.setZ(intersects[0].face.b, hoverColor.b);

			color.setX(intersects[0].face.c, hoverColor.r);
			color.setY(intersects[0].face.c, hoverColor.g);
			color.setZ(intersects[0].face.c, hoverColor.b);

			color.needsUpdate = true;
		};

		gsap.to(hoverColor, {
			...initalColor,
			duration: 1,
			onUpdate: () => {
				setHoverColor();
			},
		});
	}
	// boxMesh.rotation.x += 0.01;
	// boxMesh.rotation.y += 0.001;

	// planeMesh.rotation.x += 0.01;
};

const mouse = {
	x: undefined,
	y: undefined,
};

window.addEventListener("mousemove", (event) => {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = (event.clientY / window.innerHeight) * -2 + 1;
});

animate();
