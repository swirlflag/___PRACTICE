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
