import "./style.css";
import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// adding group
const group = new THREE.Group();
scene.add(group);
// group.rotation.x = 2;
// group.scale.y = -2;

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
group.add(cube1);

cube1.rotation.y = 2;
cube1.rotation.z = 2;
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube2.position.x = -2;
cube2.position.y = -1;
group.add(cube2);
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x = 2;
cube3.position.y = 1;
group.scale.y = 1.5;
group.add(cube3);

// position
// mesh.position.x = -1;
// mesh.position.y = 1;
// mesh.position.z = 0.5;
// mesh.position.set(0.7, -0.6, 1);

// group.rotation.set(1, 2, 3);
// AxesHelper
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

//scale
// mesh.scale.set(1.2, 1, 1.1);

//rotate
// mesh.rotation.x = Math.PI * 0.25;

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);
camera.position.z = 3;
camera.lookAt(new THREE.Vector3(2, 2, 0));
// camera.position.y = 0.4;
// camera.position.set(1, 0.4, 2.5);
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

let count = 0;
const tick = () => {
  if (count < 100) {
    group.rotation.y += 0.1;
  } else {
    group.rotation.y -= 0.1;
  }
  count++;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
