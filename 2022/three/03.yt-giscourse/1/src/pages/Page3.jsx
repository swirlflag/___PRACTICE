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
		let geometry = new THREE.BoxGeometry(1,1,1,2,2,2);
		geometry = new THREE.CircleGeometry(
			0.5, // radius
			30, // segment
			Math.PI * 0.2, // 시작각
			Math.PI * 1.5 // 연장각
		);
		geometry = new THREE.ConeGeometry(
            0.5, // 바닥 radius
            2, // 원뿔 높이
            8, // 원뿔 바닥 vertex 갯수
            7, // 원뿔 높이 방향 segment
            true, // 원뿔 밑면 개방 여부
            0, // 시작각
            Math.PI, // 연장각
        );
        geometry = new THREE.CylinderGeometry(
            0.6, // 윗면 radius
            0.8, // 아랫면 radius
            2, // 높이,
            10, // 원통 둘레 방향 segment,
            5, // 원통 높이 방향 segment,
            true, // 윗면,아랫면 개방 여부,
            0, // 시작각
            Math.PI, // 연장각
        );
        geometry = new THREE.SphereGeometry(
            1.1,// radius,
            6, // 수평 segment
            50, // 수직 segment,
            0, // 수평 시작각
            Math.PI/2, // 수평 연장각
            0, // 수직 시작각
            Math.PI/2, // 수직 연장각
        );

        geometry = new THREE.RingGeometry(
            0.5, // 내부 radius,
            2, // 외부 radius
            52, // 둘레 segment
            20, // 내부 방향 segment,
            0, // 시작각
            Math.PI, // 연장각
        );

        geometry = new THREE.PlaneGeometry(
            6, // 너비
            2, // 높이
            10, // 너비 segment,
            5, // 높이 segment
        );

        geometry = new THREE.TorusGeometry(
            2, // torus radius
            0.9, // 두께 radius
            16, // 방사 방향 segment
            10, // 원통 segment
            Math.PI, //연장각
        );

        geometry = new THREE.TorusKnotGeometry(
            1.6, // radius,
            0.1, // 원통의 radius
            20, // knot segment
            10, // 원통 둘레 segment
            3,4 // 매듭 반복 횟수
        );


		const fillMetarial = new THREE.MeshPhongMaterial({ color: 0x515151});

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
