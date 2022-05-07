import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
/* scene.add(mesh) */

const group = new THREE.Group()

// create sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5,50,50),
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('./img/realistic.jpg')
    })
  )
  sphere.scale.set(1, 1, 1)
  group.add(sphere)
  /* scene.add(sphere) */
  scene.add(group)
  


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 15
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
const mouse = {
    x: undefined,
    y: undefined
  }

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    sphere.rotation.y += 0.006
    group.rotation.y = mouse.x * 0.5
    gsap.to(group.rotation,{
        x: -mouse.y * 0.3,
        y: mouse.x * 0.5,
        duration: 2
    })
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

addEventListener('mousemove', () =>{
    mouse.x = (event.clientX / innerWidth) * 2 -1
    mouse.y = -(event.clientY / innerHeight) * 2 +1
})




/**
 * Fullscreen
 */
/* window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})
 */


  // create atmosphere
/*   const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5,50,50),
    new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide
    })
  )
  scene.add(sphere)
  atmosphere.scale.set(1.3, 1.3, 1.3)
  scene.add(atmosphere) */
  
/* import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

import atmosphereVertexShader from './shaders/atmosphereVertex.glsl' 
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl' */