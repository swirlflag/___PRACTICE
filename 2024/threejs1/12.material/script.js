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
const clock = new THREE.Clock();

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

// -- SCENE --------------------------------------------------
const scene = new THREE.Scene();

// -- LIGHT --------------------------------------------------
const ambientLight = new THREE.AmbientLight("#fff", 1);
const pointLight = new THREE.PointLight("#fff", 3);
const pointLight2 = new THREE.PointLight("#fff", 1);
pointLight.position.set(0, 1, 0);
// pointLight2.position.set(0, -1, 0);
scene.add(pointLight, ambientLight);

// -- TEXTURE --------------------------------------------------
const textureLoader = new THREE.TextureLoader(loadingManager);
// const texture_color = textureLoader.load("../texture/waternormals.jpg");
const texture_color = textureLoader.load("../texture/disturb.jpg");
const texture_matcap = textureLoader.load(
    "../texture/matcap-porcelain-white.jpg"
);
const texture_bump = textureLoader.load("../texture/brick_bump.jpg");
const texture_map = textureLoader.load("../texture/earth_atmos_2048.jpg");
const texture_displacement = textureLoader.load(
    "../texture/earth_atmos_2048.jpg"
);

const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager);
const texture_env = cubeTextureLoader.load([
    "../texture/px.png",
    "../texture/nx.png",
    "../texture/py.png",
    "../texture/ny.png",
    "../texture/pz.png",
    "../texture/nz.png",
]);

scene.background = texture_env;

// -- MESH --------------------------------------------------
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const geometry = new THREE.PlaneGeometry(1, 1, 64, 64);
// const geometry = new THREE.TorusGeometry(0.3, 0.2, 32, 32);
const geometry = new THREE.SphereGeometry(0.5, 32, 32);

// 빛 없음
// const material = new THREE.MeshBasicMaterial();

// 카메라 거리에 따른 빛
// const material = new THREE.MeshDepthMaterial();

// 벡터를 rgb로 맵핑
// const material = new THREE.MeshNormalMaterial();

// 가짜 빛
// const material = new THREE.MeshMatcapMaterial();

// 조명 빛에 반응
// const material = new THREE.MeshLambertMaterial();

// 조명 빛에 반응 (고품질)
// const material = new THREE.MeshPhongMaterial();

// 카툰렌더링
// const material = new THREE.MeshToonMaterial();

// 사실적
const material = new THREE.MeshStandardMaterial();

material.setValues({
    // color: "lightgreen",
    // transparent: true,
    // opacity: 0.5,
    color: "#ddd",
    // wireframe: true,
    // visible: false,
    // side: THREE.DoubleSide,
    // matcap: texture_color,
    // shininess: 2000,
    specular: new THREE.Color("#d3d"),
    metalness: 0.9,
    roughness: 0.1,
    // map: texture_map,
    // bumpMap: texture_map,
    // displacementMap: texture_map,
    envMap: texture_env,
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
camera.position.z = 2;

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
    // orbitControls.autoRotate = true;
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
