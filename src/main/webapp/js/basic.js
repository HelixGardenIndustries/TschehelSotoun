var initArray = {};
const pi = Math.PI;

window.onload = function () {
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
};

function addFundamentPalace() {
    var pos, dim;
    pos = [0, 1, initArray.planeHeight / 4];
    dim = [initArray.planeWidth / 2, initArray.fundamentHeight, initArray.planeHeight / 2];
    addCubeShapeWithTexture(pos, dim, getDefaultRotating(), getDefaultScaling(), getMaterialForCube('img/groundTexture.png', 8, 8));
}

function addRoof() {
    addRoofLayerThree();
    addRoofLayerTwo();
    addRoofLayerOne();
    addRoofLayerZero();

}

function addRoofLayerZero() {
    var pos, dim;
    pos = [1, 245, 500];
    dim = [1000, 40, 1000];
    addCubeDefSclDefRot(pos, dim, 'img/umrandung_dach_layer_1.png', 16, 1);

}

function addCubeDefSclDefRot(pos, dim, textureName, textureRepeatX, textureRepeatY){
    addCubeDefScl(pos, dim, getDefaultRotating(), textureName, textureRepeatX, textureRepeatY);
}

function addCubeDefScl(pos, dim, rot, textureName, textureRepeatX, textureRepeatY){
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube(textureName, textureRepeatX, textureRepeatY));
}

function addRoofLayerOne() {
    var pos, dim, rot;
    // Layer 1
    pos = [0, 282, -8];
    dim = [1000, 40, 1];
    rot = [pi / -8, 0, 0];
    addCubeDefScl(pos, dim, rot, 'img/umrandung_dach_unten_layer_1.png', 64, 1);


    pos = [0, 282, 1008];
    dim = [1000, 40, 1];
    rot = [pi / 8, 0, 0];
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/umrandung_dach_unten_layer_1.png', 64, 1));

    pos = [508, 282, 500];
    dim = [1, 40, 1000];
    rot = [0, 0, pi / -8];
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/umrandung_dach_unten_layer_1.png', 64, 1));

    pos = [-508, 282, 500];
    dim = [1, 40, 1000];
    rot = [0, 0, pi / 8];
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/umrandung_dach_unten_layer_1.png', 64, 1));


    pos = [500, 280, 0];
    rot = [0, pi / 4, 0];
    addPyramideShapeWithTexture(pos, rot, getDefaultScaling(), 20, 0, 40, getMaterialForCube('img/umrandung_dach_unten_layer_1.png', 2, 1));

    pos = [-500, 280, 0];
    rot = [0, pi / 4, 0];
    addPyramideShapeWithTexture(pos, rot, getDefaultScaling(), 20, 0, 40, getMaterialForCube('img/umrandung_dach_unten_layer_1.png', 2, 1));

    pos = [-500, 280, 1000];
    rot = [0, pi / 4, 0];
    addPyramideShapeWithTexture(pos, rot, getDefaultScaling(), 20, 0, 40, getMaterialForCube('img/umrandung_dach_unten_layer_1.png', 2, 1));

    pos = [500, 280, 1000];
    rot = [0, pi / 4, 0];
    addPyramideShapeWithTexture(pos, rot, getDefaultScaling(), 20, 0, 40, getMaterialForCube('img/umrandung_dach_unten_layer_1.png', 1, 1));

    pos = [1, 300, 500];
    dim = [1030, 1, 1030];
    addCubeShapeWithTexture(pos, dim, getDefaultRotating(), getDefaultScaling(), getMaterialForCube('img/umrandung_dach_layer_1.png', 16, 1));

}

