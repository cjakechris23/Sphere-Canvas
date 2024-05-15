import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry( 3, 64, 64);
const material = new THREE.MeshStandardMaterial( { color: '#00ff83', roughness:0.5 } );
const mesh = new THREE.Mesh( geometry, material );
scene.add(mesh);

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}
const camera = new THREE.PerspectiveCamera( 45, sizes.width/sizes.height, 0.1, 1000 );
camera.position.z = 10
scene.add(camera)

//Light

var light = new THREE.PointLight(0xffffff, 200, 100);
light.position.set(0,10,10)
scene.add(light)



//Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( sizes.width, sizes.height);
renderer.setPixelRatio(2)
renderer.render(scene,camera)

//Controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5


// function animate() {
// 	requestAnimationFrame( animate );

// 	mesh.rotation.x += 0.005;
// 	mesh.rotation.y += 0.005;

// }
// animate();

window.addEventListener('resize', () => {
    //Update Sizes
    console.log(window.innerHeight)
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    //Update Camera
    camera.updateProjectionMatrix()
    camera.aspect = sizes.width/sizes.height
    renderer.setSize(sizes.width,sizes.height)
})

const loop = () => {
    controls.update()
    renderer.render(scene,camera)
    window.requestAnimationFrame(loop)
}
loop()

let mouseDown = false
let rgb = []
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false))


