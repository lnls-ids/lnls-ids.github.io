// SCENE CREATE
const scene = new THREE.Scene();

// CÂMERA CREATE
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.rotation.x += Math.PI/2;
camera.lookAt(0, 0, 0);
camera.position.set(-160, 70, 100);
camera.updateProjectionMatrix();

// RENDER CREATE
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight - 100);
renderer.setClearColor(0xb1c4d8, 1);
document.body.appendChild(renderer.domElement);


// SET LIGHT 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight.position.set(5, 10, 7.5);
scene.add(ambientLight);
scene.add(directionalLight);

const eletron_radius = 1;

// Create a sphere to represent the particle
const particleGeometry = new THREE.SphereGeometry(eletron_radius, 35, 35);
const particleMaterial = new THREE.MeshStandardMaterial({ color: 0x2e6f40 });
const particle = new THREE.Mesh(particleGeometry, particleMaterial);
scene.add(particle);

// Update block positions based on gap
const gap = document.getElementById('gap');
const period = document.getElementById('period');
const rho = document.getElementById('rho')
const phi = document.getElementById('phi')

const block_width = 30;
const block_height = 20;
const d_between = 1;
const d_casset = 1;
const und_period_number = 5;
const und_period = period.value;
let block_length = period.value / 4 - d_between;

const und_gap = parseFloat(gap.value);

// Create blocks on either side of the scene
const blockGeometry = new THREE.BoxGeometry(block_length, block_height, block_width);
const blockMaterialBlue = new THREE.MeshStandardMaterial({
    color: 0x0000ff,
    transparent: true,
    opacity: 0.6
});
const blockMaterialRed = new THREE.MeshStandardMaterial({
    color: 0xf31f00,
    transparent: true,
    opacity: 0.6
});

let mode = 1;

window.alternateMode = (mode_type) => {
    if (mode_type == "in-phase") {
        document.getElementById('in-phase').checked = true;
        document.getElementById('counter-phase').checked = false;
        mode = 1;
    }
    if (mode_type == "counter-phase") {
        document.getElementById('counter-phase').checked = true;
        document.getElementById('in-phase').checked = false;
        mode = -1;
    }
}


// Casset Up Left
let casset_up_left = [];
let casset_up_left_contour = [];
let casset_up_left_pos0 = []
for (let i = 0; i < 4 * und_period_number; i++) {
    const block = new THREE.Mesh(blockGeometry, i % 2 == 0 ? blockMaterialBlue : blockMaterialRed);
    block.position.set(i * (block_length + d_between) - und_period * und_period_number / 2 + (d_between + block_length) / 2, (block_height + und_gap) / 2, -(block_width + d_casset) / 2);
    casset_up_left.push(block);
    casset_up_left_pos0.push([i * (block_length + d_between) - und_period * und_period_number / 2 + (d_between + block_length) / 2, (block_height + und_gap) / 2, -(block_width + d_casset) / 2])
    scene.add(block);

    const blockEdges1 = new THREE.EdgesGeometry(blockGeometry);
    const blockLine1 = new THREE.LineSegments(blockEdges1, new THREE.LineBasicMaterial({ color: 0x00000f }));
    blockLine1.position.copy(block.position);
    casset_up_left_contour.push(blockLine1);
    scene.add(blockLine1);
}

// Casset Up Right
let casset_up_right = [];
let casset_up_right_contour = [];
let casset_up_right_pos0 = [];
for (let i = 0; i < 4 * und_period_number; i++) {
    const block = new THREE.Mesh(blockGeometry, i % 2 == 0 ? blockMaterialBlue : blockMaterialRed);
    block.position.set(i * (block_length + d_between) - und_period * und_period_number / 2 + (d_between + block_length) / 2, (block_height + und_gap) / 2, (block_width + d_casset) / 2);
    casset_up_right.push(block);
    casset_up_right_pos0.push([i * (block_length + d_between) - und_period * und_period_number / 2 + (d_between + block_length) / 2, (block_height + und_gap) / 2, (block_width + d_casset) / 2])
    scene.add(block);

    const blockEdges1 = new THREE.EdgesGeometry(blockGeometry);
    const blockLine1 = new THREE.LineSegments(blockEdges1, new THREE.LineBasicMaterial({ color: 0x00000f }));
    blockLine1.position.copy(block.position);
    casset_up_right_contour.push(blockLine1);
    scene.add(blockLine1);
}

