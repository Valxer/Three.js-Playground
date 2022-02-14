import { createApp } from 'vue'
import App from './App.vue'
import * as THREE from 'three'
import * as dat from 'dat.gui'

// ------ VUE APP CREATION --------
createApp(App).mount('#app')

// ------- THREE JS PART -----------

// ********** FUNCTIONS *************
// Animating the object
function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    // mesh.rotation.x += 0.01
    // mesh.rotation.y += 0.01
}

// Allows to modify z coordinates of our plane to jag it
function addJaggedness() {
    const { array } = mesh.geometry.attributes.position
    for (let i = 0; i < array.length; i += 3) {
        array[i + 2] += Math.random()
    }
}

// Modifies mesh geometry using dat.gui
function updateMesh() {
    mesh.geometry.dispose()
    mesh.geometry = new THREE.PlaneGeometry(
        world.object.width,
        world.object.height,
        world.object.widthSegments,
        world.object.heightSegments)
    addJaggedness()
}

//********** CREATING THREEJS DISPLAY *********
// Creating scene camera and renderer for our three js display
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()

// Setting the size, definition of our display and adding it to html
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

// Creating the shape of our object
const geometry = new THREE.PlaneGeometry(10, 10, 10, 10)

// Creating the material in which is made the object
const material = new THREE.MeshPhongMaterial({
    color : 0xff0000,
    side: THREE.DoubleSide,
    flatShading: THREE.FlatShading
})

// Combining shape and material into a mesh
const mesh = new THREE.Mesh(geometry, material)
addJaggedness()

// Creating a light and positioning it 
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 0, 5)

// Adding the object and light to the scene and setting camera position in oreder to see the object
scene.add(mesh)
scene.add(light)
camera.position.z = 20

// Creating dat.gui interface to interact with our plane dimensions dynamically
const gui = new dat.GUI()
const world = {
    object: {
        width: 10,
        height: 10,
        widthSegments: 10,
        heightSegments: 10
    }
}
gui.add(world.object, 'width', 1, 20).onChange(() => {
    updateMesh()
})
gui.add(world.object, 'height', 1, 20).onChange(() => {
    updateMesh()
})
gui.add(world.object, 'widthSegments', 1, 20).onChange(() => {
    updateMesh()
})
gui.add(world.object, 'heightSegments', 1, 20).onChange(() => {
    updateMesh()
})

animate()
