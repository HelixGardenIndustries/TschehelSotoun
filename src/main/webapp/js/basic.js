var initArray = {};

window.onload = function(){


    pi = Math.PI;

    // Holds information about skybox color and ground textere

    initArray.groundTexture = 'img/gras.png';
    initArray.skyboxColor = 'aabbcc';
    initArray.showStats = false;

    // Dimension of plane (grundfläche)
    initArray.planeWidth = 2000;
    initArray.planeHeight = 2000;

    var cameraPos = {};
    cameraPos.X = 9;
    cameraPos.Y = 3;
    cameraPos.Z = -228;

    initArray.cameraPos = cameraPos;

    console.log(initArray);
    init(initArray);
    animate();

    //addSphere();

    var fundamentHeight = 10;
    // The fundament of the palace
    addFundamentPalace(fundamentHeight);
    // The stairs to climb up the stairs in front of the fundament
    addStairsFundament(fundamentHeight);
    // The wooden columns holding the roof
    addRoofColumns();
    // the fence between the columns
    addFence();

    // The outer walls
    addOuterWall();

    // The dachfirst
    addDachFirst();

    addInnerWall();

    addDome();

    addEntranceWall();

    addFish2();




}

function showAxes(){
var geometry = new THREE.SphereGeometry( 30, 32, 16 );
	var material = new THREE.MeshLambertMaterial( { color: 0x000088 } );
	mesh = new THREE.Mesh( geometry, material );
	mesh.position.set(40,40,40);
	//scene.add(mesh);

	var axes = new THREE.AxisHelper(50);
	axes.position = mesh.position;
	scene.add(axes);

	var gridXZ = new THREE.GridHelper(100, 10);
	gridXZ.setColors( new THREE.Color(0x006600), new THREE.Color(0x006600) );
	gridXZ.position.set( 100,0,100 );
	scene.add(gridXZ);

	var gridXY = new THREE.GridHelper(100, 10);
	gridXY.position.set( 100,100,0 );
	gridXY.rotation.x = Math.PI/2;
	gridXY.setColors( new THREE.Color(0x000066), new THREE.Color(0x000066) );
	scene.add(gridXY);

	var gridYZ = new THREE.GridHelper(100, 10);
	gridYZ.position.set( 0,100,100 );
	gridYZ.rotation.z = Math.PI/2;
	gridYZ.setColors( new THREE.Color(0x660000), new THREE.Color(0x660000) );
	scene.add(gridYZ);

	// direction (normalized), origin, length, color(hex)
	var origin = new THREE.Vector3(50,100,50);
	var terminus  = new THREE.Vector3(75,75,75);
	var direction = new THREE.Vector3().subVectors(terminus, origin).normalize();
	var arrow = new THREE.ArrowHelper(direction, origin, 50, 0x884400);
	scene.add(arrow);
}

function addDome(){


/*
    var geometry = new THREE.ExtrudeGeometry( squareShape,  {amount:0.1} );
    var mesh = THREE.SceneUtils.createMultiMaterialObject( geometry, [ new THREE.MeshLambertMaterial( { color: 0xff0000 ,opacity: 1.0} ), new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true, transparent: true ,opacity: 1.0} ) ] );
*/


    var multiMaterial = getMultimaterial("afaefa");
//    var multiMaterial = new THREE.MeshBasicMaterial( { color: 0xF0C400, side: THREE.DoubleSide } );
    multiMaterial.side = THREE.FrontSide;
    multiMaterial.doubleSided = THREE.FrontSide;
	// dome
	var shape = THREE.SceneUtils.createMultiMaterialObject(new THREE.SphereGeometry( 130, 32, 10, 0, Math.PI, 0, Math.PI / 2 ),multiMaterial );
    shape.doubleSided = false;

    //shape.material.side = THREE.DoubleSide;
	// should set material to doubleSided = true so that the
	//   interior view does not appear transparent.
	shape.position.set(0, 110, 650);
	shape.doubleSided = true;
	scene.add( shape );


}

