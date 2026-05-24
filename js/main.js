import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const PORTFOLIO = {
  name: "Nikhil Krishnan",
  role: "Geospatial Specialist & Technical AI Evaluator",
  location: "Chengannur, Kerala, India · Remote-ready globally",
  email: "nikhilkr51@gmail.com",
  phone: "+91-9048871505",
  github: "https://github.com/nikhilkrishnan-ai",
  geosenseRepo: "https://github.com/nikhilkrishnan-ai/nikhilkrishnan-aiREADME.md",
  geosenseLab: "https://nikhilkrishnan-ai.github.io/nikhil-krishnan-portfolio/geosense/",
  gdev: "https://g.dev/nikhilkrishnanAI",
  site: "https://nikhilkrishnan-ai.github.io/nikhil-krishnan-portfolio/",
};

const LANDMARKS = [
  {
    id: "profile",
    shortLabel: "Executive Profile",
    title: "Executive Profile",
    tag: "Principal Briefing",
    color: 0xc9a962,
    position: [0, 0, -24],
    body: `<p><strong>${PORTFOLIO.role}</strong></p>
      <p>${PORTFOLIO.location}</p>
      <p>I am a senior practitioner at the intersection of <strong>geospatial intelligence</strong>, <strong>enterprise logistics</strong>, and <strong>production-grade AI evaluation</strong>—with more than eight years shaping data integrity in high-volume supply chain environments.</p>
      <p>My work is not software for its own sake. I design evaluation frameworks that enterprise AI teams rely on when models must be <strong>accurate, auditable, and aligned</strong>—from RLHF preference calibration to adversarial fact-checking and Chain-of-Thought reasoning validation.</p>
      <p><strong>English:</strong> Expert / verified 100% proficiency · <strong>Malayalam:</strong> Native</p>`,
    links: [
      { label: "Google Developer Profile", href: PORTFOLIO.gdev },
      { label: "GeoSense Forensic Lab", href: PORTFOLIO.geosenseLab },
    ],
  },
  {
    id: "credentials",
    shortLabel: "Credentials",
    title: "Credentials & Trust Signals",
    tag: "Verified Authority",
    color: 0x8fa4c4,
    position: [-24, 0, 0],
    body: `<p>Credentials selected for roles requiring cloud-native AI governance and evaluation rigor:</p>
      <ul>
        <li><strong>Prompt Design in Vertex AI</strong> (Google Cloud Skill Badge) — April 2026</li>
        <li><strong>Gemini Enterprise Agent Ready</strong> — Google Cloud, April 2026</li>
        <li><strong>ChatGPT Prompt Engineering for Developers</strong> — DeepLearning.AI (Andrew Ng), 2026</li>
        <li><strong>Diploma in Warehouse Management</strong> — Alison, Distinction, 2026</li>
        <li><strong>Google Cloud Innovator & Developer Program</strong> — Verified Member, 2026</li>
      </ul>
      <p>These certifications sit alongside operational experience—not as substitutes for it, but as proof of continuous investment in enterprise AI standards.</p>`,
    links: [{ label: "View g.dev Profile", href: PORTFOLIO.gdev }],
  },
  {
    id: "expertise",
    shortLabel: "Expertise Domains",
    title: "Core Expertise Domains",
    tag: "Capability Architecture",
    color: 0x6b9080,
    position: [24, 0, 0],
    body: `<p><strong>AI Training & Model Alignment</strong></p>
      <ul><li>RLHF (Reinforcement Learning from Human Feedback)</li>
      <li>Hallucination detection & response fact-checking</li>
      <li>Model alignment for regulated and operational use cases</li></ul>
      <p><strong>Advanced Prompt Engineering</strong></p>
      <ul><li>Zero-shot / few-shot system design</li>
      <li>Chain-of-Thought (CoT) reasoning evaluation</li>
      <li>Prompt injection & adversarial robustness testing</li></ul>
      <p><strong>Geospatial & Data Integrity</strong></p>
      <ul><li>Telemetry forensics · kinematic anomaly detection</li>
      <li>SQL Server · Python analytics · logistics dataset auditing</li>
      <li>Vertex AI Studio · Google Cloud Console · enterprise reporting</li></ul>`,
    links: [],
  },
  {
    id: "track",
    shortLabel: "Track Record",
    title: "Professional Track Record",
    tag: "8+ Years · Logistics & AI",
    color: 0xb08968,
    position: [-24, 0, 24],
    body: `<p><strong>Technical AI Evaluator</strong> · Freelance · April 2026 – Present</p>
      <ul>
        <li>Deployed and benchmarked generative models in <strong>Vertex AI Studio</strong>—insurance risk identification, summarization, and alignment-sensitive outputs.</li>
        <li>Applied DeepLearning.AI evaluation frameworks (Inferring, Transforming, Expanding) to enforce logical consistency and brand-safe responses.</li>
        <li>Maintained <strong>100% accuracy standards</strong> on English-language evaluation datasets through structured linguistic auditing.</li>
      </ul>
      <p><strong>Data Analyst & Logistics Coordinator</strong> · Project-based · 8+ years cumulative</p>
      <ul>
        <li>Owned inventory logic, WMS workflows, and SQL Server reporting for warehouse operations.</li>
        <li>Audited supply chain datasets to surface stock discrepancies and integrity failures before they reached executive dashboards.</li>
        <li>Produced executive-ready visual documentation (Canva Pro) for cross-functional stakeholders.</li>
      </ul>`,
    links: [],
  },
  {
    id: "geosense",
    shortLabel: "GeoSense Platform",
    title: "GeoSense Intelligence Platform",
    tag: "Signature Case Study",
    color: 0x7d6b8d,
    position: [0, 0, 24],
    body: `<p><strong>Geospatial forensic intelligence</strong> for detecting GPS spoofing and telemetry fraud in logistics—where a single bad coordinate can invalidate an entire operational decision.</p>
      <ul>
        <li>Velocity-constraint reasoning (V = d/t) on real-world Timeline forensic datasets</li>
        <li>Haversine displacement analysis · Apache Beam / Cloud Dataflow pipelines</li>
        <li>Cloud Run APIs for real-time anomaly signaling</li>
        <li>Executive dashboards and JSONL audit trails for compliance review</li>
      </ul>
      <p>GeoSense demonstrates how geospatial rigor and AI evaluation discipline converge in production environments.</p>`,
    links: [
      { label: "Technical Repository", href: PORTFOLIO.geosenseRepo },
      { label: "Interactive Forensic Lab", href: PORTFOLIO.geosenseLab },
    ],
  },
  {
    id: "engage",
    shortLabel: "Engagement",
    title: "Strategic Engagement",
    tag: "Contact",
    color: 0xc9a962,
    position: [24, 0, 24],
    body: `<p>Available for <strong>senior AI evaluation contracts</strong>, <strong>RLHF program design</strong>, <strong>geospatial integrity consulting</strong>, and <strong>enterprise data auditing</strong> engagements.</p>
      <p>I partner with teams who need an evaluator who understands both the model and the operational world it must serve.</p>
      <p><strong>Email:</strong> ${PORTFOLIO.email}<br>
      <strong>Phone:</strong> ${PORTFOLIO.phone}<br>
      <strong>Base:</strong> ${PORTFOLIO.location}</p>`,
    links: [
      { label: "Email Directly", href: `mailto:${PORTFOLIO.email}` },
      { label: "GitHub", href: PORTFOLIO.github },
      { label: "Google Developer", href: PORTFOLIO.gdev },
    ],
  },
];

