/*
- Scene
- Light
- Texture
- Mesh
    - Geometry
    - material
- Camera
- Renderer
*/
// -- ORBIT CONTROLS --------------------------------------------------
const setOrbitControls = (camera, canvas) => {
    const orbitControls = new OrbitControls(camera, canvas);
    // orbitControls.autoRotate = true;
    orbitControls.autoRotateSpeed = 2;
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.05;
    addAnimate(orbitControls.update);
};
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

const clock = new THREE.Clock();

// -- SCENE --------------------------------------------------
const scene = new THREE.Scene();

// -- LIGHT --------------------------------------------------
const ambientLight = new THREE.AmbientLight("#fff", 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("#fff", 5);
const directionalLightHelper = new THREE.DirectionalLightHelper(
    directionalLight
);
directionalLight.position.set(0, 2, 0);
// scene.add(directionalLight);
// scene.add(directionalLightHelper);

// const hemisphereLight = new THREE.HemisphereLight("#3d3", "red", 1);
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight);
// scene.add(hemisphereLight);
// scene.add(hemisphereLightHelper);

// const pointLight = new THREE.PointLight("red", 0.8);
// const pointLightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(pointLight);
// scene.add(pointLightHelper);

const rectAreaLight = new THREE.RectAreaLight("#d3d", 3, 1, 1);
// const rectAreaLightHelper = new THREE.RectAreaLightHelper(rectAreaLight);
// scene.add(rectAreaLight);
// scene.add(rectAreaLightHelper);

const spotLight = new THREE.SpotLight("#d3d", 5, 8, Math.PI * 0.1, 1.02, 1);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
spotLight.position.z = 0.2;
spotLight.rotation.y = 0;
spotLight.rotation.x = 1;

scene.add(spotLight);
scene.add(spotLightHelper);

const light = {
    spotLight,
    // ambientLight,
    // directionalLight,
    // rectAreaLight,
};

// -- TEXTURE --------------------------------------------------
const textureLoader = new THREE.TextureLoader(loadingManager);

// -- MESH --------------------------------------------------
// const geometry = new THREE.TorusGeometry(0.3, 0.2, 32, 32);
const geometry = new THREE.PlaneGeometry(2, 2, 64, 64);

const material = new THREE.MeshStandardMaterial({
    // color: "lightgreen",
    // wireframe: true,
    metalness: 0.1,
    roughness: 0.01,
});
const mesh = new THREE.Mesh(geometry, material);
// mesh.position.x = 1;
// mesh.rotation.set(1, 1, 1);
scene.add(mesh);

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

// -- INIT --------------------------------------------------

const init = () => {
    setOrbitControls(camera, ref_canvas);
    setAutoResize(camera, renderer);
    runAnimates();
};
init();