function addRoofLayerTwo() {
    var pos, dim, rot, rotx;
    var width = 979;
    rotx = pi / 4;
    var repeat = 64;
    var repeatPyramide = 9;

    pos = [0, 315, 0];
    dim = [width, 40, 1];
    rot = [rotx, 0, 0];
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/dach-schraeg-oben.png', repeat, 1));

    pos = [0, 315, 1008];
    dim = [width, 40, 1];
    rot = [-rotx, 0, 0];
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/dach-schraeg-oben.png', repeat, 1));

    pos = [500, 315, 500];
    dim = [1, 40, width];
    rot = [0, 0, rotx];
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/dach-schraeg-oben.png', 64, 1));

    pos = [-500, 315, 508];
    dim = [1, 40, width];
    rot = [0, 0, -rotx];
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/dach-schraeg-oben.png', 64, 1));


    pos = [490, 316, 13];
    rot = [0, pi / 4, 0];
    addPyramideShapeWithTexture(pos, rot, getDefaultScaling(), 0, 40, 30, getMaterialForCube('img/dach-schraeg-oben.png', repeatPyramide, 16));

    pos = [-485, 316, 13];
    rot = [0, pi / 4, 0];
    addPyramideShapeWithTexture(pos, rot, getDefaultScaling(), 0, 40, 30, getMaterialForCube('img/dach-schraeg-oben.png', repeatPyramide, 16));

    pos = [-485, 316, 993];
    rot = [0, pi / 4, 0];
    addPyramideShapeWithTexture(pos, rot, getDefaultScaling(), 0, 40, 30, getMaterialForCube('img/dach-schraeg-oben.png', repeatPyramide, 16));

    pos = [487, 316, 990];
    rot = [0, pi / 4, 0];
    addPyramideShapeWithTexture(pos, rot, getDefaultScaling(), 0, 40, 30, getMaterialForCube('img/dach-schraeg-oben.png', repeatPyramide, 16));
}

function addRoofLayerThree() {
    var pos, dim, rot;
    pos = [1, 335, 500];
    dim = [980, 10, 980];
    addCubeShapeWithTexture(pos, dim, getDefaultRotating(), getDefaultScaling(), getMaterialForCube('img/dach-basis-pyramide.png', 16, 1));

    pos = [0, 393, 500];
    rot = [0, pi / 4, 0];
    addPyramideShapeWithTexture(pos, rot, getDefaultScaling(), 0, 600, 100, getMaterialForCube('img/pyramid-top.png', 64, 64));
}

function addInnerWallTriangles() {
    var pos, rot, posX, posY, posZ, sclX, sclY, sclZ, scl;

    var ceilingTriangleLeftGeometry = getTriangleFromCoordinates();
    var triangleMaterialColor = "ff0000";
    posX = 0, posY = 160, posZ = 750, sclX = 1, sclY = 1, sclZ = 1;

    pos = [posX, posY, posZ];
    rot = [0, pi, 0];
    scl = [sclX, sclY, sclZ];
    addTriangle(ceilingTriangleLeftGeometry, pos, rot, scl, triangleMaterialColor);

    pos = [-posX, posY, posZ];
    scl = [sclX, sclY, sclZ];
    rot = [0, pi * 2, 0];
    addTriangle(ceilingTriangleLeftGeometry, pos, rot, scl, triangleMaterialColor);
}

function getTriangleFromCoordinates() {
    var a = 45;
    var b = 50;
    var c = 0;
    var sideTriangleLeft = new THREE.Shape();
    sideTriangleLeft.moveTo(0, 0);
    sideTriangleLeft.quadraticCurveTo(a, c, b, -a);
    sideTriangleLeft.quadraticCurveTo(b, -a, b, c);
    sideTriangleLeft.quadraticCurveTo(b, c, c, c);
    return new THREE.ShapeGeometry(sideTriangleLeft);
}

/**
 TODO: Diese Funktion entfernen, da nur noch texture funktionen hinzukommen
 **/
function addCubeShape(position, dimension, rotation, scaling, materialColor) {
    var mesh = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry(dimension[0], dimension[1], dimension[2], 1, 1, 1), getMultimaterial(materialColor));
    mesh.position.set(position[0], position[1], position[2]);
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    mesh.scale.set(scaling[0], scaling[1], scaling[2]);
    scene.add(mesh);
}

function addCubeShapeWithTexture(position, dimension, rotation, scaling, columnMaterial) {

    // the column on the frustum
    var mesh = new THREE.Mesh(new THREE.CubeGeometry(dimension[0], dimension[1], dimension[2], 1, 1, 1), columnMaterial);
    mesh.position.set(position[0], position[1], position[2]);
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    mesh.scale.set(scaling[0], scaling[1], scaling[2]);
    scene.add(mesh);
}

