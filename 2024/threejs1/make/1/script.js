/*
1. Scene
2. Mesh
    2-1. Geometry
    2-2. material
3. Camera
4. Renderer
*/

const INT_gap = 1.5;

const LIST_meshs = [
    {
        position: [-INT_gap, INT_gap, 0],
    },
    {
        position: [0, INT_gap, 0],
    },
    {
        position: [INT_gap, INT_gap, 0],
    },
    {
        position: [-INT_gap, 0, 0],
    },
    {
        position: [0, 0, 0],
    },
    {
        position: [INT_gap, 0, 0],
    },
    {
        position: [-INT_gap, -INT_gap, 0],
    },
    {
        position: [0, -INT_gap, 0],
    },
    {
        position: [INT_gap, -INT_gap, 0],
    },
];

// -- SCENE
const scene = new THREE.Scene();

// -- MESH
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: "lightgreen",
    wireframe: true,
});
const boxGroup = new THREE.Group();
const boxs = LIST_meshs.map((item) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...item.position);
    boxGroup.add(mesh);
    return mesh;
});
scene.add(boxGroup);

// -- CAMERA
const camera = new THREE.PerspectiveCamera(
    75,
    screen.width / screen.height,
    1,
    2000
);
camera.position.z = 10;
camera.rotation.z = 0;

// -- RENDERER
const ref_canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas: ref_canvas });
renderer.setSize(screen.width, screen.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();
const animate = () => {
    const elapsedTime = clock.getElapsedTime();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};

// DEFAULT EVENT
window.addEventListener("resize", () => {
    camera.aspect = screen.width / screen.height;
    camera.updateProjectionMatrix();
    renderer.setSize(screen.width, screen.height);
});

// EVENT
const qt_camera = gsap.quickTo(camera.position, "z", {
    duration: 1,
    ease: "power3.out",
});
window.addEventListener("pointermove", (e) => {
    const z = 8 - cursor.y * 3;
    qt_camera(z);
    boxGroup.lookAt(new THREE.Vector3(cursor.x - 0.5, -cursor.y + 0.5, 1));
});
document.addEventListener("click", () => {
    const randoms = [...LIST_meshs].sort(() => (Math.random() > 0.5 ? 1 : -1));
    const duration = 0.6;
    const stagger = 0.03;
    const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration },
        paused: true,
    });
    boxs.forEach((box, i) => {
        const target = randoms[i];
        const [x, y] = target.position;
        const tl_box = gsap.timeline({
            defaults: { ease: "power3.inOut", duration },
        });
        const xAction = target.position.x !== box.position.x;
        const yAction = target.position.y !== box.position.y;
        const delay = i * stagger;
        const randomRotateTarget = randomOne("x", "y", "z");
        // const randomRotateValue = 1 + Math.random() * Math.PI;

        xAction && tl.to(box.position, { x }, 0 + delay);
        yAction && tl.to(box.position, { y }, duration * 0.75 + delay);
        tl.to(
            box.rotation,
            { [randomRotateTarget]: `+=${Math.PI}`, duration: duration * 2.5 },
            "<"
        );
    });
    tl.play();
});

animate();