// Casset Bottom Left
let casset_bottom_left = [];
let casset_bottom_left_contour = [];
let casset_bottom_left_pos0 = [];
for (let i = 0; i < 4 * und_period_number; i++) {
    const block = new THREE.Mesh(blockGeometry, i % 2 == 0 ? blockMaterialRed : blockMaterialBlue);
    block.position.set(i * (block_length + d_between) - und_period * und_period_number / 2 + (d_between + block_length) / 2, -(block_height + und_gap) / 2, -(block_width + d_casset) / 2);
    casset_bottom_left.push(block);
    casset_bottom_left_pos0.push([i * (block_length + d_between) - und_period * und_period_number / 2 + (d_between + block_length) / 2, -(block_height + und_gap) / 2, -(block_width + d_casset) / 2])
    scene.add(block);

    const blockEdges1 = new THREE.EdgesGeometry(blockGeometry);
    const blockLine1 = new THREE.LineSegments(blockEdges1, new THREE.LineBasicMaterial({ color: 0x00000f }));
    blockLine1.position.copy(block.position);
    casset_bottom_left_contour.push(blockLine1)
    scene.add(blockLine1);
}

// Casset Bottom Right
let casset_bottom_right = [];
let casset_bottom_right_contour = [];
let casset_bottom_right_pos0 = [];
for (let i = 0; i < 4 * und_period_number; i++) {
    const block = new THREE.Mesh(blockGeometry, i % 2 == 0 ? blockMaterialRed : blockMaterialBlue);
    block.position.set(i * (block_length + d_between) - und_period * und_period_number / 2 + (d_between + block_length) / 2, -(block_height + und_gap) / 2, (block_width + d_casset) / 2);
    casset_bottom_right.push(block);
    casset_bottom_right_pos0.push([i * (block_length + d_between) - und_period * und_period_number / 2 + (d_between + block_length) / 2, -(block_height + und_gap) / 2, (block_width + d_casset) / 2])
    scene.add(block);

    const blockEdges1 = new THREE.EdgesGeometry(blockGeometry);
    const blockLine1 = new THREE.LineSegments(blockEdges1, new THREE.LineBasicMaterial({ color: 0x00000f }));
    blockLine1.position.copy(block.position);
    casset_bottom_right_contour.push(blockLine1)
    scene.add(blockLine1);
}

// Period control
period.addEventListener('input', () => {
    let new_block_length = period.value / 4 - d_between
    let rho_value = parseFloat(rho.value)
    let phi_value = parseFloat(phi.value)

    let value;

    casset_up_left.forEach((block, idx) => {
        value = idx * (new_block_length + d_between + period.value / 4) / 2 - period.value * und_period_number / 2 + (d_between + new_block_length) / 2
        block.position.x = value - mode * rho_value;
        block.scale.x = new_block_length / block_length;
        casset_up_left_pos0[idx][0] = value
    })
    casset_up_left_contour.forEach((contour, idx) => {
        value = idx * (new_block_length + d_between + period.value / 4) / 2 - period.value * und_period_number / 2 + (d_between + new_block_length) / 2
        contour.position.x = value - mode * rho_value;
        contour.scale.x = new_block_length / block_length
    })

    casset_up_right.forEach((block, idx) => {
        value = idx * (new_block_length + d_between + period.value / 4) / 2 - period.value * und_period_number / 2 + (d_between + new_block_length) / 2
        block.position.x = value - mode * (rho_value + phi_value);
        block.scale.x = new_block_length / block_length
        casset_up_right_pos0[idx][0] = value
    })
    casset_up_right_contour.forEach((contour, idx) => {
        value = idx * (new_block_length + d_between + period.value / 4) / 2 - period.value * und_period_number / 2 + (d_between + new_block_length) / 2
        contour.position.x = value - mode * (rho_value + phi_value);
        contour.scale.x = new_block_length / block_length
    })

    casset_bottom_left.forEach((block, idx) => {
        value = idx * (new_block_length + d_between + period.value / 4) / 2 - period.value * und_period_number / 2 + (d_between + new_block_length) / 2
        block.position.x = value - phi_value;
        block.scale.x = new_block_length / block_length
        casset_bottom_left_pos0[idx][0] = value
    })
    casset_bottom_left_contour.forEach((contour, idx) => {
        value = idx * (new_block_length + d_between + period.value / 4) / 2 - period.value * und_period_number / 2 + (d_between + new_block_length) / 2
        contour.position.x = value - phi_value;
        contour.scale.x = new_block_length / block_length
    })

    casset_bottom_right.forEach((block, idx) => {
        value = idx * (new_block_length + d_between + period.value / 4) / 2 - period.value * und_period_number / 2 + (d_between + new_block_length) / 2
        block.position.x = value;
        block.scale.x = new_block_length / block_length
        casset_bottom_right_pos0[idx][0] = value
    })
    casset_bottom_right_contour.forEach((contour, idx) => {
        value = idx * (new_block_length + d_between + period.value / 4) / 2 - period.value * und_period_number / 2 + (d_between + new_block_length) / 2
        contour.position.x = value;
        contour.scale.x = new_block_length / block_length
    })

    particle.position.x = - period.value * und_period_number / 2;
    particle.position.z = 0;
    trailPoints = [];
    z_mean = 0;
    t = 0;
});

