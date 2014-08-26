var initArray = {};

window.onload = function(){

    pi = Math.PI;

    // Show the gridline with filled color or not
    initArray.showGridLinesOnly = false;
    // Show stats window in the lower left
    initArray.showStats = true;
    // Set the ground texture
    initArray.groundTexture = 'img/gras.png';
    initArray.skyboxColor = 'aabbcc';

    initArray.fundamentHeight = 10;

    // dimension of plane (grundfläche)
    initArray.planeWidth = 2000;
    initArray.planeHeight = 2000;

    var cameraPos = {};
    cameraPos.X = 100;
    cameraPos.Y = 10;
    cameraPos.Z = -1200;

    initArray.cameraPos = cameraPos;

    init(initArray);

    addFundamentPalace();
    addStairsFundament();
    addRoofColumns();
    addFence();
    addOuterWall();
    addInnerWall();
    addRoof();
    animate();
}

function addFundamentPalace(){
    var pos = new Array(0, 1,  initArray.planeHeight / 4);
    var dim = new Array(initArray.planeWidth / 2, initArray.fundamentHeight, initArray.planeHeight / 2);
    addCubeShapeWithTexture(pos, dim, getDefaultRotating(), getDefaultScaling(), getMaterialForCube('img/groundTexture.png', 8, 8));
}

function addRoof(){
    addRoofLayerThree();
    addRoofLayerTwo();
    addRoofLayerOne();
    addRoofLayerZero();

}

function addRoofLayerZero(){
    // Layer 0
    var pos = new Array(1, 245, 500);
    var dim = new Array(1000, 40, 1000);
    addCubeShapeWithTexture(pos, dim, getDefaultRotating(), getDefaultScaling(), getMaterialForCube('img/umrandung_dach_layer_1.png', 16, 1));
}

function addRoofLayerOne(){
    // Layer 1
    var pos = new Array(0, 282, -8);
    var dim = new Array(1000, 40, 1);
    var rot = new Array(pi/-8, 0, 0);
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/umrandung_dach_unten_layer_1.png', 64, 1));

    var pos = new Array(0, 282, 1008);
    var dim = new Array(1000, 40, 1);
    var rot = new Array(pi/8, 0, 0);
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/umrandung_dach_unten_layer_1.png', 64, 1));

    var pos = new Array(508, 282, 500);
    var dim = new Array(1, 40, 1000);
    var rot = new Array(0, 0, pi/-8);
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/umrandung_dach_unten_layer_1.png', 64, 1));

    var pos = new Array(-508, 282, 500);
    var dim = new Array(1, 40, 1000);
    var rot = new Array(0, 0, pi/8);
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/umrandung_dach_unten_layer_1.png', 64, 1));

    var mesh =  new THREE.Mesh(new THREE.CylinderGeometry( 20, 0, 40, 4, 4), getMaterialForCube('img/umrandung_dach_unten_layer_1.png', 2, 1));
   	var pos = new Array(500, 280, 0);
    var rot = new Array(0, pi/4, 0);
    addPyramideShapeWithTexture(pos, rot, getDefaultScaling(), 20, 0, 40, getMaterialForCube('img/umrandung_dach_unten_layer_1.png', 2, 1));

    var pos = new Array(-500, 280, 0);
    var rot = new Array(0, pi/4, 0);
    addPyramideShapeWithTexture(pos, rot, getDefaultScaling(), 20, 0, 40, getMaterialForCube('img/umrandung_dach_unten_layer_1.png', 2, 1));

    var pos = new Array(-500, 280, 1000);
    var rot = new Array(0, pi/4, 0);
    addPyramideShapeWithTexture(pos, rot, getDefaultScaling(), 20, 0, 40, getMaterialForCube('img/umrandung_dach_unten_layer_1.png', 2, 1));

    var pos = new Array(500, 280, 1000);
    var rot = new Array(0, pi/4, 0);
    addPyramideShapeWithTexture(pos, rot, getDefaultScaling(), 20, 0, 40, getMaterialForCube('img/umrandung_dach_unten_layer_1.png', 1, 1));

    var pos = new Array(1, 300, 500);
    var dim = new Array(1030, 1, 1030);
    addCubeShapeWithTexture(pos, dim, getDefaultRotating(), getDefaultScaling(), getMaterialForCube('img/umrandung_dach_layer_1.png', 16, 1));

}