function addPyramideShapeWithTexture(position, rotation, scaling, radiusTop, radiusBottom, height, columnMaterial) {

    // the column on the frustum
    var mesh = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 4, 4), columnMaterial);
    mesh.position.set(position[0], position[1], position[2]);
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    mesh.scale.set(scaling[0], scaling[1], scaling[2]);
    scene.add(mesh);
}

function addPyramideShapeWithColor(position, rotation, scaling, radiusTop, radiusBottom, height, materialColor) {

    // the column on the frustum
    var mesh = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 4, 4), getMultimaterial(materialColor));
    mesh.position.set(position[0], position[1], position[2]);
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    mesh.scale.set(scaling[0], scaling[1], scaling[2]);
    scene.add(mesh);
}


function addTriangle(geometry, pos, rot, scl, materialColor) {
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geometry, getMultimaterial(materialColor));
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.rotation.set(rot[0], rot[1], rot[2]);
    mesh.scale.set(scl[0], scl[1], scl[2]);
    scene.add(mesh);
}

function addDome() {

    var radius = 53;
    var widthSegments = 64;
    var heightSegments = 64;
    var phiStart = 0;
    var phiLength = pi;
    var thetaStart = 0;
    var thetaLength = pi / 2;
    addSphereShape(0, 100, 750, radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength, "ff0000");
    addInnerWallTriangles();
}

function addSphereShape(x, y, z, radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength, materialColor) {
    var mesh = THREE.SceneUtils.createMultiMaterialObject(new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength), getMultimaterial(materialColor));
    mesh.position.set(x, y, z);
    mesh.scale.set(1, 1.5, 1);
    scene.add(mesh);
}

function addInnerWall() {
    var pos, dim, rot, ry;
    var px = 100;
    var py = 120;
    var pz = 732;
    var dx = 100;
    var dy = 235;
    var dz = 15;
    dim = [dx, dy, dz];

    pos = [px, py, pz];
    addCubeShapeWithTexture(pos, dim, getDefaultRotating(), getDefaultScaling(), getMaterialForCube('img/front_links_eingang_hinten.png', 1, 1));

    pos = [-px, py, pz];
    addCubeShapeWithTexture(pos, dim, getDefaultRotating(), getDefaultScaling(), getMaterialForCube('img/front_rechts_eingang_hinten.png', 1, 1));

    pos = [0, py, pz];
    addCubeShapeWithTexture(pos, dim, getDefaultRotating(), getDefaultScaling(), getMaterialForCube('img/front_hinten.png', 1, 1));

    px = 142;
    pz = 665;
    dx = 150;
    ry = pi / 2;

    pos = [-px, py, pz];
    dim = [dx, dy, dz];
    rot = [0, ry, 0];
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/front_rechts_eingang.png', 1, 1));

    pos = [px, py, pz];
    dim = [dx, dy, dz];
    rot = [0, ry, 0];

    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/front_links_eingang.png', 1, 1));
}

function addOuterWall() {
    var pos, dim, rot;
    pos = [315, 120, 595];
    dim = [350, 235, 15];
    addCubeShapeWithTexture(pos, dim, getDefaultRotating(), getDefaultScaling(), getMaterialForCube('img/front_links.png', 1, 1));

    pos = [-315, 120, 595];
    dim = [350, 235, 15];
    addCubeShapeWithTexture(pos, dim, getDefaultRotating(), getDefaultScaling(), getMaterialForCube('img/front_rechts.png', 1, 1));

    pos = [0, 120, 990];
    dim = [980, 235, 15];
    addCubeShapeWithTexture(pos, dim, getDefaultRotating(), getDefaultScaling(), getMaterialForCube('img/hinten.png', 1, 1));

    pos = [-480, 120, 795];
    dim = [385, 235, 15];
    rot = [0, pi / 2, 0];
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/hinten.png', 1, 1));

    pos = [480, 120, 795];
    dim = [385, 235, 15];
    rot = [0, pi / 2, 0];
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube('img/hinten.png', 1, 1));
}

