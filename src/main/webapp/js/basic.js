var initArray = {};

window.onload = function(){

    showGridLinesOnly = false;

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
    cameraPos.X = 16;
    cameraPos.Y = 611;
    cameraPos.Z = 1542;

    initArray.cameraPos = cameraPos;

    console.log(initArray);
    init(initArray);
    animate();



    addFundamentPalace();
    addStairsFundament();
    addRoofColumns();
    addFence();
    addOuterWall();
    addDachFirst();
    addInnerWall();
    addDome();
    addEntranceWall();
    addRoof();

}

function addRoof(){
        var pos = new Array(1, 250, 475);
        var dim = new Array(1080, 20, 1080);
        var rot = new Array(0, 0, 0);
        var scl = new Array(1, 1, 1);
        addCubeShape(pos, dim, rot, scl, "cf00f1");
}

function addFundamentPalace(){
     var pos = new Array(0, 0,  initArray.planeHeight / 4);
     var dim = new Array(initArray.planeWidth / 2, initArray.fundamentHeight, initArray.planeHeight / 2);
     var rot = new Array(0, 0, 0);
     var scl = new Array(1, 1, 1);
     addCubeShape(pos, dim, rot, scl, "ffffcc");
}




function addEntranceWall(){

        var sideWallWidth = 150;
        var wallHeight = 100;
        var wallWidth = 150;
        var wallDepth = 15;
        var xSideWall = 140;
        var yInnerWall = 49;
        var zSideWall = 725;
        var zBackWall = 790;
        var innerWallColor = "aaccaa";

        // innere Seitenwände
        var pos = new Array(-xSideWall, yInnerWall, zSideWall);
        var dim = new Array(wallWidth, wallHeight, wallDepth);
        var rot = new Array(0, pi / 2, 0);
        var scl = new Array(1, 1, 1);
        addCubeShape(pos, dim, rot, scl, innerWallColor);

        var pos = new Array(xSideWall, yInnerWall, zSideWall);
        var dim = new Array(wallWidth, wallHeight, wallDepth);
        var rot = new Array(0, pi / 2, 0);
        var scl = new Array(1, 1, 1);
        addCubeShape(pos, dim, rot, scl, innerWallColor);

        // innere Rückwand
        var pos = new Array(0, yInnerWall, zBackWall);
        var dim = new Array(wallWidth + 130, wallHeight, wallDepth);
        var rot = new Array(0, 0, 0);
        var scl = new Array(1, 1, 1);
        addCubeShape(pos, dim, rot, scl, innerWallColor);


        var ceilingTriangleLeftGeometry = getTriangleFromCoordinates();
        var triangleMaterialColor = "ff0000";

        var posX, posY,posZ, sclX, sclY, sclZ;
        posX = 70;
        posY = 240;
        posZ = 650;
        sclX = 4;
        sclY = 4;
        sclZ = 1;


        pos = new Array(posX, posY, posZ);
        var rot = new Array(0, pi, 0);
        var scl = new Array(sclX, sclY, sclZ);
        addTriangle(ceilingTriangleLeftGeometry, pos, rot, scl, triangleMaterialColor);

        var pos = new Array(-posX, posY, posZ);
        var rot = new Array(0, 0, 0);
        var scl = new Array(sclX, sclY, sclZ);
        addTriangle(ceilingTriangleLeftGeometry, pos, rot, scl, triangleMaterialColor);

        posX = 20;
        posY = 100;
        posZ = 790;
        sclX = 3;
        sclY = 3;
        sclZ = 1;

        var pos = new Array(posX, posY, posZ);
        var rot = new Array(-pi/2, -pi*2, pi);
        var scl = new Array(sclX, sclY, sclZ);
        addTriangle(ceilingTriangleLeftGeometry, pos, rot, scl, triangleMaterialColor);

        var pos = new Array(-posX, posY, posZ);
        var rot = new Array(-pi/2, pi, -pi);
        var scl = new Array(sclX, sclY, sclZ);
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

function addCubeShape(pos, dim, rot, scl, materialColor){
    var mesh = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( dim[0], dim[1], dim[2], 1, 1, 1 ), getMultimaterial(materialColor));
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.rotation.set(rot[0], rot[1], rot[2]);
    mesh.scale.set( scl[0], scl[1], scl[2]);
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
	var radius = 140;
	var widthSegments = 32;
	var heightSegments = 10;
	var phiStart = 0;
	var phiLength = pi;
	var thetaStart = 0;
	var thetaLength = pi / 2;
	addSphereShape(0,100, 650, radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength, "afaefa");
}

function addSphereShape(x,y,z, radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength, materialColor){
    var mesh = THREE.SceneUtils.createMultiMaterialObject(new THREE.SphereGeometry( 140, 32, 10, 0, pi, 0, pi / 2 ),getMultimaterial(materialColor) );
	mesh.position.set(0, 100, 650);
	scene.add(mesh);
}

function addInnerWall(){
    var wallHeight = 235;
    var yPosition = 120;
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
    wall.rotation.set(0, pi / 2, 0);
    scene.add(wall);

    var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 120, wallHeight, 15, 1, 1, 1 ), multiMaterial);
    wall.position.set(xIndex, yPosition, zIndex);
    wall.rotation.set(0, pi / 2, 0);
    scene.add(wall);
}

function addDachFirst(){
    var multiMaterial = getMultimaterial("ffff00");

    var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 980, 10, 15, 1, 1, 1 ), multiMaterial);
    wall.position.set(0, 243, 595);
    scene.add(wall);

    // Seitenwände
    var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 385, 10, 15, 1, 1, 1 ), multiMaterial);
    wall.position.set(-480, 243, 795);
    wall.rotation.set(0, pi / 2, 0);
    scene.add(wall);

    var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 385, 10, 15, 1, 1, 1 ), multiMaterial);
    wall.position.set(480, 243, 795);
    wall.rotation.set(0, pi / 2, 0);
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
    wall.rotation.set(0, pi / 2, 0);
    scene.add(wall);

    var wall = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 385, wallHeight, 15, 1, 1, 1 ), multiMaterial);
    wall.position.set(480, yPosition, 795);
    wall.rotation.set(0, pi / 2, 0);
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
        fence.rotation.set(0, pi / 2, pi);
        scene.add(fence);

        var fence = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( fenceLength, 5, 2, 1, 1, 1 ), multiMaterial);
        fence.position.set(xPositionsColumnsSideFence[0], 8, zPositionsColumnsSideFence[i]);
        fence.rotation.set(0, pi / 2, pi);
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
    columnSettings.columnHeight = 207;
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
    shape.rotation.set(pi, pi / 4, 0);
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
    shape.rotation.set(pi, pi / 4, 0);
    scene.add(shape);

    // the top frustum
    var multiMaterial = getMultimaterial("cacaca");
    var shape = THREE.SceneUtils.createMultiMaterialObject(new THREE.CylinderGeometry( 35, radiusAtBottom, 15, segmentsAroundRadius, segmentsAlongHeight), multiMaterial );
    shape.position.set(columnSettings.xPosition, columnSettings.columnHeight + 30, columnSettings.zPosition);
    scene.add(shape);
    shape.rotation.set(0, pi / 4, 0);

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


function getMultimaterial(meshColor, wireframeColor){
    var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, side: THREE.DoubleSide } );
    var meshMaterial= new THREE.MeshBasicMaterial( { color: parseInt(meshColor, 16),wireframe: initArray.showGridLinesOnly, side: THREE.DoubleSide} );
    var multiMaterial = [ meshMaterial, wireframeMaterial];
    return multiMaterial;
}