function addFish2() {




// Fish
x = y = 0;
var fishShape = new THREE.Shape();
fishShape.moveTo(x,y);

var a = 45;
var b = 50;
var scaleX = 1;
var scaleY = 1;
var scaleZ = 1;





fishShape.quadraticCurveTo(a, 0, b, -a);
fishShape.quadraticCurveTo(b, -a, b, 0);
fishShape.quadraticCurveTo(b, 0, 0, 0);


var extrudeSettings = { amount: 20 }; // bevelSegments: 2, steps: 2 , bevelSegments: 5, bevelSize: 8, bevelThickness:5
extrudeSettings.bevelEnabled = true;
extrudeSettings.bevelSegments = 1;
extrudeSettings.steps = 4;

var points = fishShape.createPointsGeometry();
var spacedPoints = fishShape.createSpacedPointsGeometry( 2 );

// flat shape
var multiMaterial = getMultimaterial("00ffff");
var geometry = new THREE.ShapeGeometry( fishShape );

var mesh = THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
var fishShape2 = new THREE.Shape();
fishShape2.moveTo(x,y);

var width = 128;
var height = 0;

fishShape2.quadraticCurveTo(a, 0, b, -a);
fishShape2.quadraticCurveTo(b, -a, b, 0);
fishShape2.quadraticCurveTo(b, 0, 0, 0);
var geometry2 = new THREE.ShapeGeometry( fishShape2 );


var mesh2 = THREE.SceneUtils.createMultiMaterialObject(geometry2, multiMaterial);
var zside = 650;
var yside = 220;
var xside = 129;
mesh.position.set(xside, yside + 20, zside );
mesh.rotation.set(0, pi, 0);
mesh.scale.set( 5.5, 4, 1);

mesh2.position.set( xside, yside - 180, zside );
mesh2.rotation.set(0, pi ,pi / 2);
mesh2.scale.set( 4, 5.5, 1);


scene.add( mesh );
scene.add( mesh2 );


}

function addEntranceWall(){
    var wallHeight = 120;
        var yPosition = 60;
        var a = 140;
        var wallWidth = 150;
        var z  = 725;

        // Seitenwände
        var multiMaterial = getMultimaterial("aaccaa");
        var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( wallWidth, wallHeight, 15, 1, 1, 1 ), multiMaterial);
        wall.position.set(-a, yPosition, z);
        wall.rotation.set(0, Math.PI / 2, 0);
        scene.add(wall);

        var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( wallWidth, wallHeight, 15, 1, 1, 1 ), multiMaterial);
        wall.position.set(a, yPosition, z);
        wall.rotation.set(0, Math.PI / 2, 0);
        scene.add(wall);

        // Rueckwand
        var multiMaterial = getMultimaterial("aaccaa");
        var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 280, wallHeight, 15, 1, 1, 1 ), multiMaterial);
        wall.position.set(0, yPosition, 790);
        scene.add(wall);
}


function addInnerWall(){
    var wallHeight = 235;
    var yPosition = 120;

    /*// frontwand
    var multiMaterial = getMultimaterial("ff0000");
    var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 350, wallHeight, 15, 1, 1, 1 ), multiMaterial);
    wall.position.set(310, yPosition, 595);
    scene.add(wall);

    var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 350, wallHeight, 15, 1, 1, 1 ), multiMaterial);
    wall.position.set(-310, yPosition, 595);
    scene.add(wall);*/

    // frontwand
    var multiMaterial = getMultimaterial("00ffff");
    var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 350, wallHeight, 15, 1, 1, 1 ), multiMaterial);
    wall.position.set(310, yPosition, 732);
    scene.add(wall);

    var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 350, wallHeight, 15, 1, 1, 1 ), multiMaterial);
    wall.position.set(-310, yPosition, 732);
    scene.add(wall);

    var zIndex = 665;
    var xIndex = 142;
    // Seitenwände
    var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 120, wallHeight, 15, 1, 1, 1 ), multiMaterial);
    wall.position.set(-xIndex, yPosition, zIndex);
    wall.rotation.set(0, Math.PI / 2, 0);
    scene.add(wall);

    var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 120, wallHeight, 15, 1, 1, 1 ), multiMaterial);
    wall.position.set(xIndex, yPosition, zIndex);
    wall.rotation.set(0, Math.PI / 2, 0);
    scene.add(wall);

/*    // Rueckwand
    var multiMaterial = getMultimaterial("00ff00");
    var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 980, wallHeight, 15, 1, 1, 1 ), multiMaterial);
    wall.position.set(0, yPosition, 990);
    scene.add(wall);*/
}

