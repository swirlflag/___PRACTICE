/*
1. Scene
2. Mesh
    2-1. Geometry
    2-2. material
3. Camera
4. Renderer
*/

const clock = new THREE.Clock();

// -- SCENE
const scene = new THREE.Scene();

// -- MESH
const geometry = new THREE.BoxGeometry(1, 1, 1, 3, 3, 3);
// const geometry = new THREE.BufferGeometry();
// const verticesArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
// const positionAttribute = new THREE.BufferAttribute(verticesArray, 3);
// geometry.setAttribute("position", positionAttribute);

const material = new THREE.MeshBasicMaterial({
    color: "lightgreen",
    wireframe: true,
});
const boxMesh = new THREE.Mesh(geometry, material);
// boxMesh.position.x = 1;
// boxMesh.rotation.set(1, 1, 1);
scene.add(boxMesh);

// -- CAMERA
const camera = new THREE.PerspectiveCamera(
    75,
    screen.width / screen.height,
    1,
    2000
);
camera.position.z = 3;

// -- RENDERER
const ref_canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas: ref_canvas });
renderer.setSize(screen.width, screen.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
addAnimate(() => {
    renderer.render(scene, camera);
});

// -- INIT

const init = () => {
    setAutoResize(camera, renderer);
    runAnimates();
};
init();
