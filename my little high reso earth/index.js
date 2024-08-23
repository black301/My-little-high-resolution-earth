import *as THREE from 'three'
//added to control the object with cursor
import {OrbitControls} from "jsm/controls/OrbitControls.js";
import getStarfield from "./getStarfield.js";

const loader =new THREE.TextureLoader();
//creating renderer
const w = window.innerWidth;
const h = window.innerHeight;

const renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
//camera attributes
const fov=75;
const aspect = w/h;
const near = 0.1;
const far = 1000;

//creating camera
const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
camera.position.z=2.5;
camera.position.x =0;

//adding scene (space)
const scene = new THREE.Scene();
//scene.background = "StarsMilkyWay.jpg";
//scene.background = new THREE.Color(0xAAAAAA);


//to control the object with cursor
const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.3;

//creating earthGroup
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4*Math.PI/180;
scene.add(earthGroup);

const geo = new THREE.IcosahedronGeometry(1,12);

const mat = new THREE.MeshPhongMaterial({
    map: loader.load("earth albedo.jpg"),
});

const earthmesh = new THREE.Mesh(geo,mat);
earthGroup.add(earthmesh);

//  const wiremat = new THREE.MeshBasicMaterial({
//     color:0xffffff,
//     wireframe:true
//  });
//  const wireMesh = new THREE.Mesh(geo,wiremat);
//  //earthmesh.add(wireMesh);
//const objLoader = new OBJLoader();
// objLoader.load('resources/models/windmill/windmill.obj', (root) => {
//   scene.add(root);
// });

const lightsMat = new THREE.MeshBasicMaterial({
    map: loader.load("earth night_lights_modified.png"),
    blending: THREE.AdditiveBlending,

  });
  const lightsMesh = new THREE.Mesh(geo, lightsMat);
  earthGroup.add(lightsMesh);


const cloudtMat = new THREE.MeshStandardMaterial({
    map : loader.load("clouds earth.png"),
    blending: THREE.AdditiveBlending,
})
const cloudMesh = new THREE.Mesh(geo,cloudtMat);
cloudMesh.scale.setScalar(1.01);
earthGroup.add(cloudMesh);

// const bumbmat = new THREE.MeshBasicMaterial({
//     map : loader.load('earth bump.jpg'),
//     blending:THREE.AdditiveBlending,
// })
// const bumbMesh = new THREE.Mesh(geo,bumbmat);
// //earthGroup.add(bumbMesh);

// const landmat = new THREE.MeshBasicMaterial({
//     map : loader.load('earth land ocean mask.png'),
//     blending:THREE.AdditiveBlending,
// })
// const landMesh = new THREE.Mesh(geo,landmat);
//earthGroup.add(landMesh);



//stars
const stars = getStarfield({numStars: 2000});
scene.add(stars);
//light
const sunLight = new THREE.DirectionalLight(0xffffff,2.0);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

const moonLight = new THREE.DirectionalLight(0xffffff, 1.0);
sunLight.position.set(2, 0.5, 1.5);
//scene.add(moonLight);
//animation and controls update function
 function animate(){
     requestAnimationFrame(animate);
     earthGroup.rotation.y += 0.002;
     cloudMesh.rotation.y += 0.001;
     //lightsMesh.rotation.y += 0.002;
     renderer.render(scene,camera);
     controls.update();
 }
 animate(); 