function addDachFirst(){
    var multiMaterial = getMultimaterial("ffff00");

    var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 980, 10, 15, 1, 1, 1 ), multiMaterial);
    wall.position.set(0, 243, 595);
    scene.add(wall);

    // Seitenwände
    var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 385, 10, 15, 1, 1, 1 ), multiMaterial);
    wall.position.set(-480, 243, 795);
    wall.rotation.set(0, Math.PI / 2, 0);
    scene.add(wall);

    var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 385, 10, 15, 1, 1, 1 ), multiMaterial);
    wall.position.set(480, 243, 795);
    wall.rotation.set(0, Math.PI / 2, 0);
    scene.add(wall);

    // Dachfirst
    var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 980, 10, 15, 1, 1, 1 ), multiMaterial);
    wall.position.set(0, 243, 990);
    scene.add(wall);
}

function addOuterWall(){

    var wallHeight = 235;
    var yPosition = 120;

    // frontwand
    var multiMaterial = getMultimaterial("ff0000");
    var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 350, wallHeight, 15, 1, 1, 1 ), multiMaterial);
    wall.position.set(310, yPosition, 595);
    scene.add(wall);

    var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 350, wallHeight, 15, 1, 1, 1 ), multiMaterial);
    wall.position.set(-310, yPosition, 595);
    scene.add(wall);

    // Seitenwände
    var multiMaterial = getMultimaterial("0000ff");
    var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 385, wallHeight, 15, 1, 1, 1 ), multiMaterial);
    wall.position.set(-480, yPosition, 795);
    wall.rotation.set(0, Math.PI / 2, 0);
    scene.add(wall);

    var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 385, wallHeight, 15, 1, 1, 1 ), multiMaterial);
    wall.position.set(480, yPosition, 795);
    wall.rotation.set(0, Math.PI / 2, 0);
    scene.add(wall);

    // Rueckwand
    var multiMaterial = getMultimaterial("00ff00");
    var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 980, wallHeight, 15, 1, 1, 1 ), multiMaterial);
    wall.position.set(0, yPosition, 990);
    scene.add(wall);
}

function addFence(){

    var xPositionsColumnsFrontFence = new Array(170, 380);
    var multiMaterial = getMultimaterial("ffaacc");
    var fenceLength = 190;

    // The front fences
    for(var i = 0 ; i < xPositionsColumnsFrontFence.length; i++){
        var fence = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 210, 5, 2, 1, 1, 1 ), multiMaterial);
        fence.position.set(xPositionsColumnsFrontFence[i], 8, 10);
        scene.add(fence);

        var fence = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 210, 5, 2, 1, 1, 1 ), multiMaterial);
        fence.position.set(-xPositionsColumnsFrontFence[i], 8, 10);
        scene.add(fence);
    }

    var xPositionsColumnsSideFence = new Array(480, 170, 370);
    var zPositionsColumnsSideFence = new Array(100, 300, 500);

    // The fences on the site
    for(var i = 0; i < zPositionsColumnsSideFence.length; i++){
        var fence = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( fenceLength, 5, 2, 1, 1, 1 ), multiMaterial);
        fence.position.set(-xPositionsColumnsSideFence[0], 8, zPositionsColumnsSideFence[i]);
        fence.rotation.set(0, Math.PI / 2, Math.PI);
        scene.add(fence);

        var fence = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( fenceLength, 5, 2, 1, 1, 1 ), multiMaterial);
        fence.position.set(xPositionsColumnsSideFence[0], 8, zPositionsColumnsSideFence[i]);
        fence.rotation.set(0, Math.PI / 2, Math.PI);
        scene.add(fence);
    }
}

/**
    This function adds the columns to the scene which are holding the roof
*/
function addRoofColumns(){
    var xPositionsColumns = new Array(480,270, 70);

    // Add the 20 columns
    for(var i = 0; i < xPositionsColumns.length; i++){
        // 1. reihe
        addFirstColumnRow(10, xPositionsColumns[i]);
        addFirstColumnRow(10, -xPositionsColumns[i]);

        // 2. reihe
        addFirstColumnRow(200, xPositionsColumns[i]);
        addFirstColumnRow(200,-xPositionsColumns[i]);

        // 3. reihe
        addFirstColumnRow(400, xPositionsColumns[i]);
        addFirstColumnRow(400,-xPositionsColumns[i]);

        // 4. re
        addFirstColumnRow(600, xPositionsColumns[2]);
        addFirstColumnRow(600,-xPositionsColumns[2]);
    }
}

function addFirstColumnRow(zPosition, xPosition){
    var columnSettings = {};
    columnSettings.columnHeight = 200;
    columnSettings.columnWidth = 10;
    columnSettings.zPosition = zPosition;
    columnSettings.xPosition = xPosition;
    addColumn(columnSettings);
}

