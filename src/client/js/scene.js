import * as THREE from 'three';

const generateScene = (parameters) => {
  const {canvas, image} = parameters;
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
  );

  const renderer = new THREE.WebGLRenderer({canvas: canvas});
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Append to DOM
  document.body.appendChild(renderer.domElement);

  const loader = new THREE.TextureLoader();

  const texture = loader.load(image);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({map: texture});
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  const animate = function() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  animate();
};

export default generateScene;
