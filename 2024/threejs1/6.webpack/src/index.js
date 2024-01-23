// scene
// mesh
// camera
//renderer

import * as THREE from "three";
import gsap from "gsap";
import "./style.css";

const randomOne = (...l) => l[Math.floor(Math.random() * l.length)];

const scene = new THREE.Scene();

const LIST_meshs = [
    {
        color: "lightgreen",
        position: [2, 2, 0],
    },
    {
        color: "lightgreen",
        position: [2, 0, 0],
    },
    {
        color: "lightgreen",
        position: [2, -2, 0],
    },
    {
        color: "lightgreen",
        position: [0, -2, 0],
    },
    {
        color: "lightgreen",
        position: [-2, -2, 0],
    },
    {
        color: "lightgreen",
        position: [-2, 0, 0],
    },
    {
        color: "lightgreen",
        position: [-2, 2, 0],
    },
    {
        color: "lightgreen",
        position: [0, 2, 0],
    },
];

const meshs = [];
const group = new THREE.Group();

LIST_meshs.forEach((item) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
        color: "lightgreen",
        wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...item.position);

    group.add(mesh);
    meshs.push(mesh);
});

scene.add(group);

const aspect = {
    width: window.innerWidth,
    height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(
    75,
    aspect.width / aspect.height,
    1,
    2000
);
camera.position.z = 10;

scene.add(camera);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(aspect.width, aspect.height);

document.addEventListener("click", () => {
    // return;
    // const x = Math.random() * (Math.PI * 2) * (Math.random() > 0.5 ? 1 : -1);
    const value =
        Math.random() * (Math.PI * 2) * (Math.random() > 0.5 ? 1 : -1);
    // const z = Math.random() * (Math.PI * 2);
    // console.log(z);

    const target = randomOne("x", "y", "z");

    gsap.to(group.rotation, {
        // x: `+=${x}`,
        [target]: `+=${value}`,
        // z: `+=${z}`,
        ease: "circ.out",
        duration: 2.5,
        // overwrite: true,
        autoRound: false,
    });
});

document.addEventListener("pointermove", (e) => {
    const ratio = e.offsetY / aspect.height;
    const to = 10 - ratio * 5;

    gsap.to(camera.position, {
        z: to,
        ease: "power1.out",
        duration: 2,
        overwrite: true,
    });
});

const clock = new THREE.Clock();

const animate = () => {
    const elapsedTime = clock.getElapsedTime();

    meshs.forEach((item, idx) => {
        const speed = elapsedTime * 0.2;
        item.rotation.set(speed, speed, speed);
    });
    // mesh.position.x = Math.tan(elapsedTime);
    // mesh.position.y = Math.sin(elapsedTime);
    // mesh.position.y = elapsedTime;

    // mesh.rotation.x = elapsedTime;
    // mesh.rotation.y = elapsedTime * 0.7;
    // mesh.rotation.z = elapsedTime * 0.5;
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};

animate();