const canvas = document.getElementById("game");
const loaderEl = document.getElementById("loader");
const startScreen = document.getElementById("start-screen");
const promptEl = document.getElementById("prompt");
const promptLabel = document.getElementById("prompt-label");
const modal = document.getElementById("modal");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");
const speedValue = document.getElementById("speed-value");
const questText = document.getElementById("quest-text");
const touchControls = document.getElementById("touch-controls");

const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
let browseMode = false;
let drivingActive = false;
const visited = new Set();
const keys = {};
let nearest = null;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87a96b);
scene.fog = new THREE.Fog(0x9eb388, 35, 95);

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 8, 14);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

scene.add(new THREE.HemisphereLight(0xdce8ff, 0x3d5a34, 0.55));
const sun = new THREE.DirectionalLight(0xfff5e6, 1.15);
sun.position.set(20, 35, 15);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 80;
sun.shadow.camera.left = -40;
sun.shadow.camera.right = 40;
sun.shadow.camera.top = 40;
sun.shadow.camera.bottom = -40;
scene.add(sun);

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(120, 120),
  new THREE.MeshStandardMaterial({ color: 0x5a7d4a, roughness: 1 })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

function addRoad(x, z, w, d) {
  const road = new THREE.Mesh(
    new THREE.BoxGeometry(w, 0.08, d),
    new THREE.MeshStandardMaterial({ color: 0x3a3f47, roughness: 0.95 })
  );
  road.position.set(x, 0.04, z);
  road.receiveShadow = true;
  scene.add(road);
  return road;
}

