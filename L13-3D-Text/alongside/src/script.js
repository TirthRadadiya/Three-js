import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//Axes Helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.intensity = 100000;
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
gui.add(pointLight.position, "x", -10, 10, 0.001);
gui.add(pointLight.position, "y", -10, 10, 0.001);
gui.add(pointLight.position, "z", -10, 10, 0.001);

// const lightSphere = new THREE.SphereGeometry(1, 20, 20);
// lightSphere.add(pointLight);
// scene.add(pointLight);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/1.png");

/**
 * Fonts
 */
const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  let textGeometry = new TextGeometry("Tony Stein", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  //   textGeometry.computeBoundingBox();
  //   textGeometry.translate(
  //     -(textGeometry.boundingBox.max.x - 0.02) * 0.5, // Subtract bevel size
  //     -(textGeometry.boundingBox.max.y - 0.02) * 0.5, // Subtract bevel size
  //     -(textGeometry.boundingBox.max.z - 0.03) * 0.5 // Subtract bevel thickness
  //   );
  textGeometry.center();
  const textMaterial = new THREE.MeshStandardMaterial();
  textMaterial.metalness = 1;
  textMaterial.roughness = 0;
  gui.add(textMaterial, "metalness", 0, 1, 0.001);
  gui.add(textMaterial, "roughness", 0, 1, 0.001);
  textGeometry.deleteAttribute("normal");
  textGeometry.deleteAttribute("uv");
  textGeometry = mergeVertices(textGeometry);
  textGeometry.computeVertexNormals();

  //   const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  //   textMaterial.map = matcapTexture;
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  const environmentMapTexture = cubeTextureLoader.load([
    "/textures/environmentMaps/0/px.jpg",
    "/textures/environmentMaps/0/nx.jpg",
    "/textures/environmentMaps/0/py.jpg",
    "/textures/environmentMaps/0/ny.jpg",
    "/textures/environmentMaps/0/pz.jpg",
    "/textures/environmentMaps/0/nz.jpg",
  ]);
  textMaterial.envMap = environmentMapTexture;
  const text = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(text);

  const sphereGeometry = new THREE.SphereGeometry(0.3, 30, 20, 4);
  const sphereMaterial = new THREE.MeshStandardMaterial();

  const obj = [];

  for (let i = 0; i < 300; i++) {
    const sphere = new THREE.Mesh(sphereGeometry, textMaterial);
    let x_co = (Math.random() - 0.5) * 10;
    let y_co = (Math.random() - 0.5) * 10;
    let z_co = (Math.random() - 0.5) * 10;
    // sphere.position.x = (Math.random() - 0.5) * 10;
    // sphere.position.y = (Math.random() - 0.5) * 10;
    // sphere.position.z = (Math.random() - 0.5) * 10;
    sphere.position.x = x_co;
    sphere.position.y = y_co;
    sphere.position.z = z_co;

    obj[i] = {
      x: x_co,
      y: y_co,
      z: z_co,
    };

    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const environmentMapTexture = cubeTextureLoader.load([
      "/textures/environmentMaps/0/px.jpg",
      "/textures/environmentMaps/0/nx.jpg",
      "/textures/environmentMaps/0/py.jpg",
      "/textures/environmentMaps/0/ny.jpg",
      "/textures/environmentMaps/0/pz.jpg",
      "/textures/environmentMaps/0/nz.jpg",
    ]);
    sphereMaterial.envMap = environmentMapTexture;

    const scale = Math.random();
    sphere.scale.set(scale, scale, scale);
    scene.add(sphere);
  }
});

/**
 * Object
 */
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial()
// );

// scene.add(cube);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 0.5;
camera.position.z = 4;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  camera.position.x = Math.cos(elapsedTime) * 2.5;
  camera.position.z = Math.sin(elapsedTime) * 2.5;
  camera.position.y = Math.abs(Math.sin(elapsedTime)) * 3;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
