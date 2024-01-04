// scene
// mesh
// camera
//renderer

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: "lightgreen",
    wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);

const group = new THREE.Group();
group.add(mesh);

mesh.rotation.x = 2;
mesh.rotation.z = 1;
mesh.rotation.y = 1.2;
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
    const x = Math.random() * (Math.PI * 2) * (Math.random() > 0.5 ? 1 : -1);
    const y = Math.random() * (Math.PI * 2) * (Math.random() > 0.5 ? 1 : -1);
    const z = Math.random() * (Math.PI * 2) * (Math.random() > 0.5 ? 1 : -1);
    gsap.to(mesh.rotation, {
        x: `+=${x}`,
        y: `+=${y}`,
        z: `+=${z}`,
        ease: "circ.out",
        duration: 2,
        overwrite: true,
        autoRound: false,
    });
});

document.addEventListener("pointermove", (e) => {
    const ratio = e.offsetY / aspect.height;
    const to = 10 - ratio * 5;

    gsap.to(camera.position, {
        z: to,
        ease: "power1.out",
        duration: 0.3,
        overwrite: true,
    });
});

const clock = new THREE.Clock();

const animate = () => {
    const elapsedTime = clock.getElapsedTime();

    group.rotation.x = elapsedTime;
    group.rotation.y = elapsedTime * 0.7;
    group.rotation.z = elapsedTime * 0.5;
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};

animate();
