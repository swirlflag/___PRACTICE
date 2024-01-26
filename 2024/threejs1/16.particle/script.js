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
    // _t.orbitControls.autoRotate = true;

    const texture = _t.textureLoader.load("../texture/sprite.png");
    // console.log(_t.textureLoader);
    const geometry_b1 = new THREE.BufferGeometry();
    const material_p1 = new THREE.PointsMaterial({
        // color: "#fff",
        // color: "orange",
        // wireframe: true,
        map: texture,
        transparent: true,
        depthTest: false,
    });
    material_p1.size = 0.02;
    const verticesAmount = 3000;
    const positionArray = new Float32Array(verticesAmount * 3);
    for (let i = 0, l = positionArray.length; i < l; ++i) {
        positionArray[i] = (Math.random() - 0.5) * 6;
    }
    geometry_b1.setAttribute(
        "position",
        new THREE.BufferAttribute(positionArray, 3)
    );
    const light_a1 = new THREE.AmbientLight("#fff", 1);
    const light_d1 = new THREE.DirectionalLight("dodgerblue", 3);

    const point_p1 = new THREE.Points(geometry_b1, material_p1);
    // point_p1.rotation.x = 2;
    // point_p1.rotation.y = 1;
    // point_p1.rotation.z = 2;
    _t.scene.add(light_a1);
    _t.scene.add(light_d1);
    _t.scene.add(point_p1);

    _t.addAnimate(() => {
        point_p1.rotation.x = Math.sin(_t.time * 0.03);
        point_p1.rotation.y = Math.sin(_t.time * 0.04);
    });
});
project.write((_t) => {
    return;
    if (_t.light.d1) {
        const helper_d1 = new THREE.DirectionalLightHelper(_t.light.d1);
        _t.scene.add(helper_d1);
    }
});
project.write((_t) => {
    return;
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
