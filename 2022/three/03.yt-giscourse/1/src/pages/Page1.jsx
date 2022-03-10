import { useState , useEffect , useRef } from "react";
import * as THREE from "three";

import styled from "styled-components";

const Page = styled.div``;

class App {
	constructor({container}) {
		const elContainer = container;

		this._elContainer = elContainer;

		const renderer = new THREE.WebGLRenderer({ antialias: true });

		this._renderer = renderer;

		const scene = new THREE.Scene();

		this._scene = scene;

		this._setupCamera();
		this._setupLight();
		this._setupModel();

		window.addEventListener("resize", this.resize.bind(this));
        this.resize();
        elContainer.appendChild(renderer.domElement)

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
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const metarial = new THREE.MeshPhongMaterial({ color: 0xff0000 });

		const cube = new THREE.Mesh(geometry, metarial);

		this._scene.add(cube);
		this._cube = cube;
	}
	render(time) {
		this._renderer.render(this._scene, this._camera);
		this.update(time);
		requestAnimationFrame(this.render.bind(this));
	}
	update(time) {
        time *= 0.001;
        this._cube.rotation.x = time;
        this._cube.rotation.y = time;
    }
}

const Page1 = () => {

    const container = useRef(null);
    const [ app , setApp ] = useState(null);

    const launchApp = () => {
        if(!app) {
            setApp(new App({container: container.current}));
        }
    }

	useEffect(() => {
        launchApp();
	});

	return (
		<Page className="page">
			<div className="webgl-container" ref={container} ></div>
		</Page>
	);
};

export default Page1;