addRoad(0, 0, 10, 56);
addRoad(0, 0, 56, 10);

for (let i = -24; i <= 24; i += 8) {
  if (i !== 0) {
    const stripe = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.09, 2.2),
      new THREE.MeshBasicMaterial({ color: 0xf0ead6 })
    );
    stripe.position.set(0, 0.05, i);
    scene.add(stripe);
    const stripe2 = stripe.clone();
    stripe2.position.set(i, 0.05, 0);
    stripe2.rotation.y = Math.PI / 2;
    scene.add(stripe2);
  }
}

const car = new THREE.Group();
const bodyMat = new THREE.MeshStandardMaterial({ color: 0xc9a962, metalness: 0.55, roughness: 0.35 });
const cabinMat = new THREE.MeshStandardMaterial({ color: 0x1a1f28, metalness: 0.4, roughness: 0.5 });
const body = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.55, 3.1), bodyMat);
body.position.y = 0.55;
body.castShadow = true;
const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.48, 1.5), cabinMat);
cabin.position.set(0, 0.98, -0.15);
cabin.castShadow = true;
car.add(body, cabin);

const wheelGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.22, 16);
const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
[[-0.85, 0.32, 1], [0.85, 0.32, 1], [-0.85, 0.32, -1], [0.85, 0.32, -1]].forEach(([x, y, z]) => {
  const w = new THREE.Mesh(wheelGeo, wheelMat);
  w.rotation.z = Math.PI / 2;
  w.position.set(x, y, z);
  w.castShadow = true;
  car.add(w);
});
car.position.set(0, 0, 8);
scene.add(car);

const landmarkMeshes = [];
const landmarkGroup = new THREE.Group();
scene.add(landmarkGroup);

LANDMARKS.forEach((landmark) => {
  const pedestal = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 0.35, 2.4),
    new THREE.MeshStandardMaterial({ color: 0x2a3038, roughness: 0.8 })
  );
  pedestal.position.set(landmark.position[0], 0.18, landmark.position[2]);
  pedestal.receiveShadow = true;

  const monolith = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 3.6, 2.2),
    new THREE.MeshStandardMaterial({
      color: 0xf4f1ea,
      emissive: landmark.color,
      emissiveIntensity: 0.08,
      roughness: 0.35,
      metalness: 0.15,
    })
  );
  monolith.position.set(landmark.position[0], 2.1, landmark.position[2]);
  monolith.castShadow = true;
  monolith.userData = landmark;

  const accent = new THREE.Mesh(
    new THREE.BoxGeometry(0.28, 0.12, 2.25),
    new THREE.MeshStandardMaterial({ color: landmark.color, emissive: landmark.color, emissiveIntensity: 0.35 })
  );
  accent.position.set(landmark.position[0], 3.85, landmark.position[2]);

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(2.2, 2.55, 32),
    new THREE.MeshBasicMaterial({ color: landmark.color, transparent: true, opacity: 0.45, side: THREE.DoubleSide })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(landmark.position[0], 0.06, landmark.position[2]);

  landmarkGroup.add(pedestal, monolith, accent, ring);
  landmarkMeshes.push({ mesh: monolith, ring, landmark });
});

