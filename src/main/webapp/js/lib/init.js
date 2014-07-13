/*
	Three.js "tutorials by example"
	Author: Lee Stemkoski
	Date: July 2013 (three.js v59dev)
 */

// MAIN

// standard global variables
var container, scene, camera, renderer, controls, stats;
var keyboard = new KeyboardState();
var clock = new THREE.Clock();
var configurationArray;


// custom global variables
var mesh;


// FUNCTIONS
function init(cfgArray)
{

    configurationArray = cfgArray;
	// SCENE
	scene = new THREE.Scene();
	// CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(configurationArray.cameraPos.X, configurationArray.cameraPos.Y, configurationArray.cameraPos.Z);
	camera.lookAt(scene.position);
	// RENDERER
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer();

	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById( 'canvas' );
	container.appendChild( renderer.domElement );
	// EVENTS
	THREEx.WindowResize(renderer, camera);
	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	// CONTROLS
	controls = new THREE.OrbitControls( camera, renderer.domElement );
    showStats();

	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,1000,500);
	scene.add(light);
	// FLOOR
	var floorTexture = new THREE.ImageUtils.loadTexture( configurationArray.groundTexture  );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
	floorTexture.repeat.set( 10, 10 );
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(configurationArray.planeWidth, configurationArray.planeHeight, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -5;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);
	// SKYBOX
	var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: parseInt(configurationArray.skyboxColor, 16), side: THREE.BackSide } );
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	scene.add(skyBox);



}

// STATS
function showStats(){
	console.log(configurationArray.showStats);
	if(configurationArray.showStats){
	    stats = new Stats();
    	stats.domElement.style.position = 'absolute';
    	stats.domElement.style.bottom = '0px';
    	stats.domElement.style.zIndex = 100;
    	container.appendChild( stats.domElement );
	}
}

function animate()
{
    requestAnimationFrame( animate );
	render();
	update();

/*
	console.log("x", camera.position.x);
	console.log("y", camera.position.y);
	console.log("z", camera.position.z);
*/

	}

function update()
{
	if ( keyboard.pressed("z") )
	{
	    console.log("sdfsf")
		// do something
	}

	controls.update();
	if(configurationArray.showStats){
	    stats.update();
	}

}

function render()
{
	renderer.render( scene, camera );
}
