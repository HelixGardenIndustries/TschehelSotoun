/*
 Three.js "tutorials by example"
 Author: Lee Stemkoski
 Date: July 2013 (three.js v59dev)
 */

// standard global variables
var container, scene, camera, renderer, controls, stats, textureCamera;
var configurationArray;
var add = true;
var light;

window.onload = function () {
    // Show the gridline with filled color or not
    initArray.showGridLinesOnly = false;
    // Show stats window in the lower left
    initArray.showStats = false;
    // Set the ground texture
    initArray.groundTexture = GROUND_TEXTURE;
    initArray.skyboxColor = SKY_BOX_COLOR;
    initArray.fundamentHeight = 10;

    // dimension of plane (grundfläche)
    initArray.planeWidth = 4000;
    initArray.planeHeight = 4000;

    var cameraPos = {};
    cameraPos.X = 100;
    cameraPos.Y = 200;
    cameraPos.Z = -1200;

    initArray.cameraPos = cameraPos;
    init(initArray);
    addMeshes();
};

// FUNCTIONS
function init(cfgArray) {

    configurationArray = cfgArray;
    // SCENE
    scene = new THREE.Scene();
    // CAMERA
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(configurationArray.cameraPos.X, configurationArray.cameraPos.Y, configurationArray.cameraPos.Z);
    //camera.lookAt(scene.position);
    // RENDERER
    if (Detector.webgl)
        renderer = new THREE.WebGLRenderer({antialias: true});
    else
        renderer = new THREE.CanvasRenderer();

    textureCamera = new THREE.PerspectiveCamera(50, ASPECT, NEAR, FAR);
    scene.add(textureCamera);

    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.sortObjects = false;
    container = document.getElementById('canvas');
    container.appendChild(renderer.domElement);
    // CONTROLS
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    if (configurationArray.showStats) {
        showStats();
    }

    // SKYBOX
    var skyBoxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
    var skyBoxMaterial = new THREE.MeshBasicMaterial({color: parseInt(configurationArray.skyboxColor, 16), side: THREE.BackSide});
    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    scene.add(skyBox);


}

// STATS
function showStats() {
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild(stats.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    render();
    update();
}

function update() {
    controls.update();

    if (configurationArray.showStats) {
        stats.update();
    }
}
function renderMainScene() {
    renderer.render(scene, camera);
}

function render() {
    renderMainScene();
}