function addTrees() {
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a3728 });
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x3d6b45 });
  for (let i = 0; i < 36; i++) {
    const angle = (i / 36) * Math.PI * 2;
    const r = 28 + (i % 5);
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    if (Math.abs(x) < 8 && Math.abs(z) < 8) continue;
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 1.4, 6), trunkMat);
    trunk.position.set(x, 0.7, z);
    const leaves = new THREE.Mesh(new THREE.ConeGeometry(0.9, 2.2, 7), leafMat);
    leaves.position.set(x, 2.2, z);
    trunk.castShadow = leaves.castShadow = true;
    scene.add(trunk, leaves);
  }
}
addTrees();

let orbitControls = null;
let speed = 0;
let steer = 0;
const maxSpeed = 22;
const accel = 32;
const brakeForce = 45;
const friction = 14;
const turnSpeed = 2.4;
const interactDist = 5.5;
const bounds = 28;
let prevTime = performance.now();

const cameraOffset = new THREE.Vector3(0, 4.2, 7.5);
const cameraLook = new THREE.Vector3();

function bindKeys() {
  window.addEventListener("keydown", (e) => {
    keys[e.code] = true;
    if (e.code === "KeyE" && nearest && modal.classList.contains("hidden")) {
      openLandmark(nearest);
    }
  });
  window.addEventListener("keyup", (e) => { keys[e.code] = false; });

  document.querySelectorAll(".touch-btn").forEach((btn) => {
    const code = btn.dataset.key;
    btn.addEventListener("touchstart", (e) => { e.preventDefault(); keys[code] = true; });
    btn.addEventListener("touchend", () => { keys[code] = false; });
    btn.addEventListener("mousedown", () => { keys[code] = true; });
    btn.addEventListener("mouseup", () => { keys[code] = false; });
  });
}
bindKeys();

function updateProgress() {
  const n = visited.size;
  progressFill.style.width = `${(n / LANDMARKS.length) * 100}%`;
  progressText.textContent = `${n} / ${LANDMARKS.length}`;
  questText.textContent = n === LANDMARKS.length
    ? "Full dossier unlocked. Thank you for reviewing my profile."
    : `Visit ${LANDMARKS.length - n} more landmark${LANDMARKS.length - n === 1 ? "" : "s"} to complete the tour.`;
}

