import { createApp } from 'vue'
import App from './App.vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import gsap from 'gsap'

// ------ VUE APP CREATION --------
createApp(App).mount('#app')

// ------- THREE JS PART -----------

// ********** FUNCTIONS *************
// Handles all animation/effects on our object
function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    raycaster.setFromCamera(mouse, camera)
    const intersect = raycaster.intersectObject(mesh)
    if (intersect.length > 0) {
        const { color } = intersect[0].object.geometry.attributes

        // color.setX(intersect[0].face.a, .1)
        // color.setY(intersect[0].face.a, .5)
        // color.setZ(intersect[0].face.a, 1)
        
        // color.setX(intersect[0].face.b, .1)
        // color.setY(intersect[0].face.b, .5)
        // color.setZ(intersect[0].face.b, 1)
        
        // color.setX(intersect[0].face.c, .1)
        // color.setY(intersect[0].face.c, .5)
        // color.setZ(intersect[0].face.c, 1)

        // color.needsUpdate = true

        const initialColor =  {
            r: 0,
            g: .19,
            b: .4
        }
        const hoverColor = {
            r: .1,
            g: .5,
            b: 1
        }
        gsap.to(hoverColor, {
            r: initialColor.r,
            g: initialColor.g,
            b: initialColor.b,
            onUpdate: () => {
                color.setX(intersect[0].face.a, hoverColor.r)
                color.setY(intersect[0].face.a, hoverColor.g)
                color.setZ(intersect[0].face.a, hoverColor.b)

                color.setX(intersect[0].face.b, hoverColor.r)
                color.setY(intersect[0].face.b, hoverColor.g)
                color.setZ(intersect[0].face.b, hoverColor.b)

                color.setX(intersect[0].face.c, hoverColor.r)
                color.setY(intersect[0].face.c, hoverColor.g)
                color.setZ(intersect[0].face.c, hoverColor.b)

                color.needsUpdate = true
            }
        })
    }
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
    //setting plane colors
    const colors = []
    for (let i = 0; i < mesh.geometry.attributes.position.count; i++) {
        colors.push(0, .19, .4)
    }

    mesh.geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(new Float32Array(colors), 3)
    )
}

//********** CREATING THREEJS DISPLAY *********

//Creating a raycaster to highlight our mouse position
const raycaster = new THREE.Raycaster()

// Creating scene camera and renderer for our three js display
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()

// Setting the size, definition of our display and adding it to html
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

// Creating the shape of our object
const geometry = new THREE.PlaneGeometry(400, 400, 50, 50)

// Creating the material in which is made the object
const material = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    flatShading: THREE.FlatShading,
    vertexColors: true
})

// Combining shape and material into a mesh
const mesh = new THREE.Mesh(geometry, material)
addJaggedness()
scene.add(mesh)

//setting plane colors
const colors = []
for (let i = 0; i < mesh.geometry.attributes.position.count; i++) {
    colors.push(0, .19, .4)
}

mesh.geometry.setAttribute(
    'color',
    new THREE.BufferAttribute(new Float32Array(colors), 3)
)

// Creating a light, backlight and positioning them 
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 0, 1)
scene.add(light)
const backLight = new THREE.DirectionalLight(0xffffff, 1)
backLight.position.set(0, 0, -1)
scene.add(backLight)

// Setting orbit control and default camera position
camera.position.z = 100
camera.position.y = -30
const controls = new OrbitControls(camera, renderer.domElement)

// Creating dat.gui interface to interact with our plane dimensions dynamically
const gui = new dat.GUI()
const world = {
    object: {
        width: 400,
        height: 400,
        widthSegments: 50,
        heightSegments: 50
    }
}
gui.add(world.object, 'width', 1, 1000).onChange(() => {
    updateMesh()
})
gui.add(world.object, 'height', 1, 1000).onChange(() => {
    updateMesh()
})
gui.add(world.object, 'widthSegments', 1, 200).onChange(() => {
    updateMesh()
})
gui.add(world.object, 'heightSegments', 1, 200).onChange(() => {
    updateMesh()
})

// Creating a mouse object to register normalized coordiantes of our pointer
const mouse = {
    x: undefined,
    y: undefined
}
addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1
    mouse.y = -(event.clientY / innerHeight) * 2 + 1
})

animate()
