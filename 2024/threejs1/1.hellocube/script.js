// Scene
// Object/Mesh
// Camera
// Renderer

// Scene
const scene = new THREE.Scene();

const group = new THREE.Group();

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "dodgerblue" });
const mesh = new THREE.Mesh(geometry, material);

mesh.position.x = 1;
mesh.position.y = 1;
mesh.position.z = 1;
mesh.scale.x = 2;
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 1.25;

const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial({ color: "lightblue" });
const mesh2 = new THREE.Mesh(geometry2, material2);

group.add(mesh, mesh2);

group.position.x = -2;

scene.add(group);

const axexHelper = new THREE.AxesHelper(4);
scene.add(axexHelper);

// Camera
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
camera.position.z = 5;
camera.position.x = -1;
camera.position.y = 2;
scene.add(camera);

// Renderer
const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(aspect.width, aspect.height);
renderer.render(scene, camera);
