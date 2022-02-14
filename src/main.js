import { camelize, createApp } from 'vue'
import App from './App.vue'
import * as THREE from 'three'

createApp(App).mount('#app')

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()

console.log(scene)
console.log(camera)
console.log(renderer)