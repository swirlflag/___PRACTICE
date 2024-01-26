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
        this.animateFunctions.push(() => {
            fn(this, this.THREE);
        });
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
            1,
            2000
        );
        this.camera.position.z = 3;
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
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
    const { scene } = _t;
    _t.setupOrbitControls();

    const light_ambient = new THREE.AmbientLight("#fff", 1);
    const light_directional = new THREE.DirectionalLight("#fff", 3);
    light_directional.castShadow = true;
    // light_directional.shadow.mapSize.width = 1024;
    // light_directional.shadow.mapSize.height = 1024;
    const light_directional_helper = new THREE.DirectionalLightHelper(
        light_directional
    );
    scene.add(light_ambient);
    scene.add(light_directional, light_directional_helper);

    const material = new THREE.MeshStandardMaterial({
        color: "#fff",
        side: THREE.DoubleSide,
        // metalness: 0.9,
        roughness: 0,
    });
    const geometry_box = new THREE.TorusKnotGeometry(0.5, 0.03, 80, 30, 15, 4);
    const geometry_plane = new THREE.PlaneGeometry(3, 3);
    const mesh_box = new THREE.Mesh(geometry_box, material);
    mesh_box.rotation.x = 2;
    mesh_box.castShadow = true;
    const mesh_plane = new THREE.Mesh(geometry_plane, material);
    mesh_plane.receiveShadow = true;
    mesh_plane.position.set(0, -1, 0);
    mesh_plane.rotation.set(-Math.PI / 2, 0, 0);
    // _t.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    _t.renderer.shadowMap.enabled = true;

    scene.add(mesh_box, mesh_plane);

    _t.addAnimate(() => {
        mesh_box.position.x = Math.sin(_t.time);
        mesh_box.position.z = Math.cos(_t.time);
        mesh_box.rotation.x = _t.time;
        mesh_box.rotation.y = _t.time * 1.3;
        mesh_box.rotation.z = _t.time / 2;
    });
});

project.init();