// Gap control
gap.addEventListener('input', () => {
    const distance = parseFloat(gap.value);

    casset_up_left.forEach(block => {
        block.position.y = (block_height + distance) / 2;
    })
    casset_up_left_contour.forEach(block => {
        block.position.y = (block_height + distance) / 2;
    })

    casset_up_right.forEach(block => {
        block.position.y = (block_height + distance) / 2;
    })
    casset_up_right_contour.forEach(block => {
        block.position.y = (block_height + distance) / 2;
    })


    casset_bottom_left.forEach(block => {
        block.position.y = -(block_height + distance) / 2;
    })
    casset_bottom_left_contour.forEach(block => {
        block.position.y = -(block_height + distance) / 2;
    })

    casset_bottom_right.forEach(block => {
        block.position.y = -(block_height + distance) / 2;
    })
    casset_bottom_right_contour.forEach(block => {
        block.position.y = -(block_height + distance) / 2;
    })

    particle.position.x = - period.value * und_period_number / 2;
    particle.position.z = 0;
    trailPoints = [];
    z_mean = 0;
    t = 0;

});

// Rho control
rho.addEventListener('input', () => {
    let rho_value = parseFloat(rho.value)
    let phi_value = parseFloat(phi.value)

    casset_up_left.forEach((block, idx) => {
        block.position.x = casset_up_left_pos0[idx][0] - rho_value;
    })
    casset_up_left_contour.forEach((block, idx) => {
        block.position.x = casset_up_left_pos0[idx][0] -  rho_value;
    })

    casset_up_right.forEach((block, idx) => {
        block.position.x = casset_up_right_pos0[idx][0] - rho_value - phi_value;
    })
    casset_up_right_contour.forEach((block, idx) => {
        block.position.x = casset_up_right_pos0[idx][0] - rho_value - phi_value;
    })

});

// Phi control
phi.addEventListener('input', () => {
    let phi_value = parseFloat(phi.value)
    let rho_value = parseFloat(rho.value)

    casset_up_right.forEach((block, idx) => {
        block.position.x = casset_up_right_pos0[idx][0] - rho_value - phi_value;
    })
    casset_up_right_contour.forEach((block, idx) => {
        block.position.x = casset_up_right_pos0[idx][0] - rho_value - phi_value;
    })

    casset_bottom_left.forEach((block, idx) => {
        block.position.x = casset_bottom_left_pos0[idx][0] - mode * phi_value;
    })
    casset_bottom_left_contour.forEach((block, idx) => {
        block.position.x = casset_bottom_left_pos0[idx][0] - mode * phi_value;
    })

});

// Add orbit controls for mouse interaction
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Move the camera back to view the scene
// camera.position.z = 8;

// Time variable for motion
let t = 0;
const dt = 0.32;
const beta_s = 16;
const LIGHT_SPEED = 299792458 // m/s

let beta_x = 0;
let vy = 0;

let halbach = {
    'a': 1.9586,
    'b': -3.4126,
    'c': 0.1496,
}

let Br = 1.3
let B = Br * halbach['a'] * Math.exp(halbach['b'] * (gap.value / period.value) + halbach['c'] * (gap.value / period.value) ** 2)
let K = 93.36 * B * period.value * 1e-3;
let gamma = 5;

let mean_beta_z = 1 - (1 / (2 * gamma ** 2)) - (K ** 2 / (4 * gamma ** 2 * beta_s))

let z_mean = 0;
let beta_z = 0;

particle.position.x = - period.value * und_period_number / 2
particle.position.y = 0
particle.position.z = 0

// Particle trail setup
const trailMaterial = new THREE.LineBasicMaterial({ color: 0x0f0f0f });
let trailPoints = [];
const trailLength = 500; // Number of segments in the trail

for (let i = 0; i < trailLength; i++) {
    trailPoints.push(new THREE.Vector3(particle.position.x, 0, 0));
}

const trailGeometry = new THREE.BufferGeometry().setFromPoints(trailPoints);
const trailLine = new THREE.Line(trailGeometry, trailMaterial);
scene.add(trailLine);


// Animation function
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Start the animation loop
animate();