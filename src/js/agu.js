// SCENE CREATE
const scene = new THREE.Scene();

// CÂMERA CREATE
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.rotation.x += Math.PI/2;
camera.lookAt(0, 0, 0);
camera.position.set(30, 10, 100);
camera.updateProjectionMatrix();

// RENDER CREATE
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
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
const particleMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const particle = new THREE.Mesh(particleGeometry, particleMaterial);
scene.add(particle);

// Update block positions based on gap
const gap = document.getElementById('gap');
const period = document.getElementById('period');

const block_width = 30;
const block_height = 20;
const d_between = 1;
const und_period_number = 10;
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

// Casset sup
let casset_sup = [];
let casset_sup_contour = [];
for(let i = 0; i < 4*und_period_number; i++){
    const block = new THREE.Mesh(blockGeometry, i%2 == 0 ? blockMaterialBlue : blockMaterialRed);
    block.position.set(i*(block_length+d_between) - und_period*und_period_number/2 + (d_between+block_length)/2, (block_height + und_gap) / 2, 0);
    casset_sup.push(block);
    scene.add(block);

    const blockEdges1 = new THREE.EdgesGeometry(blockGeometry);
    const blockLine1 = new THREE.LineSegments(blockEdges1, new THREE.LineBasicMaterial({ color: 0x00000f }));
    blockLine1.position.copy(block.position);
    casset_sup_contour.push(blockLine1);
    scene.add(blockLine1);
}

// Casset inf
let casset_inf = [];
let casset_inf_contour = [];
for(let i = 0; i < 4*und_period_number; i++){
    const block = new THREE.Mesh(blockGeometry, i%2 == 0 ? blockMaterialRed : blockMaterialBlue);
    block.position.set(i*(block_length+d_between) - und_period*und_period_number/2 + (d_between+block_length)/2, -(block_height + und_gap) / 2, 0);
    casset_inf.push(block);
    scene.add(block);

    const blockEdges1 = new THREE.EdgesGeometry(blockGeometry);
    const blockLine1 = new THREE.LineSegments(blockEdges1, new THREE.LineBasicMaterial({ color: 0x00000f }));
    blockLine1.position.copy(block.position);
    casset_inf_contour.push(blockLine1)
    scene.add(blockLine1);
}

// Gap control
gap.addEventListener('input', () => {
    const distance = parseFloat(gap.value);

    casset_sup.forEach( block => {
        block.position.y = (block_height + distance) / 2;
    })
    casset_sup_contour.forEach( block => {
        block.position.y = (block_height + distance) / 2;
    })

    casset_inf.forEach( block => {
        block.position.y = -(block_height + distance) / 2;
    })
    casset_inf_contour.forEach( block => {
        block.position.y = -(block_height + distance) / 2;
    })

    particle.position.x = - period.value * und_period_number / 2;
    particle.position.z = 0;
    trailPoints = [];
    z_mean = 0;
    t = 0;

});

const casset_sup0 = casset_sup;
const casset_sup_contour0 = casset_sup_contour;

// Period control
period.addEventListener('input', () => {
    let new_block_length = period.value / 4 - d_between

    casset_sup.forEach( (block, idx) => {
        block.position.x = idx*(new_block_length+d_between + period.value/4)/2 - period.value*und_period_number/2 + (d_between+new_block_length)/2;
        block.scale.x = new_block_length/block_length
    })
    casset_sup_contour.forEach( (contour, idx) => {
        contour.position.x = idx*(new_block_length+d_between + period.value/4)/2 - period.value*und_period_number/2 + (d_between+new_block_length)/2;
        contour.scale.x = new_block_length/block_length
    })

    casset_inf.forEach( (block, idx) => {
        block.position.x = idx*(new_block_length+d_between + period.value/4)/2 - period.value*und_period_number/2 + (d_between+new_block_length)/2;
        block.scale.x = new_block_length/block_length
    })
    casset_inf_contour.forEach( (contour, idx) => {
        contour.position.x = idx*(new_block_length+d_between + period.value/4)/2 - period.value*und_period_number/2 + (d_between+new_block_length)/2;
        contour.scale.x = new_block_length/block_length
    })

    particle.position.x = - period.value * und_period_number / 2;
    particle.position.z = 0;
    trailPoints = [];
    z_mean = 0;
    t = 0;
});


// Add axes helper for reference
// const axesHelper = new THREE.AxesHelper(20);
//reset axes colors
// var colors = axesHelper.geometry.attributes.color;

// colors.setXYZ( 0, 1, 1, 0 ); // index, R, G, B
// colors.setXYZ( 1, 1, 0, 0 ); // red
// colors.setXYZ( 2, 1, 1, 0 );
// colors.setXYZ( 3, 0, 1, 0 ); // green
// colors.setXYZ( 4, 1, 0, 1 );
// colors.setXYZ( 5, 1, 1, 1 ); // blue
// scene.add(axesHelper);

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
let B = Br*halbach['a']*Math.exp(halbach['b']*(gap.value/period.value) + halbach['c']*(gap.value/period.value)**2)
let K = 93.36 * B * period.value * 1e-3;
let gamma = 5;

let mean_beta_z = 1 - (1 / (2 * gamma ** 2)) - (K ** 2 / (4 * gamma ** 2 * beta_s))

let z_mean = 0;
let beta_z = 0;

particle.position.x =  - period.value * und_period_number /2
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

    // Move the particle back and forth between the blocks
    z_mean += mean_beta_z*dt
    B = Br*halbach['a']*Math.exp(halbach['b']*(gap.value/period.value) + halbach['c']*(gap.value/period.value)**2)
    K = 93.36 * B * period.value * 1e-3

    beta_x = (K / gamma) * Math.cos((2 * Math.PI / (period.value)) * z_mean)
    beta_z = mean_beta_z - (K**2/(4*gamma**2 * beta_s))*Math.cos((4*Math.PI/(period.value))*z_mean)

    particle.position.x += beta_z * dt ;
    particle.position.z +=  beta_x * dt;

    // Update trail
    trailPoints.push(particle.position.clone());
    if (trailPoints.length > trailLength) {
        trailPoints.shift();
    }
    trailGeometry.setFromPoints(trailPoints);

    // Increment time
    t += dt;

    // Render the scene
    if (particle.position.x > period.value * und_period_number / 2) {
        particle.position.x = - period.value * und_period_number / 2;
        particle.position.z = 0;
        z_mean = 0;
        trailPoints = [];
    }
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