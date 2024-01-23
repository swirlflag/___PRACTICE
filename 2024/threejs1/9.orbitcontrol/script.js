/*
1. Scene
2. Mesh
    2-1. Geometry
    2-2. material
3. Camera
4. Renderer
*/

// -- SCENE
const scene = new THREE.Scene();

// -- MESH
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: "lightgreen",
    wireframe: true,
});
const boxMesh = new THREE.Mesh(geometry, material);
// boxMesh.position.x = 1;
boxMesh.rotation.set(1, 1, 1);
scene.add(boxMesh);

// -- CAMERA
const camera = new THREE.PerspectiveCamera(
    75,
    screen.width / screen.height,
    1,
    2000
);
camera.position.z = 5;

// -- RENDERER
const ref_canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas: ref_canvas });
renderer.setSize(screen.width, screen.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
addAnimate(() => {
    renderer.render(scene, camera);
});

const clock = new THREE.Clock();
const animate = () => {
    const elapsedTime = clock.getElapsedTime();
    runAnimates();
    window.requestAnimationFrame(animate);
};

// -- ORBIT CONTROLS
const orbitControls = new OrbitControls(camera, ref_canvas);
// orbitControls.autoRotate = true;
// orbitControls.autoRotateSpeed = 2;
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.01;
addAnimate(orbitControls.update);

window.addEventListener("resize", () => {
    camera.aspect = screen.width / screen.height;
    camera.updateProjectionMatrix();
    renderer.setSize(screen.width, screen.height);
});

// -- EVENT

// -- INIT
const init = () => {
    animate();
};
init();