function addFence() {
    var fence;
    var xPositionsColumnsFrontFence = [170, 380];

    var fenceLength = 190;
    var materials = getMaterialForCube('img/fenceFrontAndBackSide2.png', 24, 1);
    var yPosFence = 11;
    var i;

    // The front fences
    for (i = 0; i < xPositionsColumnsFrontFence.length; i++) {
        fence = new THREE.Mesh(new THREE.CubeGeometry(210, 10, 5, 2, 1, 1), materials);
        fence.position.set(xPositionsColumnsFrontFence[i], yPosFence, 10);
        scene.add(fence);

        fence = new THREE.Mesh(new THREE.CubeGeometry(210, 10, 5, 1, 1, 1), materials);
        fence.position.set(-xPositionsColumnsFrontFence[i], yPosFence, 10);
        scene.add(fence);
    }

    var xPositionsColumnsSideFence = [480, 170, 370];
    var zPositionsColumnsSideFence = [100, 300, 500];

    // The fences on the site
    for (i = 0; i < zPositionsColumnsSideFence.length; i++) {
        fence = new THREE.Mesh(new THREE.CubeGeometry(fenceLength, 10, 2, 1, 1, 1), materials);
        fence.position.set(-xPositionsColumnsSideFence[0], yPosFence, zPositionsColumnsSideFence[i]);
        fence.rotation.set(0, pi / 2, pi);
        scene.add(fence);

        fence = new THREE.Mesh(new THREE.CubeGeometry(fenceLength, 10, 2, 1, 1, 1), materials);
        fence.position.set(xPositionsColumnsSideFence[0], yPosFence, zPositionsColumnsSideFence[i]);
        fence.rotation.set(0, pi / 2, pi);
        scene.add(fence);
    }
}

/**
 This function adds the columns to the scene which are holding the roof
 */
function addRoofColumns() {

    var xPositionsColumns = [480, 270, 70];

    // Add the 20 columns
    for (var i = 0; i < xPositionsColumns.length; i++) {
        // 1. reihe
        addFirstColumnRow(10, xPositionsColumns[i]);
        addFirstColumnRow(10, -xPositionsColumns[i]);

        // 2. reihe
        addFirstColumnRow(200, xPositionsColumns[i]);
        addFirstColumnRow(200, -xPositionsColumns[i]);

        // 3. reihe
        addFirstColumnRow(400, xPositionsColumns[i]);
        addFirstColumnRow(400, -xPositionsColumns[i]);

        // 4. reihe
        addFirstColumnRow(600, xPositionsColumns[2]);
        addFirstColumnRow(600, -xPositionsColumns[2]);
    }
}

function addFirstColumnRow(zPosition, xPosition) {

    var columnSettings = {};
    columnSettings.columnHeight = 190;
    columnSettings.columnWidth = 10;
    columnSettings.zPosition = zPosition;
    columnSettings.xPosition = xPosition;
    addColumn(columnSettings);
}

function addColumn(columnSettings) {

    // from drawing
    var pillarBottomMaterial = getMaterialForCube('img/pillarBottom.png', 1, 1);
    var columnMaterial = getMaterialForCube('img/column.png', 1, 1);
    var shape, column;
    var frustumCubeMaterial = getMaterialForCube('img/frustumCube.png', 1, 1);
    var cubeLevel1CubeMaterial = getMaterialForCube('img/columnTopLevel1.png', 1, 1);
    var cubeLevel2CubeMaterial = getMaterialForCube('img/columnTopLevel2.png', 1, 1);
    var cubeLevel3CubeMaterial = getMaterialForCube('img/columnTopLevel3.png', 1, 1);
    var cubeLevel4CubeMaterial = getMaterialForCube('img/columnTopLevel4.png', 1, 1);

    // the column on the ground
    shape = new THREE.Mesh(new THREE.CylinderGeometry(10, 8, 10, 4, 4), pillarBottomMaterial);
    shape.position.set(columnSettings.xPosition, 10, columnSettings.zPosition);
    shape.rotation.set(pi, pi / 4, 0);
    scene.add(shape);

    // the column on the frustum
    column = new THREE.Mesh(new THREE.CubeGeometry(columnSettings.columnWidth, columnSettings.columnHeight, 10, 1, 1, 1), columnMaterial);
    column.position.set(columnSettings.xPosition, columnSettings.columnHeight / 2 + 5, columnSettings.zPosition);
    scene.add(column);

    // the frustum son the column
    shape = new THREE.Mesh(new THREE.CubeGeometry(10, 10, 10, 1, 1, 1), cubeLevel1CubeMaterial);
    shape.position.set(columnSettings.xPosition, columnSettings.columnHeight + 10, columnSettings.zPosition);
    scene.add(shape);

    shape = new THREE.Mesh(new THREE.CubeGeometry(12, 12, 12, 1, 1, 1), cubeLevel2CubeMaterial);
    shape.position.set(columnSettings.xPosition, columnSettings.columnHeight + 21, columnSettings.zPosition);
    scene.add(shape);

    shape = new THREE.Mesh(new THREE.CubeGeometry(14, 14, 14, 1, 1, 1), cubeLevel3CubeMaterial);
    shape.position.set(columnSettings.xPosition, columnSettings.columnHeight + 31, columnSettings.zPosition);
    scene.add(shape);

    shape = new THREE.Mesh(new THREE.CubeGeometry(16, 16, 16, 1, 1, 1), cubeLevel4CubeMaterial);
    shape.position.set(columnSettings.xPosition, columnSettings.columnHeight + 41, columnSettings.zPosition);
    scene.add(shape);

    // the top frustum
    shape = new THREE.Mesh(new THREE.CubeGeometry(18, 18, 18, 1, 1, 1), frustumCubeMaterial);
    shape.position.set(columnSettings.xPosition, columnSettings.columnHeight + 41, columnSettings.zPosition);
    scene.add(shape);
}

