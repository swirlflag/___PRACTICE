const cursor = {
    x: 0,
    y: 0,
};
window.addEventListener("pointermove", (e) => {
    cursor.x = e.clientX / window.innerWidth;
    cursor.y = e.clientY / window.innerHeight;
});

const screen = {
    width: window.innerWidth,
    height: window.innerHeight,
};
window.addEventListener("resize", () => {
    screen.width = window.innerWidth;
    screen.height = window.innerHeight;
});

const animateFunctions = [];

const addAnimate = (fn) => {
    animateFunctions.push(fn);
};

const runAnimates = () => {
    for (let i = 0, l = animateFunctions.length; i < l; ++i) {
        animateFunctions[i]();
    }
    window.requestAnimationFrame(runAnimates);
};

const setAutoResize = (camera, renderer) => {
    window.addEventListener("resize", () => {
        camera.aspect = screen.width / screen.height;
        camera.updateProjectionMatrix();
        renderer.setSize(screen.width, screen.height);
    });
};
