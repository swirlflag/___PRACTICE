const gui = new dat.GUI();
gui.add(mesh.position, "x").min(-1).max(1).step(0.1).name("pos x");
gui.add(material, "wireframe");
const materialColor = {
    color: "#fff",
};
gui.addColor(materialColor, "color").onChange((color) => {
    material.color.set(color);
});

gui.add(camera.position, "x").min(-5).max(5).name("camera X");
gui.add(camera.position, "y").min(-5).max(5).name("camera Y");
gui.add(camera.position, "z").min(-5).max(5).name("camera Z");

gui.add(ambientLight, "intensity")
    .min(0)
    .max(2)
    .step(0.01)
    .name("light 1 power");

if (light.directionalLight) {
    let nowGroup = gui.addFolder("directionalLight");
    nowGroup.open();

    nowGroup
        .add(light.directionalLight, "intensity")
        .name("power")
        .min(0)
        .max(10)
        .step(0.01);
    nowGroup
        .add(light.directionalLight.position, "x")
        .name("position x")
        .min(-3)
        .max(3)
        .step(0.01);
    nowGroup
        .add(light.directionalLight.position, "y")
        .name("position y")
        .min(-3)
        .max(3)
        .step(0.01);
    nowGroup
        .add(light.directionalLight.position, "z")
        .name("position z")
        .min(-3)
        .max(3)
        .step(0.01);
    nowGroup
        .add(light.directionalLight.rotation, "x")
        .name("rotation x")
        .min(-3)
        .max(3)
        .step(0.01);
    nowGroup
        .add(light.directionalLight.rotation, "y")
        .name("rotation y")
        .min(-3)
        .max(3)
        .step(0.01);
    nowGroup
        .add(light.directionalLight.rotation, "z")
        .name("rotation z")
        .min(-3)
        .max(3)
        .step(0.01);
}

if (light.pointLight) {
    let nowGroup = gui.addFolder("pointLight");
    nowGroup.open();
    nowGroup
        .add(light.pointLight, "intensity")
        .name("power")
        .min(0)
        .max(10)
        .step(0.01);
    nowGroup
        .add(light.pointLight.position, "x")
        .name("position x")
        .min(-3)
        .max(3)
        .step(0.01);
    nowGroup
        .add(light.pointLight.position, "y")
        .name("position y")
        .min(-3)
        .max(3)
        .step(0.01);
    nowGroup
        .add(light.pointLight.position, "z")
        .name("position z")
        .min(-3)
        .max(3)
        .step(0.01);
    nowGroup
        .add(light.pointLight.rotation, "x")
        .name("rotation x")
        .min(-3)
        .max(3)
        .step(0.01);
    nowGroup
        .add(light.pointLight.rotation, "y")
        .name("rotation y")
        .min(-3)
        .max(3)
        .step(0.01);
    nowGroup
        .add(light.pointLight.rotation, "z")
        .name("rotation z")
        .min(-3)
        .max(3)
        .step(0.01);
}

if (light.rectAreaLight) {
    console.log(1);
    let nowGroup = gui.addFolder("rectAreaLight");
    nowGroup.open();
    nowGroup
        .add(light.rectAreaLight, "intensity")
        .name("power")
        .min(0)
        .max(10)
        .step(0.01);
    nowGroup
        .add(light.rectAreaLight.position, "x")
        .name("position x")
        .min(-3)
        .max(3)
        .step(0.01);
    nowGroup
        .add(light.rectAreaLight.position, "y")
        .name("position y")
        .min(-3)
        .max(3)
        .step(0.01);
    nowGroup
        .add(light.rectAreaLight.position, "z")
        .name("position z")
        .min(-3)
        .max(3)
        .step(0.01);
    nowGroup
        .add(light.rectAreaLight.rotation, "x")
        .name("rotation x")
        .min(-3)
        .max(3)
        .step(0.01);
    nowGroup
        .add(light.rectAreaLight.rotation, "y")
        .name("rotation y")
        .min(-3)
        .max(3)
        .step(0.01);
    nowGroup
        .add(light.rectAreaLight.rotation, "z")
        .name("rotation z")
        .min(-3)
        .max(3)
        .step(0.01);
}

if (light.spotLight) {
    let nowGroup = gui.addFolder("pointLight");
    nowGroup.open();
    nowGroup
        .add(light.spotLight.position, "x")
        .name("position x")
        .min(-3)
        .max(3)
        .step(0.01);
    nowGroup
        .add(light.spotLight.position, "y")
        .name("position y")
        .min(-3)
        .max(3)
        .step(0.01);
    nowGroup
        .add(light.spotLight.position, "z")
        .name("position z")
        .min(-3)
        .max(3)
        .step(0.01);
    nowGroup
        .add(light.spotLight.rotation, "x")
        .name("rotation x")
        .min(-3)
        .max(3)
        .step(0.01);
    nowGroup
        .add(light.spotLight.rotation, "y")
        .name("rotation y")
        .min(-3)
        .max(3)
        .step(0.01);
    nowGroup
        .add(light.spotLight.rotation, "z")
        .name("rotation z")
        .min(-3)
        .max(3)
        .step(0.01);
    nowGroup
        .add(light.spotLight, "angle")
        .name("angle")
        .min(0)
        .max(3)
        .step(0.01);
    nowGroup
        .add(light.spotLight, "penumbra")
        .name("penumbra")
        .min(0)
        .max(3)
        .step(0.01);
}