function addStairsFundament() {

    var stairColors = ["00000ff", "ff0000", "00ff00"];

    var stairWidthDivisor = 10;
    var cube, positionY, positionZ;
    var cubeDepth = 10;
    var widthSegments = 1;
    var heightSegments = 1;
    var depthSegments = 1;

    for (var i = 0; i < stairColors.length; i++) {
        var cubeWidth = (initArray.planeWidth / 2) / stairWidthDivisor;
        var cubeHeight = 10 - (stairColors.length * i + 1);
        var darkMaterial = new THREE.MeshBasicMaterial({ color: parseInt(stairColors[i], 16) });
        var cubeGeometry = new THREE.CubeGeometry(cubeWidth, cubeHeight, cubeDepth, widthSegments, heightSegments, depthSegments);
        cube = new THREE.Mesh(cubeGeometry, darkMaterial);
        positionY = -1.5 + (i * -1.5);
        positionZ = -5 - (i * 10);
        cube.position.set(0, positionY, positionZ);
        scene.add(cube);
    }
}

function getDefaultRotating() {
    return [0, 0, 0];
}

function getDefaultScaling() {
    return [1, 1, 1];
}


function getMultimaterial(meshColor) {
    var wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, side: THREE.DoubleSide });
    var meshMaterial = new THREE.MeshBasicMaterial({ color: parseInt(meshColor, 16), wireframe: initArray.showGridLinesOnly, side: THREE.DoubleSide});
    return [ meshMaterial, wireframeMaterial];
}

function getMaterialForCube(textureName, repeatX, repeatY) {
    var floorTexture = THREE.ImageUtils.loadTexture(textureName);
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(repeatX, repeatY);

    var materials = [
        new THREE.MeshLambertMaterial({
            map: floorTexture, transparent: true, opacity: 1.0, wireframe: initArray.showGridLinesOnly, color: 0xFFFFFF
        }),
        new THREE.MeshLambertMaterial({
            map: floorTexture, transparent: true, opacity: 1.0, wireframe: initArray.showGridLinesOnly, color: 0xFFFFFF
        }),
        new THREE.MeshLambertMaterial({
            map: floorTexture, transparent: true, opacity: 1.0, wireframe: initArray.showGridLinesOnly, color: 0xFFFFFF
        }),
        new THREE.MeshLambertMaterial({
            map: floorTexture, transparent: true, opacity: 1.0, wireframe: initArray.showGridLinesOnly, color: 0xFFFFFF
        }),
        new THREE.MeshLambertMaterial({
            map: floorTexture, transparent: true, opacity: 1.0, wireframe: initArray.showGridLinesOnly, color: 0xFFFFFF
        }),
        new THREE.MeshLambertMaterial({
            map: floorTexture, transparent: true, opacity: 1.0, wireframe: initArray.showGridLinesOnly, color: 0xFFFFFF
        })
    ];

    return new THREE.MeshFaceMaterial(materials);
}