function addRoofLayerTwo(){
    var width = 979;
    var rotx = pi/4;
    var repeat = 64;
    var repeatPyramide = 9;

    var pos = new Array(0, 315, 0);
    var dim = new Array(width, 40, 1);
    var rot = new Array(rotx, 0, 0);
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/dach-schraeg-oben.png', repeat, 1));

    var pos = new Array(0, 315, 1008);
    var dim = new Array(width, 40, 1);
    var rot = new Array(-rotx, 0, 0);
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/dach-schraeg-oben.png', repeat, 1));

    var pos = new Array(500, 315, 500);
    var dim = new Array(1, 40, width);
    var rot = new Array(0, 0, rotx);
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/dach-schraeg-oben.png', 64, 1));

    var pos = new Array(-500, 315, 508);
    var dim = new Array(1, 40, width);
    var rot = new Array(0, 0, -rotx);
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/dach-schraeg-oben.png', 64, 1));


   	var pos = new Array(490, 316, 13);
    var rot = new Array(0, pi/4, 0);
    addPyramideShapeWithTexture(pos, rot, getDefaultScaling(),  0,40, 30, getMaterialForCube('img/dach-schraeg-oben.png', repeatPyramide, 16));

    var pos = new Array(-485, 316, 13);
    var rot = new Array(0, pi/4, 0);
    addPyramideShapeWithTexture(pos, rot, getDefaultScaling(),  0,40, 30, getMaterialForCube('img/dach-schraeg-oben.png', repeatPyramide, 16));

    var pos = new Array(-485, 316, 993);
    var rot = new Array(0, pi/4, 0);
    addPyramideShapeWithTexture(pos, rot, getDefaultScaling(),  0,40, 30, getMaterialForCube('img/dach-schraeg-oben.png', repeatPyramide, 16));

    var pos = new Array(487, 316, 990);
    var rot = new Array(0, pi/4, 0);
    addPyramideShapeWithTexture(pos, rot, getDefaultScaling(),  0,40, 30, getMaterialForCube('img/dach-schraeg-oben.png', repeatPyramide, 16));
}

function addRoofLayerThree(){
    var pos = new Array(1, 335, 500);
    var dim = new Array(980, 10, 980);
    addCubeShapeWithTexture(pos, dim, getDefaultRotating(), getDefaultScaling(), getMaterialForCube('img/dach-basis-pyramide.png', 16, 1));

var pos = new Array(0, 393, 500);
var rot = new Array(0, pi/4, 0);
addPyramideShapeWithTexture(pos, rot, getDefaultScaling(),  0, 600, 100, getMaterialForCube('img/pyramid-top.png', 64, 64));
}

function addInnerWallTriangles(){

    var ceilingTriangleLeftGeometry = getTriangleFromCoordinates();
    var triangleMaterialColor = "ff0000";
    var posX = 0, posY = 160, posZ = 750, sclX = 1, sclY = 1, sclZ = 1;

    var pos = new Array(posX, posY, posZ);
    rot = new Array(0, pi, 0);
    scl = new Array(sclX, sclY, sclZ);
    addTriangle(ceilingTriangleLeftGeometry, pos, rot, scl, triangleMaterialColor);

    pos = new Array(-posX, posY, posZ);
    scl = new Array(sclX, sclY, sclZ);
    rot = new Array(0, pi * 2, 0);
    addTriangle(ceilingTriangleLeftGeometry, pos, rot, scl, triangleMaterialColor);
}

