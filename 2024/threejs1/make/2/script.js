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
            1,
            2000
        );
        this.camera.position.z = 5;
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.resizeHandler();
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
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const line = new THREE.LineSegments(edges, material);
    line.scale.set(0, 0, 1);
    _t.scene.add(line);

    const light = new THREE.AmbientLight();
    _t.scene.add(light);

    _t.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
    _t.scene.add(_t.camera);
    _t.resizeHandler();
    _t.camera.position.z = 4;

    const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 1, autoRound: false },
        paused: true,
    });
    tl.to(line.scale, { x: 1, ease: "power2.out", duration: 0.6 });
    tl.to(line.scale, { y: 1, ease: "circ.inOut", duration: 0.6 }, ">-=0.2");
    tl.to(
        line.rotation,
        {
            x: 0.618,
            y: Math.PI + Math.PI / 4,
            ease: "circ.inOut",
            duration: 1.5,
        },
        ">-=0.1"
    );
    tl.to(line.rotation, {
        x: Math.PI / 2,
        y: Math.PI,
        z: -Math.PI,
        ease: "circ.inOut",
        duration: 1.7,
    });
    tl.to(line.scale, { x: 0, ease: "power2.inOut", duration: 0.6 });
    tl.to(line.scale, { z: 0, ease: "power2.inOut", duration: 0.6 }, ">-=0.2");
    tl.repeat(-1);
    tl.play();

    _t.mesh.line = line;
});

project.write((_t, THREE) => {
    const { line } = _t.mesh;
    const gui = new dat.GUI();
    gui.add(line.rotation, "x").min(-10).max(10).step(0.0001).listen();
    gui.add(line.rotation, "y").min(-10).max(10).step(0.0001).listen();
    gui.add(line.rotation, "z").min(-10).max(10).step(0.0001).listen();
});
project.init();