function addColumn(columnSettings){

    var radiusAtBottom = 35;
    var segmentsAroundRadius = 4;
    var segmentsAlongHeight = 4;

    // the column on the ground
    var multiMaterial = getMultimaterial("aaccee");
    var shape = THREE.SceneUtils.createMultiMaterialObject(new THREE.CylinderGeometry( 10, 8, 10, 4, 4 ),multiMaterial );
    shape.position.set(columnSettings.xPosition, 10, columnSettings.zPosition);
    shape.rotation.set(Math.PI, Math.PI / 4, 0);
    scene.add(shape);

    // the column on the frustum
    var multiMaterial = getMultimaterial("ccaaee");
    var column = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( columnSettings.columnWidth, columnSettings.columnHeight, 10, 1, 1, 1 ), multiMaterial);
    column.position.set(columnSettings.xPosition, columnSettings.columnHeight / 2 + 5,  columnSettings.zPosition);
    scene.add(column);

    // the frustum on the column
    // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
    var multiMaterial = getMultimaterial("eeaacc");
    var shape = THREE.SceneUtils.createMultiMaterialObject(new THREE.CylinderGeometry( 8.5, radiusAtBottom, 50, segmentsAroundRadius, segmentsAlongHeight),multiMaterial );
    shape.position.set(columnSettings.xPosition, columnSettings.columnHeight, columnSettings.zPosition);
    shape.rotation.set(Math.PI, Math.PI / 4, 0);
    scene.add(shape);

    // the top frustum
    var multiMaterial = getMultimaterial("cacaca");
    var shape = THREE.SceneUtils.createMultiMaterialObject(new THREE.CylinderGeometry( 35, radiusAtBottom, 15, segmentsAroundRadius, segmentsAlongHeight), multiMaterial );
    shape.position.set(columnSettings.xPosition, columnSettings.columnHeight + 30, columnSettings.zPosition);
    scene.add(shape);
    shape.rotation.set(0, Math.PI / 4, 0);

}

function addStairsFundament(fundamentHeight){

    var stairColors = new Array( "00000ff", "ff0000", "00ff00");
    var basicStairHight = fundamentHeight / stairColors.length;
    var stairWidthDivisor = 10;
    var cubeWidth = (initArray.planeWidth / 2) / stairWidthDivisor;

    var cubeHeight = 10 - stairColors.length * 1;
    var cubeDepth = 10;
    var widthSegments = 1;
    var heightSegments = 1;
    var depthSegments = 1;

    for(var i = 0; i < stairColors.length; i++){
        var cubeWidth = (initArray.planeWidth / 2) / stairWidthDivisor;
        var cubeHeight = 10 - (stairColors.length * i + 1);
        var darkMaterial = new THREE.MeshBasicMaterial( { color: parseInt(stairColors[i], 16) } );
        var cubeGeometry = new THREE.CubeGeometry( cubeWidth, cubeHeight, cubeDepth, widthSegments, heightSegments, depthSegments );
        cube = new THREE.Mesh( cubeGeometry, darkMaterial );
        var positionY = -1.5 + (i * -1.5);
        var positionZ = -5 - (i * 10);
        cube.position.set(0, positionY, positionZ);
        scene.add( cube );
    }
}

function addFundamentPalace(fundamentHeight){

    var darkMaterial = getMultimaterial("000088");
    //width, height, depth, widthSegments, heightSegments, depthSegments
    var fundamentWidth = initArray.planeWidth / 2;

    var cubeDepth = initArray.planeHeight / 2;
    var widthSegments = 1;
    var heightSegments = 1;
    var depthSegments = 1;

    var multiMaterial = getMultimaterial("ffffcc");
    var shape = THREE.SceneUtils.createMultiMaterialObject( new THREE.CubeGeometry( fundamentWidth, fundamentHeight, cubeDepth, widthSegments, heightSegments, depthSegments ),multiMaterial );
    shape.position.set(0, 0, cubeDepth / 2);
    scene.add( shape );
}

function getMultimaterial(meshColor, wireframeColor){
    var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: false, side: THREE.DoubleSide } );
    var meshMaterial= new THREE.MeshBasicMaterial( { color: parseInt(meshColor, 16), side: THREE.DoubleSide} );
    var multiMaterial = [ wireframeMaterial, meshMaterial ];
    return multiMaterial;
}