function getTriangleFromCoordinates(){
    var a = 45;
    var b = 50;
    var c = 0;
    var sideTriangleLeft = new THREE.Shape();
    sideTriangleLeft.moveTo(0,0);
    sideTriangleLeft.quadraticCurveTo(a, c, b, -a);
    sideTriangleLeft.quadraticCurveTo(b, -a, b, c);
    sideTriangleLeft.quadraticCurveTo(b, c, c, c);
    var ceilingTriangleLeftGeometry = new THREE.ShapeGeometry( sideTriangleLeft );
    return ceilingTriangleLeftGeometry;
}

/**
TODO: Diese Funktion entfernen, da nur noch texture funktionen hinzukommen
**/
function addCubeShape(position, dimension, rotation, scaling, materialColor){
    var mesh = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( dimension[0], dimension[1], dimension[2], 1, 1, 1 ), getMultimaterial(materialColor));
    mesh.position.set(position[0], position[1], position[2]);
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    mesh.scale.set( scaling[0], scaling[1], scaling[2]);
    scene.add(mesh);
 }

 function addCubeShapeWithTexture(position, dimension, rotation, scaling, columnMaterial){

    // the column on the frustum
     var mesh =  new THREE.Mesh(new THREE.CubeGeometry( dimension[0], dimension[1], dimension[2], 1, 1, 1 ), columnMaterial);
     mesh.position.set(position[0], position[1], position[2]);
     mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
     mesh.scale.set( scaling[0], scaling[1], scaling[2]);
     scene.add(mesh);
  }

  function addPyramideShapeWithTexture(position, rotation, scaling, radiusTop, radiusBottom, height, columnMaterial){

      // the column on the frustum
       var mesh =  new THREE.Mesh(new THREE.CylinderGeometry( radiusTop, radiusBottom, height, 4, 4), columnMaterial);
       mesh.position.set(position[0], position[1], position[2]);
       mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
       mesh.scale.set( scaling[0], scaling[1], scaling[2]);
       scene.add(mesh);
    }

      function addPyramideShapeWithColor(position, rotation, scaling, radiusTop, radiusBottom, height, materialColor){

          // the column on the frustum
           var mesh =  new THREE.Mesh(new THREE.CylinderGeometry( radiusTop, radiusBottom, height, 4, 4), getMultimaterial(materialColor));
           mesh.position.set(position[0], position[1], position[2]);
           mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
           mesh.scale.set( scaling[0], scaling[1], scaling[2]);
           scene.add(mesh);
        }


function addTriangle(geometry, pos, rot, scl, materialColor){
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geometry, getMultimaterial(materialColor));
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.rotation.set(rot[0], rot[1], rot[2]);
    mesh.scale.set( scl[0], scl[1], scl[2]);
    scene.add( mesh );
}

function addDome(){

	var radius = 53;
	var widthSegments = 64;
	var heightSegments = 64;
	var phiStart = 0;
	var phiLength = pi;
	var thetaStart = 0;
	var thetaLength = pi / 2;
	addSphereShape(0,100, 750, radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength, "ff0000");
	addInnerWallTriangles();
}

function addSphereShape(x,y,z, radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength, materialColor){
    var mesh = THREE.SceneUtils.createMultiMaterialObject(new THREE.SphereGeometry( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength ),getMultimaterial(materialColor) );
	mesh.position.set(x, y, z);
	mesh.scale.set(1,1.5,1);
	scene.add(mesh);
}

function addInnerWall(){

    var px = 100;
    var py = 120;
    var pz = 732;
    var dx = 100;
    var dy = 235;
    var dz = 15;
    var dim = new Array(dx, dy, dz);

    var pos = new Array(px, py, pz);
    addCubeShapeWithTexture(pos, dim, getDefaultRotating(), getDefaultScaling(), getMaterialForCube('img/front_links_eingang_hinten.png', 1, 1));

    var pos = new Array(-px, py, pz);
    addCubeShapeWithTexture(pos, dim, getDefaultRotating(), getDefaultScaling(), getMaterialForCube('img/front_rechts_eingang_hinten.png', 1, 1));

    var pos = new Array(0, py, pz);
    addCubeShapeWithTexture(pos, dim, getDefaultRotating(), getDefaultScaling(), getMaterialForCube('img/front_hinten.png', 1, 1));

    px = 142;
    pz = 665;
    dx = 150;
    ry = pi /2;

    var pos = new Array(-px, py, pz);
    var dim = new Array(dx, dy, dz);
    rot = new Array(0, ry, 0);
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/front_rechts_eingang.png', 1, 1));

    var pos = new Array(px, py, pz);
    var dim = new Array(dx, dy, dz);
    rot = new Array(0, ry, 0);

    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/front_links_eingang.png', 1, 1));
}

