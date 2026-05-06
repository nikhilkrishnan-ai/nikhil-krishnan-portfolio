import * as THREE from 'three';
import * as RAPIER from '@dimforge/rapier3d-compat';

const app = document.getElementById('app');
const canvas = document.createElement('canvas');
app.appendChild(canvas);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f1720);

const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 2000);
camera.position.set(0, 4, 8);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);
scene.add(new THREE.AmbientLight(0x888888, 0.6));

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.MeshStandardMaterial({ color: 0x111827 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// NK logo (SVG plane)
const svgText = `<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'><rect fill='#0ea5a4' width='256' height='256' rx='36'/><text x='50%' y='54%' font-family='Arial, Helvetica, sans-serif' font-size='120' fill='#fff' text-anchor='middle' alignment-baseline='central'>NK</text></svg>`;
const blob = new Blob([svgText], { type: 'image/svg+xml' });
const url = URL.createObjectURL(blob);
new THREE.TextureLoader().load(url, (tex) => {
  tex.encoding = THREE.sRGBEncoding;
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.8), mat);
  plane.position.set(-6, 1.2, -6);
  scene.add(plane);
});

// placeholder vehicle
const vehicle = new THREE.Mesh(
  new THREE.BoxGeometry(1.2, 0.6, 2),
  new THREE.MeshStandardMaterial({ color: 0x0ea5a4 })
);
vehicle.position.set(0, 0.5, 0);
scene.add(vehicle);

// hotspot
const hotspot = new THREE.Mesh(
  new THREE.CylinderGeometry(0.4, 0.4, 0.02, 32),
  new THREE.MeshBasicMaterial({ color: 0xffb703 })
);
hotspot.position.set(4, 0.01, -2);
scene.add(hotspot);

// camera follow params
let camPos = new THREE.Vector3().copy(camera.position);
const offset = new THREE.Vector3(0, 2.4, 6);
const stiffness = 8.0;

const keys = {};
window.addEventListener('keydown', e => (keys[e.code] = true));
window.addEventListener('keyup', e => (keys[e.code] = false));

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('pointerdown', e => {
  mouse.x = (e.clientX / innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObject(hotspot);
  if (hits.length) openOverlay();
});

function openOverlay() {
  let overlay = document.getElementById('case-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'case-overlay';
    Object.assign(overlay.style, {
      position: 'fixed',
      right: '20px',
      top: '20px',
      width: '360px',
      background: '#fff',
      padding: '18px',
      borderRadius: '8px',
      boxShadow: '0 6px 24px rgba(0,0,0,0.25)',
      zIndex: 9999
    });
    overlay.innerHTML = `
      <h3>Cloud-Based GPS Forensic Tool</h3>
      <p>Developed a serverless Python app on GCP Cloud Run to detect GPS spoofing and location jumps. Used Haversine models for distance anomaly detection and CI/CD via GitHub.</p>
      <a href="https://g.dev/nikhilkrishnanAI" target="_blank">View portfolio</a>
      <div style="text-align:right;margin-top:8px;"><button id="close-ov">Close</button></div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('close-ov').onclick = () => overlay.remove();
  }
}

function updateVehicle(dt) {
  const forward = (keys['KeyW'] || keys['ArrowUp']) ? 1 : 0;
  const back = (keys['KeyS'] || keys['ArrowDown']) ? 1 : 0;
  const left = (keys['KeyA'] || keys['ArrowLeft']) ? 1 : 0;
  const right = (keys['KeyD'] || keys['ArrowRight']) ? 1 : 0;
  const accel = forward - back;
  vehicle.position.z -= accel * dt * 6;
  vehicle.rotation.y += (right - left) * dt * 1.8;
  vehicle.position.x += Math.sin(vehicle.rotation.y) * 0.02 * accel;
}

const clock = new THREE.Clock();
function animate() {
  const dt = clock.getDelta();
  updateVehicle(dt);
  const desired = vehicle.position.clone().add(offset.clone().applyEuler(vehicle.rotation));
  camPos.lerp(desired, 1 - Math.exp(-stiffness * dt));
  camera.position.copy(camPos);
  camera.lookAt(vehicle.position);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
