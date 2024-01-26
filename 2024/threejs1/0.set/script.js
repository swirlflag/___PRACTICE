/*
- Scene
- Light
- Mesh
    - Geometry
    - material
        - Texture
- Camera
- Renderer (canvas)
    - .render (Scene, Camera)
*/

class ThreeProject {
    static randomOne = (...l) => l[Math.floor(Math.random() * l.length)];
    constructor(options = {}) {
        const THREE = window.THREE;
        if (!THREE) {
            throw "no three";
        }
        this.THREE = THREE;
        this.canvas = options.canvas;
        this.cursor = {};
        this.screen = {};
        this.animateFunctions = [];
        this.textureLoader = null;
        this.orbitControls = null;
        this.clock = null;
        this.time = 0;
        this.scene = null;
        this.light = {};
        this.texture = {};
        this.mesh = {};
        this.helper = {};
        this.shadow = {};
        this.camera = null;
        this.renderer = null;
        this.material = {};
        this.geometry = {};
        this.wirteFunctions = [];
    }

    addAnimate(fn) {
        // this.animateFunctions.push(() => fn(this, this.THREE));
        this.animateFunctions.push(fn);
    }

    write(fn) {
        this.wirteFunctions.push(fn);
    }

    _runAnimates() {
        for (let i = 0, l = this.animateFunctions.length; i < l; ++i) {
            this.animateFunctions[i]();
        }
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this._runAnimates.bind(this));
    }

    resizeHandler() {
        if (this.camera) {
            this.camera.aspect = this.screen.width / this.screen.height;
            this.camera.left = -this.camera.aspect;
            this.camera.right = this.camera.aspect;
            this.camera.updateProjectionMatrix();
        }
        if (this.renderer) {
            this.renderer.setSize(this.screen.width, this.screen.height);
        }
    }

    _setupAutoResize() {
        window.addEventListener("resize", this.resizeHandler.bind(this));
    }

    _setupDefaultEvents() {
        this.screen = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        this.cursor = {
            x: 0,
            y: 0,
        };
        window.addEventListener("pointermove", (e) => {
            this.cursor = {
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            };
        });
        window.addEventListener("resize", () => {
            this.screen = {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        });
    }

    setupOrbitControls() {
        if (!OrbitControls) {
            return;
        }
        if (!this.camera || !this.canvas) {
            return;
        }
        this.orbitControls = new OrbitControls(this.camera, this.canvas);
        // this.orbitControls.autoRotate = true;
        this.orbitControls.autoRotateSpeed = 2;
        this.orbitControls.enableDamping = true;
        this.orbitControls.dampingFactor = 0.1;
        this.addAnimate(this.orbitControls.update);
    }

    _setupDefaultInstance() {
        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();
        this.loadingManager = new THREE.LoadingManager();
        this.textureLoader = new THREE.TextureLoader(this.loadingManager);
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.screen.width / this.screen.height,
            0.1,
            2000
        );
        this.camera.position.z = 3;
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.resizeHandler();
        this.addAnimate(() => {
            this.time = this.clock.getElapsedTime();
        });
    }

    _setupWriteProcess() {
        for (let i = 0, l = this.wirteFunctions.length; i < l; ++i) {
            this.wirteFunctions[i](this, this.THREE);
        }
    }

    init() {
        this._setupDefaultEvents();
        this._setupDefaultInstance();
        this._setupAutoResize();
        this._setupWriteProcess();
        this._runAnimates();
    }
}

// -- CODE ----------------------------------
const canvas = document.querySelector("canvas");
const project = new ThreeProject({ canvas });
project.write((_t, THREE) => {
    _t.setupOrbitControls();
    _t.orbitControls.autoRotate = true;
    _t.orbitControls.autoRotateSpeed = 5;
    const geometry_b1 = new THREE.BoxGeometry(1, 1, 1);
    const material_s1 = new THREE.MeshStandardMaterial({
        color: "#fff",
        wireframe: true,
        metalness: 0.5,
        roughness: 0.2,
    });
    const light_a1 = new THREE.AmbientLight("#fff", 1);
    const light_d1 = new THREE.DirectionalLight("dodgerblue", 3);

    const mesh_m1 = new THREE.Mesh(geometry_b1, material_s1);
    mesh_m1.rotation.x = 2;
    mesh_m1.rotation.y = 1;
    mesh_m1.rotation.z = 2;
    _t.scene.add(light_a1);
    _t.scene.add(light_d1);
    _t.scene.add(mesh_m1);

    _t.geometry.b1 = geometry_b1;
    _t.material.s1 = material_s1;
    _t.light.a1 = light_a1;
    _t.light.d1 = light_d1;
    _t.mesh.m1 = mesh_m1;
});
project.write((_t) => {
    if (_t.light.d1) {
        const helper_d1 = new THREE.DirectionalLightHelper(_t.light.d1);
        _t.scene.add(helper_d1);
    }
});
project.write((_t) => {
    const gui = new dat.GUI();
    const f_position = gui.addFolder("position");
    const listens = {
        materialColor: "#fff",
    };
    f_position.open();
    f_position
        .add(_t.mesh.m1.position, "x")
        .name("x")
        .min(-3)
        .max(3)
        .step(0.1)
        .listen();
    f_position
        .add(_t.mesh.m1.position, "y")
        .name("y")
        .min(-3)
        .max(3)
        .step(0.1)
        .listen();
    f_position
        .add(_t.mesh.m1.position, "z")
        .name("z")
        .min(-3)
        .max(3)
        .step(0.1)
        .listen();

    gui.add(_t.material.s1, "wireframe");
    gui.addColor(listens, "materialColor").onChange((color) => {
        console.log(color);
        _t.material.s1.color.set(color);
    });
});
project.init();