function addCustomShape(){
var starPoints = [];

    starPoints.push( new THREE.Vector2(0, 0));
    starPoints.push( new THREE.Vector2(10, 49));
    starPoints.push( new THREE.Vector2(15, 45));
    starPoints.push( new THREE.Vector2(20, 36));
    starPoints.push( new THREE.Vector2(25, 32));
    starPoints.push( new THREE.Vector2(30, 28));
    starPoints.push( new THREE.Vector2(35, 22));
    starPoints.push( new THREE.Vector2(40, 18));
    starPoints.push( new THREE.Vector2(45, 10));
    starPoints.push( new THREE.Vector2(50, 50));
    starPoints.push( new THREE.Vector2(0, 50));

	var starShape = new THREE.Shape( starPoints );

	var extrusionSettings = {
		size: 30, height: 4, curveSegments: 20,
		bevelThickness: 1, bevelSize: 2, bevelEnabled: false,
		material: 0, extrudeMaterial: 1
	};

	var starGeometry = new THREE.ExtrudeGeometry( starShape, extrusionSettings );

	var materialFront = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
	var materialSide = new THREE.MeshBasicMaterial( { color: 0xff8800 } );
	var materialArray = [ materialFront, materialSide ];
	var starMaterial = new THREE.MeshFaceMaterial(materialArray);

	var star = new THREE.Mesh( starGeometry, starMaterial );
	star.position.set(0,50,0);
	scene.add(star);

	// add a wireframe to model
	var wireframeTexture = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true } );
	var star = new THREE.Mesh( starGeometry, wireframeTexture );
	star.position.set(0,50,0);
	scene.add(star);
}

function addOuterWall(){

    var pos = new Array(315, 120, 595);
    var dim = new Array(350, 235, 15);
    addCubeShapeWithTexture(pos, dim, getDefaultRotating(), getDefaultScaling(), getMaterialForCube('img/front_links.png', 1, 1));

    var pos = new Array(-315, 120, 595);
    var dim = new Array(350, 235, 15);
    addCubeShapeWithTexture(pos, dim, getDefaultRotating(), getDefaultScaling(), getMaterialForCube('img/front_rechts.png', 1, 1));

    var pos = new Array(0, 120, 990);
    var dim = new Array(980, 235, 15);
    addCubeShapeWithTexture(pos, dim, getDefaultRotating(), getDefaultScaling(), getMaterialForCube('img/hinten.png', 1, 1));

    var pos = new Array(-480, 120, 795);
    var dim = new Array(385, 235, 15);
    rot = new Array(0, pi / 2, 0);
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/hinten.png', 1, 1));

    var pos = new Array(480, 120, 795);
    var dim = new Array(385, 235, 15);
    rot = new Array(0, pi / 2, 0);
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/hinten.png', 1, 1));
}

