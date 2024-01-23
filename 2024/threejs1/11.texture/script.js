/*
- Scene
- Texture
- Mesh
    - Geometry
    - material
- Camera
- Renderer
*/
const clock = new THREE.Clock();

// -- SCENE --------------------------------------------------
const scene = new THREE.Scene();

// -- LOADING MANAGER --------------------------------------------------
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
    console.log("start");
};
loadingManager.onLoad = () => {
    console.log("load!");
};
loadingManager.onProgress = () => {
    console.log("progress..");
};
loadingManager.onError = () => {
    console.log("error");
};

// -- TEXTURE --------------------------------------------------
const textureLoader = new THREE.TextureLoader(loadingManager);
const texture_color = textureLoader.load("../texture/disturb.jpg");

// -- MESH --------------------------------------------------
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    // color: "lightgreen",
    map: texture_color,
    // wireframe: true,
});
const boxMesh = new THREE.Mesh(geometry, material);
// boxMesh.position.x = 1;
boxMesh.rotation.set(1, 1, 1);
scene.add(boxMesh);

// -- CAMERA --------------------------------------------------
const camera = new THREE.PerspectiveCamera(
    75,
    screen.width / screen.height,
    1,
    2000
);
camera.position.z = 5;

// -- RENDERER --------------------------------------------------
const ref_canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas: ref_canvas });
renderer.setSize(screen.width, screen.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
addAnimate(() => {
    renderer.render(scene, camera);
});

// -- ORBIT CONTROLS --------------------------------------------------
const setOrbitControls = (camera, canvas) => {
    const orbitControls = new OrbitControls(camera, canvas);
    orbitControls.autoRotate = true;
    orbitControls.autoRotateSpeed = 2;
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.05;
    addAnimate(orbitControls.update);
};

// -- INIT --------------------------------------------------

const init = () => {
    setAutoResize(camera, renderer);
    setOrbitControls(camera, ref_canvas);
    runAnimates();
};
init();
