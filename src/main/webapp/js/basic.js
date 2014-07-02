var initArray = {};

window.onload = function(){

    // Holds information about skybox color and ground textere

    initArray.groundTexture = 'img/gras.png';
    initArray.skyboxColor = 'aabbcc';
    initArray.showStats = false;

    // Dimension of plane (grundfläche)
    initArray.planeWidth = 2000;
    initArray.planeHeight = 2000;

    var cameraPos = {};
    cameraPos.X = -1200;
    cameraPos.Y = 500;
    cameraPos.Z = -600;

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
}
function addFence(){

    var xPositionsColumnsFrontFence = new Array(170, 380);
    var multiMaterial = getMultimaterial("ffaacc");

    for(var i = 0 ; i < xPositionsColumnsFrontFence.length; i++){
        var fence = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 210, 5, 2, 1, 1, 1 ), multiMaterial);
        fence.position.set(xPositionsColumnsFrontFence[i], 8, 10);
        scene.add(fence);

        var fence = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 210, 5, 2, 1, 1, 1 ), multiMaterial);
        fence.position.set(-xPositionsColumnsFrontFence[i], 8, 10);
        scene.add(fence);
    }

    var xPositionsColumnsSideFence = new Array(480, 170, 370);
    var uPositionsColumnsSideFence = new Array(10, 100, 300, 500);

    var multiMaterial = getMultimaterial("ffaacc");


    var fence = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 190, 5, 2, 1, 1, 1 ), multiMaterial);
    fence.position.set(-480, 8, 100);
    fence.rotation.set(0, Math.PI / 2, Math.PI);
    scene.add(fence);

    var fence = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 190, 5, 2, 1, 1, 1 ), multiMaterial);
    fence.position.set(-480, 8, 300);
    fence.rotation.set(0, Math.PI / 2, Math.PI);
    scene.add(fence);

    var fence = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 190, 5, 2, 1, 1, 1 ), multiMaterial);
    fence.position.set(-480, 8, 500);
    fence.rotation.set(0, Math.PI / 2, Math.PI);
    scene.add(fence);

    /*var fence = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 190, 5, 2, 1, 1, 1 ), multiMaterial);
    fence.position.set(170, 8, 10);
    scene.add(fence);

    var fence = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 210, 5, 2, 1, 1, 1 ), multiMaterial);
    fence.position.set(370, 8, 10);
    scene.add(fence);

    var fence = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 190, 5, 2, 1, 1, 1 ), multiMaterial);
    fence.position.set(480, 8, 100);
    fence.rotation.set(0, Math.PI / 2, Math.PI);
    scene.add(fence);

    var fence = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 190, 5, 2, 1, 1, 1 ), multiMaterial);
    fence.position.set(480, 8, 300);
    fence.rotation.set(0, Math.PI / 2, Math.PI);
    scene.add(fence);

    var fence = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( 190, 5, 2, 1, 1, 1 ), multiMaterial);
    fence.position.set(480, 8, 500);
    fence.rotation.set(0, Math.PI / 2, Math.PI);
    scene.add(fence);*/


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
    var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true } );
    var meshMaterial= new THREE.MeshBasicMaterial( { color: parseInt(meshColor, 16)} );
    var multiMaterial = [ wireframeMaterial, meshMaterial ];
    return multiMaterial;
}