function addFence(){
    var fence;
    var xPositionsColumnsFrontFence = new Array(170, 380);
    var multiMaterial = getMultimaterial("ffaacc");
    var fenceLength = 190;
    var materials = getMaterialForCube('img/fenceFrontAndBackSide2.png', 24, 1);
    var yPosFence = 11;

    // The front fences
    for(var i = 0 ; i < xPositionsColumnsFrontFence.length; i++){
        fence = new THREE.Mesh(new THREE.CubeGeometry( 210, 10, 5, 2, 1, 1 ), materials);
        fence.position.set(xPositionsColumnsFrontFence[i], yPosFence, 10);
        scene.add(fence);

        fence = new THREE.Mesh(new THREE.CubeGeometry( 210, 10, 5, 1, 1, 1 ), materials);
        fence.position.set(-xPositionsColumnsFrontFence[i], yPosFence, 10);
        scene.add(fence);
    }

    var xPositionsColumnsSideFence = new Array(480, 170, 370);
    var zPositionsColumnsSideFence = new Array(100, 300, 500);

    // The fences on the site
    for(var i = 0; i < zPositionsColumnsSideFence.length; i++){
        fence = new THREE.Mesh(new THREE.CubeGeometry( fenceLength, 10, 2, 1, 1, 1 ), materials);
        fence.position.set(-xPositionsColumnsSideFence[0], yPosFence, zPositionsColumnsSideFence[i]);
        fence.rotation.set(0, pi / 2, pi);
        scene.add(fence);

        fence = new THREE.Mesh(new THREE.CubeGeometry( fenceLength, 10, 2, 1, 1, 1 ), materials);
        fence.position.set(xPositionsColumnsSideFence[0], yPosFence, zPositionsColumnsSideFence[i]);
        fence.rotation.set(0, pi / 2, pi);
        scene.add(fence);
    }
}

/**
    This function adds the columns to the scene which are holding the roof
*/
function addRoofColumns(){

    var xPositionsColumns = new Array(480,270, 70);
    var j = 1;

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

        // 4. reihe
        addFirstColumnRow(600, xPositionsColumns[2]);
        addFirstColumnRow(600,-xPositionsColumns[2]);
    }
}

function addFirstColumnRow(zPosition, xPosition){

    var columnSettings = {};
    columnSettings.columnHeight = 190;
    columnSettings.columnWidth = 10;
    columnSettings.zPosition = zPosition;
    columnSettings.xPosition = xPosition;
    addColumn(columnSettings);
}

function addColumn(columnSettings){
    var radiusAtBottom = 35;
    var segmentsAroundRadius = 4;
    var segmentsAlongHeight = 4;

    var randomIndex = Math.floor(Math.random() * ((10-0)+1) + 1);
    // original fotos
    var pillarBottomMaterial = getMaterialForCube('img/pillarBottom.png', 1, 1);
    var columnMaterial = getMaterialForCube('img/column00' + randomIndex % 5 + '.png', 1, 1);
    var frustumTopMaterial = getMaterialForCube('img/frustumTop00' + randomIndex % 5 + '.png', 10, 6);
    var frustumCubeMaterial = getMaterialForCube('img/frustumCube00' + randomIndex % 5 + '.png', 1, 1);

    // from drawing
    var pillarBottomMaterial = getMaterialForCube('img/pillarBottom.png', 1, 1);
    var columnMaterial = getMaterialForCube('img/column.png', 1, 1);
    var frustumTopMaterial = getMaterialForCube('img/frustumTop.png', 1, 1);
    var frustumCubeMaterial = getMaterialForCube('img/frustumCube.png', 1, 1);
    var topColumnImages = new Array( "img/columnTopLevel1.png", "img/columnTopLevel2.png", "img/columnTopLevel3.png", "img/columnTopLevel4.png");

    var cubeLevel1CubeMaterial = getMaterialForCube('img/columnTopLevel1.png', 1, 1);
    var cubeLevel2CubeMaterial = getMaterialForCube('img/columnTopLevel2.png', 1, 1);
    var cubeLevel3CubeMaterial = getMaterialForCube('img/columnTopLevel3.png', 1, 1);
    var cubeLevel4CubeMaterial = getMaterialForCube('img/columnTopLevel4.png', 1, 1);

    // the column on the ground
    var shape = new THREE.Mesh(new THREE.CylinderGeometry( 10, 8, 10, 4, 4 ), pillarBottomMaterial);
    shape.position.set(columnSettings.xPosition, 10, columnSettings.zPosition);
    shape.rotation.set(pi, pi / 4, 0);
    scene.add(shape);

    // the column on the frustum
    var column =  new THREE.Mesh(new THREE.CubeGeometry( columnSettings.columnWidth, columnSettings.columnHeight, 10, 1, 1, 1 ), columnMaterial);
    column.position.set(columnSettings.xPosition, columnSettings.columnHeight / 2 + 5,  columnSettings.zPosition);
    scene.add(column);

    // the frustum son the column
    var shape = new THREE.Mesh(new THREE.CubeGeometry( 10, 10, 10, 1, 1, 1 ), cubeLevel1CubeMaterial );
    shape.position.set(columnSettings.xPosition, columnSettings.columnHeight + 10, columnSettings.zPosition);
    scene.add(shape);

    var shape = new THREE.Mesh(new THREE.CubeGeometry( 12, 12, 12, 1, 1, 1 ), cubeLevel2CubeMaterial );
    shape.position.set(columnSettings.xPosition, columnSettings.columnHeight + 21, columnSettings.zPosition);
    scene.add(shape);

    var shape = new THREE.Mesh(new THREE.CubeGeometry( 14, 14, 14, 1, 1, 1 ), cubeLevel3CubeMaterial );
    shape.position.set(columnSettings.xPosition, columnSettings.columnHeight + 31, columnSettings.zPosition);
    scene.add(shape);

    var shape = new THREE.Mesh(new THREE.CubeGeometry( 16, 16, 16, 1, 1, 1 ), cubeLevel4CubeMaterial );
    shape.position.set(columnSettings.xPosition, columnSettings.columnHeight + 41, columnSettings.zPosition);
    scene.add(shape);

    // the top frustum
    var shape = new THREE.Mesh(new THREE.CubeGeometry( 18, 18, 18, 1, 1, 1 ), frustumCubeMaterial );
    shape.position.set(columnSettings.xPosition, columnSettings.columnHeight + 41, columnSettings.zPosition);
    scene.add(shape);
}

