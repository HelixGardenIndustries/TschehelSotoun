/*
 Three.js "tutorials by example"
 Author: Lee Stemkoski
 Date: July 2013 (three.js v59dev)
 */

// MAIN

// standard global variables
var container, scene, camera, mirrorCube, mirrorCubeCamera, renderer, controls, stats, cube, textureCamera, initialTranslate = true;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var configurationArray;
var waterUniforms;
var showAndMoveCameraCube = false;


// custom global variables
var mesh;

window.onload = function () {
    // Show the gridline with filled color or not
    initArray.showGridLinesOnly = false;
    // Show stats window in the lower left
    initArray.showStats = true;
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
}

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
    container = document.getElementById('canvas');
    container.appendChild(renderer.domElement);
    // EVENTS
    THREEx.WindowResize(renderer, camera);
    THREEx.FullScreen.bindKey({ charCode: 'm'.charCodeAt(0) });
    // CONTROLS
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    showStats();

    // LIGHT
    var light = new THREE.AmbientLight(0xffffff);
    light.position.set(45, 500, -63);
    scene.add(light);
    // FLOOR
    var floorTexture = new THREE.ImageUtils.loadTexture(configurationArray.groundTexture);
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10, 10);
    var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
    var floorGeometry = new THREE.PlaneGeometry(configurationArray.planeWidth, configurationArray.planeHeight, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -5;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);
    // SKYBOX
    var skyBoxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
    var skyBoxMaterial = new THREE.MeshBasicMaterial({ color: parseInt(configurationArray.skyboxColor, 16), side: THREE.BackSide });
    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    scene.add(skyBox);


}

// STATS
function showStats() {
    if (configurationArray.showStats) {
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.bottom = '0px';
        stats.domElement.style.zIndex = 100;
        container.appendChild(stats.domElement);
    }
}

function animate() {
    requestAnimationFrame(animate);
    render();
    update();
}

function cameraCubeMovement(moveDistance, rotateAngle) {
// move forwards/backwards/left/right
    if (keyboard.pressed("W")) {
        movingCube.translateZ(-moveDistance);
    }

    if (keyboard.pressed("S")) {
        movingCube.translateZ(moveDistance);
    }

    if (keyboard.pressed("Q")) {
        movingCube.translateX(-moveDistance);
    }


    if (keyboard.pressed("E")) {
        movingCube.translateX(moveDistance);
    }

    // rotate left/right/up/down
    var rotation_matrix = new THREE.Matrix4().identity();
    if (keyboard.pressed("A")) {
        movingCube.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotateAngle);
    }

    if (keyboard.pressed("D")) {
        movingCube.rotateOnAxis(new THREE.Vector3(0, 1, 0), -rotateAngle);
    }

    if (keyboard.pressed("R")) {
        movingCube.rotateOnAxis(new THREE.Vector3(1, 0, 0), rotateAngle);
    }

    if (keyboard.pressed("F")) {
        movingCube.rotateOnAxis(new THREE.Vector3(1, 0, 0), -rotateAngle);
    }

    if (keyboard.pressed("Z")) {
        movingCube.position.set(0, 25.1, 0);
        movingCube.rotation.set(0, ss0, 0);
    }
}

function update() {
    var delta = clock.getDelta(); // seconds.
    var moveDistance = 200 * delta; // 200 pixels per second
    var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second

    // local transformations
    if (showAndMoveCameraCube) {
        cameraCubeMovement(moveDistance, rotateAngle);
    }

    waterUniforms.time.value += delta;

    // update the texture camera's position and look direction
    var relativeCameraOffset = new THREE.Vector3(0, 0, 1);
    var cameraOffset = relativeCameraOffset.applyMatrix4(movingCube.matrixWorld);
    textureCamera.position.x = cameraOffset.x;
    textureCamera.position.y = cameraOffset.y;
    textureCamera.position.z = cameraOffset.z;
    var relativeCameraLookOffset = new THREE.Vector3(0.05, 0, -1);
    var cameraLookOffset = relativeCameraLookOffset.applyMatrix4(movingCube.matrixWorld);
    textureCamera.lookAt(cameraLookOffset);
    controls.update();

    if (configurationArray.showStats) {
        stats.update();
    }
}

function render() {
    // textureCamera is located at the position of movingCube
    //   (and therefore is contained within it)
    // Thus, we temporarily hide movingCube
    //    so that it does not obscure the view from the camera.
    movingCube.visible = false;
    // put the result of textureCamera into the first texture.
    renderer.render(scene, textureCamera, firstRenderTarget, true);
    movingCube.visible = true;

    // slight problem: texture is mirrored.
    //    solve problem by rendering (and hence mirroring) the texture again

    // render another scene containing just a quad with the texture
    //    and put the result into the final texture
    renderer.render(screenScene, screenCamera, textureFromCamera, true);

    renderer.render(scene, camera);
}
