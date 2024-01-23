// scene
// mesh
// camera
//renderer

// import * as THREE from "three";
// import gsap from "gsap";
// import "./style.css";

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
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.MeshBasicMaterial({
        color: "lightgreen",
        wireframe: true,
    });
    const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: "lightgreen" })
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...item.position);
    // line.position.set(...item.position);

    group.add(mesh);
    meshs.push(mesh);
});
group.scale.x = 0.1;
group.scale.y = 0.1;
group.scale.z = 0.1;

scene.add(group);

const aspect = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// const camera = new THREE.PerspectiveCamera(
//     75,
//     aspect.width / aspect.height,
//     1,
//     2000
// );

const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
camera.position.z = 10;

scene.add(camera);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(aspect.width, aspect.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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

const cursor = {
    x: 0,
    y: 0,
};
document.addEventListener("pointermove", (e) => {
    cursor.x = e.clientX / window.innerWidth;
    cursor.y = e.clientY / window.innerHeight;
    // console.log(cursor);

    // gsap.to(group.position, {
    //     x: cursor.x,
    //     y: cursor.y,
    // });
});

const clock = new THREE.Clock();

const animate = () => {
    const elapsedTime = clock.getElapsedTime();

    meshs.forEach((item, idx) => {
        item.lookAt(new THREE.Vector3(cursor.x - 0.5, -cursor.y + 0.5, 1));
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

meshs[0].lookAt;

animate();

window.addEventListener("resize", () => {
    aspect.width = window.innerWidth;
    aspect.height = window.innerHeight;

    camera.aspect = aspect.width / aspect.height;
    camera.updateProjectionMatrix();
    renderer.setSize(aspect.width, aspect.height);
});