function addStairsFundament(){

    var stairColors = new Array( "00000ff", "ff0000", "00ff00");
    var basicStairHight = initArray.fundamentHeight / stairColors.length;
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

function getDefaultRotating(){
    return new Array(0,0,0);
}

function getDefaultScaling(){
    return new Array(1,1,1);
}


function getMultimaterial(meshColor, wireframeColor){
    var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, side: THREE.DoubleSide } );
    var meshMaterial= new THREE.MeshBasicMaterial( { color: parseInt(meshColor, 16),wireframe: initArray.showGridLinesOnly, side: THREE.DoubleSide} );
    var multiMaterial = [ meshMaterial, wireframeMaterial];
    return multiMaterial;
}

function getMaterialForCube(textureName,repeatX, repeatY){
floorTexture = THREE.ImageUtils.loadTexture(textureName);
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set( repeatX, repeatY);

 var materials = [
       new THREE.MeshLambertMaterial({
           map: floorTexture, transparent: true, opacity: 1.0, wireframe: initArray.showGridLinesOnly,color: 0xFFFFFF
       }),
       new THREE.MeshLambertMaterial({
           map: floorTexture, transparent: true, opacity: 1.0, wireframe: initArray.showGridLinesOnly, color: 0xFFFFFF
       }),
       new THREE.MeshLambertMaterial({
           map: floorTexture, transparent: true, opacity: 1.0, wireframe: initArray.showGridLinesOnly,color: 0xFFFFFF
       }),
       new THREE.MeshLambertMaterial({
           map: floorTexture, transparent: true, opacity: 1.0, wireframe: initArray.showGridLinesOnly, color: 0xFFFFFF
       }),
       new THREE.MeshLambertMaterial({
           map: floorTexture, transparent: true, opacity: 1.0,wireframe: initArray.showGridLinesOnly, color: 0xFFFFFF
       }),
       new THREE.MeshLambertMaterial({
           map: floorTexture, transparent: true, opacity: 1.0,wireframe: initArray.showGridLinesOnly, color: 0xFFFFFF
       })
    ];

    return new THREE.MeshFaceMaterial(materials);
}