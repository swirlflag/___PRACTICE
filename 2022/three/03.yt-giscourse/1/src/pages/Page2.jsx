import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import styled from "styled-components";

const Page = styled.div``;

class App {
	constructor({ container }) {
		const elContainer = container;

		this._elContainer = elContainer;

		const renderer = new THREE.WebGLRenderer({ antialias: true });

		this._renderer = renderer;

		const scene = new THREE.Scene();

		this._scene = scene;

		this._setupCamera();
		this._setupLight();
		this._setupModel();
		this._setupControls();

		window.addEventListener("resize", this.resize.bind(this));
		this.resize();

		const beforeCanvas = elContainer.querySelector(`canvas[data-engine]`);
		if (beforeCanvas) {
			elContainer.removeChild(beforeCanvas);
		}
		elContainer.appendChild(renderer.domElement);

		requestAnimationFrame(this.render.bind(this));
	}
	resize() {
		const width = this._elContainer.clientWidth;
		const height = this._elContainer.clientHeight;

		this._camera.aspect = width / height;
		this._camera.updateProjectionMatrix();
		this._renderer.setSize(width, height);
	}
	_setupCamera() {
		const width = this._elContainer.clientWidth;
		const height = this._elContainer.clientHeight;

		const camera = new THREE.PerspectiveCamera(
			75,
			width / height,
			0.1,
			1000
		);

		camera.position.set(0, 0, 2);
		this._camera = camera;
	}
	_setupLight() {
		const color = 0xffffff;
		const intensity = 1;

		const light = new THREE.DirectionalLight(color, intensity);

		light.position.set(-1, 2, 4);
		this._light = light;
		this._scene.add(light);
	}
	_setupModel() {
		const geometry = new THREE.BoxGeometry(1,1,1,2,2,2);

		const fillMetarial = new THREE.MeshPhongMaterial({ color: 0x515151 });

		const cube = new THREE.Mesh(geometry, fillMetarial);

		const lineMetarial = new THREE.LineBasicMaterial({ color: 0xffff00 });
		const line = new THREE.LineSegments(
			new THREE.WireframeGeometry(geometry),
			lineMetarial
		);

		const cubeGroup = new THREE.Group();

		cubeGroup.add(cube);
		cubeGroup.add(line);

		this._scene.add(cubeGroup);
		this._cube = cubeGroup;
	}
	_setupControls() {
		new OrbitControls(this._camera, this._elContainer);
	}
	render(time) {
		this._renderer.render(this._scene, this._camera);
		this.update(time);
		requestAnimationFrame(this.render.bind(this));
	}
	update(time) {
		time *= 0.001;
	}
}

const Page1 = () => {
	const container = useRef(null);
	const [app, setApp] = useState(null);

	useEffect(() => {
        const app = new App({ container: container.current });
		setApp(app);
        window.appp = app;
	}, []);

	return (
		<Page className="page">
			<div className="webgl-container" ref={container}></div>
		</Page>
	);
};

export default Page1;
