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
        this.pointer = null;
        this.pointerRaycaster = null;
        this.pointerSubscribes = {};
        this.pointerSubscribesList = [];
        this.pointerIntersects = [];
        this.pointerIntersect = null;
        this.pointerIntersectBefore = null;
        this.pointerIntersectsBefore = [];
        this.pointerIntersectsMap = {};
        this.pointerIntersectsBeforeMap = {};
        this.material = {};
        this.geometry = {};
        this.animateFunctions = [];
        this.wirteFunctions = [];
        this.subscribeFunctions = [];
    }

    addAnimate(fn) {
        // this.animateFunctions.push(() => fn(this, this.THREE));
        this.animateFunctions.push(fn);
    }

    write(fn) {
        this.wirteFunctions.push(fn);
    }

    on(eventName, fn, options = {}) {
        if (typeof eventName === "string" && typeof fn === "function") {
            if (!this.subscribeFunctions[eventName]) {
                this.subscribeFunctions[eventName] = [];
            }
            this.subscribeFunctions[eventName].push({
                fn,
                options,
            });
        }
    }

    eventFire(eventName, data) {
        let result = null;
        if (this.subscribeFunctions[eventName]) {
            this.subscribeFunctions[eventName].forEach((event, idx) => {
                result = event.fn(this, data);
                if (event.options.once) {
                    this.subscribeFunctions[eventName].splice(idx, 1);
                }
            });
        }
        return result;
    }

    addPointer(target, enter = () => {}, leave = () => {}, options = {}) {
        const targets = Array.isArray(target) ? [...target] : [target];
        for (let i = 0, l = targets.length; i < l; ++i) {
            const currentTarget = targets[i];
            const uuid = currentTarget.uuid;
            const item = {
                target: currentTarget,
                enter,
                leave,
                options,
            };
            this.pointerSubscribes[uuid] = item;
            this.pointerSubscribesList = [
                ...this.pointerSubscribesList,
                currentTarget,
            ];
        }
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

    _runAnimates() {
        for (let i = 0, l = this.animateFunctions.length; i < l; ++i) {
            this.animateFunctions[i]();
        }
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this._runAnimates.bind(this));
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
        const checkRaycaster = () => {
            this.pointer.x = this.cursor.x * 2 - 1;
            this.pointer.y = this.cursor.y * -2 + 1;
            this.pointerRaycaster.setFromCamera(this.pointer, this.camera);

            if (!this.pointerSubscribesList.length) {
                return;
            }

            const intersects = this.pointerRaycaster.intersectObjects(
                this.pointerSubscribesList
            );

            this.pointerIntersectsBefore = this.pointerIntersects;
            this.pointerIntersects = intersects;

            const isNone =
                !this.pointerIntersectsBefore.length &&
                !this.pointerIntersects.length;
            if (isNone) {
                return;
            }

            this.pointerIntersectsBeforeMap = this.pointerIntersects.reduce(
                (p, c) => {
                    p[c.object.uuid] = c;
                    return p;
                },
                {}
            );
            this.pointerIntersectsMap = intersects.reduce((p, c) => {
                p[c.object.uuid] = c;
                return p;
            }, {});

            const isSame =
                this.pointerIntersects.every(
                    (item) => this.pointerIntersectsBeforeMap[item.object.uuid]
                ) &&
                this.pointerIntersectsBefore.every(
                    (item) => this.pointerIntersectsMap[item.object.uuid]
                ) &&
                this.pointerIntersectsBefore.length ===
                    this.pointerIntersects.length;

            if (isSame) {
                return;
            }

            const isChangeIntersect =
                this.pointerIntersects[0]?.object.uuid ===
                this.pointerIntersect?.object.uuid;

            if (!isChangeIntersect) {
                this.pointerIntersectBefore = this.pointerIntersect;
            }
            this.pointerIntersect = this.pointerIntersects[0] || null;

            this.pointerIntersects.forEach((item, idx) => {
                const id = item?.object.uuid;
                const target = this.pointerSubscribes[id];
                if (!target) {
                    return;
                }
                const isEnterNew = !this.pointerIntersectsBeforeMap[id];
                const isPenetrate = target.options.penetrate;
                const isFront =
                    idx === 0 && id === this.pointerIntersect?.object.uuid;

                // 1. 관통 옵션이 있으면 enter
                // 2. 관통 옵션이 없으면, 맨 앞인지 확인후 맞다면 enter
                const isEnter = isPenetrate || isFront;
                if (isEnter) {
                    target.enter(target.target);
                }
            });

            this.pointerIntersectsBefore.forEach((item, idx) => {
                const id = item.object.uuid;
                const target = this.pointerSubscribes[id];
                if (!target) {
                    return;
                }

                const isShifted = !this.pointerIntersectsMap[id];
                const isPenetrate = target.options.penetrate;
                const isFront = id === this.pointerIntersect?.object.uuid;

                // 1. 관통 옵션이 있으면 기존 배열에서 제거된건지 확인후 아니라면 leave
                // 2. 관통 옵션이 없으면 맨 앞인지 확인후 아니라면 leave
                const isLeave =
                    (isPenetrate && isShifted) || (!isPenetrate && !isFront);
                if (isLeave) {
                    target.leave(target.target);
                }
            });
        };

        window.addEventListener("pointermove", (e) => {
            this.cursor = {
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            };
            checkRaycaster();
        });

        window.addEventListener("resize", () => {
            this.screen = {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        });
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
        this.pointer = new THREE.Vector2();
        this.pointerRaycaster = new THREE.Raycaster();
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
    _t.orbitControls.autoRotateSpeed = 5;

    const geometry_b1 = new THREE.BoxGeometry(1, 1, 1);
    const material_s1 = new THREE.MeshStandardMaterial({
        color: "#d3d",
        // wireframe: true,
        metalness: 0.5,
        roughness: 0.2,
    });
    const light_a1 = new THREE.AmbientLight("#fff", 1);
    const light_d1 = new THREE.DirectionalLight("dodgerblue", 3);

    const mesh_m1 = new THREE.Mesh(geometry_b1, material_s1);
    const mesh_m2 = new THREE.Mesh(geometry_b1, material_s1);
    // mesh_m1.rotation.x = 2;
    // mesh_m1.rotation.y = 1;
    // mesh_m1.rotation.z = 2;
    _t.scene.add(light_a1);
    _t.scene.add(light_d1);
    _t.scene.add(mesh_m1);
    _t.scene.add(mesh_m2);
    mesh_m2.position.x = 2;
    // _t.on("pointerRaycaster", (_t, caster) => {
    //     const intersects = caster.intersectObjects([mesh_m1]);
    //     console.log(intersects);
    // });
    _t.addPointer(
        [mesh_m1, mesh_m2],
        (target) => {
            gsap.to(target.scale, { y: 1.5, overwrite: true });
        },
        (target) => {
            gsap.to(target.scale, { y: 1, overwrite: true });
        },
        { penetrate: false }
    );

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