function openLandmark(landmark) {
  visited.add(landmark.id);
  updateProgress();
  document.getElementById("modal-tag").textContent = landmark.tag;
  document.getElementById("modal-title").textContent = landmark.title;
  document.getElementById("modal-body").innerHTML = landmark.body;
  const linksEl = document.getElementById("modal-links");
  linksEl.innerHTML = "";
  landmark.links.forEach((l) => {
    const a = document.createElement("a");
    a.href = l.href;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = l.label;
    linksEl.appendChild(a);
  });
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

document.getElementById("modal-close").addEventListener("click", closeModal);
document.getElementById("modal-backdrop").addEventListener("click", closeModal);

function startDriving() {
  startScreen.classList.add("gone");
  drivingActive = true;
  browseMode = false;
  if (isMobile) {
    touchControls.classList.remove("hidden");
    document.getElementById("controls-desktop").classList.add("hidden");
    document.getElementById("controls-mobile").classList.remove("hidden");
  }
}

function startBrowse() {
  startScreen.classList.add("gone");
  browseMode = true;
  drivingActive = false;
  orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enableDamping = true;
  orbitControls.target.set(0, 1.5, 0);
  orbitControls.maxPolarAngle = Math.PI / 2.2;
  orbitControls.minDistance = 10;
  orbitControls.maxDistance = 55;
  touchControls.classList.remove("hidden");
  document.getElementById("controls-desktop").classList.add("hidden");
  document.getElementById("controls-mobile").classList.remove("hidden");
}

document.getElementById("btn-start").addEventListener("click", startDriving);
document.getElementById("btn-mobile").addEventListener("click", startBrowse);

renderer.domElement.addEventListener("click", () => {
  if (browseMode && nearest) openLandmark(nearest);
});

function inputActive(codeAlt, codeMain) {
  return keys[codeAlt] || keys[codeMain];
}

function updateCar(delta) {
  const forward = inputActive("ArrowUp", "KeyW");
  const backward = inputActive("ArrowDown", "KeyS");
  const left = inputActive("ArrowLeft", "KeyA");
  const right = inputActive("ArrowRight", "KeyD");
  const handbrake = keys.Space;

  if (forward) speed += accel * delta;
  if (backward) speed -= brakeForce * delta;

  const drag = handbrake ? friction * 2.2 : friction;
  if (speed > 0) speed = Math.max(0, speed - drag * delta);
  else if (speed < 0) speed = Math.min(0, speed + drag * delta);

  speed = THREE.MathUtils.clamp(speed, -8, maxSpeed);

  steer = 0;
  if (left) steer += 1;
  if (right) steer -= 1;
  if (Math.abs(speed) > 0.4) {
    car.rotation.y += steer * turnSpeed * delta * Math.sign(speed);
  }

  car.position.x += Math.sin(car.rotation.y) * speed * delta;
  car.position.z += Math.cos(car.rotation.y) * speed * delta;

  car.position.x = THREE.MathUtils.clamp(car.position.x, -bounds, bounds);
  car.position.z = THREE.MathUtils.clamp(car.position.z, -bounds, bounds);

  speedValue.textContent = Math.round(Math.abs(speed) * 3.8);
}

function updateCamera(delta) {
  const offset = cameraOffset.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), car.rotation.y);
  const desired = car.position.clone().add(offset);
  camera.position.lerp(desired, 1 - Math.pow(0.001, delta));
  cameraLook.copy(car.position);
  cameraLook.y += 1.1;
  camera.lookAt(cameraLook);
}

function findNearest() {
  let best = null;
  let bestD = interactDist;
  for (const { mesh, landmark } of landmarkMeshes) {
    const d = car.position.distanceTo(mesh.position);
    if (d < bestD) {
      bestD = d;
      best = landmark;
    }
  }
  return best;
}

function animateLandmarks(time) {
  landmarkMeshes.forEach(({ mesh, ring }, i) => {
    ring.rotation.z = time * 0.0004;
    mesh.position.y = 2.1 + Math.sin(time * 0.0015 + i) * 0.04;
  });
}

function animate() {
  requestAnimationFrame(animate);
  const time = performance.now();
  const delta = Math.min((time - prevTime) / 1000, 0.05);
  prevTime = time;

  if (drivingActive) updateCar(delta);
  if (drivingActive || browseMode) {
    if (drivingActive) updateCamera(delta);
    if (orbitControls) orbitControls.update();
    nearest = findNearest();
    const showPrompt = nearest && (drivingActive ? Math.abs(speed) < 6 : true);
    if (showPrompt) {
      promptEl.classList.remove("hidden");
      promptLabel.textContent = browseMode ? nearest.shortLabel : `${nearest.shortLabel} — press E`;
    } else {
      promptEl.classList.add("hidden");
    }
  }

  animateLandmarks(time);
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

setTimeout(() => loaderEl.classList.add("done"), 900);
updateProgress();
animate();
