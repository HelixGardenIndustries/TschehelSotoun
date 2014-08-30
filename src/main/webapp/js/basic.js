var initArray = {};
const pi = Math.PI;
var baseMesh;
var group = new THREE.Object3D;
var mergedGeo = new THREE.Geometry();
var doMerge = false;

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
    initArray.planeWidth = 2000;
    initArray.planeHeight = 2000;

    var cameraPos = {};
    cameraPos.X = 100;
    cameraPos.Y = 10;
    cameraPos.Z = -1200;

    initArray.cameraPos = cameraPos;

    init(initArray);

    addFundamentPalace();
    addRoofColumns();
    addFence();
    addOuterWall();
    addInnerWall();
    addRoof();
    scene.add(group);
    animate();

}

function addMesh(mesh, material) {

    if (doMerge) {
        mergedGeo.merge(mesh.geometry, mesh.matrix, material);
    } else {
        doMerge = true;
        group = new THREE.Mesh(mergedGeo, material);
        group.matrixAutoUpdate = false;
        group.updateMatrix();
        group.add(mesh);
    }
}

function addFundamentPalace() {
    var pos, dim;
    pos = [0, 1, initArray.planeHeight / 4];
    dim = [initArray.planeWidth / 2, initArray.fundamentHeight, initArray.planeHeight / 2];
    addCubeDefSclDefRot(pos, dim, 'img/groundTexture.png', 8, 8);
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
    addCubeDefSclDefRot(pos, dim, UMRADNUNG_DACH_LAYER_1, 16, 1);
}

function addRoofLayerOne() {
    var pos, dim, rot;
    // Layer 1
    pos = [0, 282, -8];
    dim = [1000, 40, 1];
    rot = [pi / -8, 0, 0];
    addCubeDefScl(pos, dim, rot, UMRANDUNG_DACH_UNTEN_LAYER_1, 64, 1);


    pos = [0, 282, 1008];
    dim = [1000, 40, 1];
    rot = [pi / 8, 0, 0];
    addCubeDefScl(pos, dim, rot, UMRANDUNG_DACH_UNTEN_LAYER_1, 64, 1);

    pos = [508, 282, 500];
    dim = [1, 40, 1000];
    rot = [0, 0, pi / -8];
    addCubeDefScl(pos, dim, rot, UMRANDUNG_DACH_UNTEN_LAYER_1, 64, 1);

    pos = [-508, 282, 500];
    dim = [1, 40, 1000];
    rot = [0, 0, pi / 8];
    addCubeDefScl(pos, dim, rot, UMRANDUNG_DACH_UNTEN_LAYER_1, 64, 1);


    pos = [500, 280, 0];
    rot = [0, pi / 4, 0];
    addPyramideDefScl(pos, rot, 20, 0, 40, UMRANDUNG_DACH_UNTEN_LAYER_1, 2, 1);

    pos = [-500, 280, 0];
    rot = [0, pi / 4, 0];
    addPyramideDefScl(pos, rot, 20, 0, 40, UMRANDUNG_DACH_UNTEN_LAYER_1, 2, 1);

    pos = [-500, 280, 1000];
    rot = [0, pi / 4, 0];
    addPyramideDefScl(pos, rot, 20, 0, 40, UMRANDUNG_DACH_UNTEN_LAYER_1, 2, 1);

    pos = [500, 280, 1000];
    rot = [0, pi / 4, 0];
    addPyramideDefSclDefRep(pos, rot, 20, 0, 40, UMRANDUNG_DACH_UNTEN_LAYER_1);

    pos = [1, 300, 500];
    dim = [1030, 1, 1030];
    addCubeDefSclDefRot(pos, dim, UMRADNUNG_DACH_LAYER_1, 16, 1);

}

function addRoofLayerTwo() {
    var pos, dim, rot, rotx;
    var width = 979;
    rotx = pi / 4;
    var repeat = 64;
    var repeatPyramideX = 9;
    var repeatPyramideY = 16;

    pos = [0, 315, 0];
    dim = [width, 40, 1];
    rot = [rotx, 0, 0];
    addCubeDefScl(pos, dim, rot, DACH_SCHRAEG_OBEN, repeat, 1);

    pos = [0, 315, 1008];
    dim = [width, 40, 1];
    rot = [-rotx, 0, 0];
    addCubeDefScl(pos, dim, rot, DACH_SCHRAEG_OBEN, repeat, 1);

    pos = [500, 315, 500];
    dim = [1, 40, width];
    rot = [0, 0, rotx];
    addCubeDefScl(pos, dim, rot, DACH_SCHRAEG_OBEN, repeat, 1);

    pos = [-500, 315, 508];
    dim = [1, 40, width];
    rot = [0, 0, -rotx];
    addCubeDefScl(pos, dim, rot, DACH_SCHRAEG_OBEN, repeat, 1);


    pos = [490, 316, 13];
    rot = [0, pi / 4, 0];
    addPyramideDefScl(pos, rot, 0, 40, 30, DACH_SCHRAEG_OBEN, repeatPyramideX, repeatPyramideY);

    pos = [-485, 316, 13];
    rot = [0, pi / 4, 0];
    addPyramideDefScl(pos, rot, 0, 40, 30, DACH_SCHRAEG_OBEN, repeatPyramideX, repeatPyramideY);

    pos = [-485, 316, 993];
    rot = [0, pi / 4, 0];
    addPyramideDefScl(pos, rot, 0, 40, 30, DACH_SCHRAEG_OBEN, repeatPyramideX, repeatPyramideY);

    pos = [487, 316, 990];
    rot = [0, pi / 4, 0];
    addPyramideDefScl(pos, rot, 0, 40, 30, DACH_SCHRAEG_OBEN, repeatPyramideX, repeatPyramideY);
}

function addRoofLayerThree() {
    var pos, dim, rot;
    pos = [1, 335, 500];
    dim = [980, 10, 980];
    addCubeDefSclDefRot(pos, dim, DACH_BASIS_PYRAMIDE, 16, 1);

    pos = [0, 393, 500];
    rot = [0, pi / 4, 0];
    addPyramideDefScl(pos, rot, 0, 600, 100, PYRAMIDE_TOP, 64, 64);
}

function addCubeShapeWithTexture(position, dimension, rotation, scaling, columnMaterial) {
    // the column on the frustum
    var mesh = new THREE.Mesh(new THREE.BoxGeometry(dimension[0], dimension[1], dimension[2], 1, 1, 1), columnMaterial);
    mesh.position.set(position[0], position[1], position[2]);
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    mesh.scale.set(scaling[0], scaling[1], scaling[2]);
    addMesh(mesh, columnMaterial);
}

function addPyramideShapeWithTexture(position, rotation, scaling, radiusTop, radiusBottom, height, columnMaterial) {
    // the column on the frustum
    var mesh = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 4, 4), columnMaterial);
    mesh.position.set(position[0], position[1], position[2]);
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    mesh.scale.set(scaling[0], scaling[1], scaling[2]);
    addMesh(mesh, columnMaterial);
}

function addPyramideShapeWithColor(position, rotation, scaling, radiusTop, radiusBottom, height, materialColor) {
    // the column on the frustum
    var mesh = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 4, 4), getMultimaterial(materialColor));
    mesh.position.set(position[0], position[1], position[2]);
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    mesh.scale.set(scaling[0], scaling[1], scaling[2]);
    addMesh(mesh);
}

function addTriangle(geometry, pos, rot, scl, materialColor) {
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geometry, getMultimaterial(materialColor));
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.rotation.set(rot[0], rot[1], rot[2]);
    mesh.scale.set(scl[0], scl[1], scl[2]);
    addMesh(mesh);
}

function addSphereShape(x, y, z, radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength, materialColor) {
    var mesh = THREE.SceneUtils.createMultiMaterialObject(new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength), getMultimaterial(materialColor));
    mesh.position.set(x, y, z);
    mesh.scale.set(1, 1.5, 1);
    addMesh(mesh);
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
    addCubeDefSclDefRotDefRep(pos, dim, FRONT_LINKS_EINGANG_HINTEN);

    pos = [-px, py, pz];
    addCubeDefSclDefRotDefRep(pos, dim, FRONT_RECHTS_EINGANG_HINTEN);

    pos = [0, py, pz];
    addCubeDefSclDefRotDefRep(pos, dim, FRONT_HINTEN);
    px = 142;
    pz = 665;
    dx = 150;
    ry = pi / 2;
    pos = [-px, py, pz];
    dim = [dx, dy, dz];
    rot = [0, ry, 0];
    addCubeDefSclDefRep(pos, dim, rot, FRONT_RECHTS_EINGANG);

    pos = [px, py, pz];
    dim = [dx, dy, dz];
    rot = [0, ry, 0];
    addCubeDefSclDefRep(pos, dim, rot, FRONT_LINKS_EINGANG);
}

function addOuterWall() {

    var pos, dim, rot;
    pos = [315, 120, 595];
    dim = [350, 235, 15];
    addCubeDefSclDefRotDefRep(pos, dim, FRONT_LINKS);
    pos = [-315, 120, 595];

    dim = [350, 235, 15];
    addCubeDefSclDefRotDefRep(pos, dim, FRONT_RECHTS);
    pos = [0, 120, 990];

    dim = [980, 235, 15];
    addCubeDefSclDefRotDefRep(pos, dim, HINTEN);

    pos = [-480, 120, 795];
    dim = [385, 235, 15];
    rot = [0, pi / 2, 0];
    addCubeDefSclDefRep(pos, dim, rot, HINTEN);

    pos = [480, 120, 795];
    dim = [385, 235, 15];
    rot = [0, pi / 2, 0];
    addCubeDefSclDefRep(pos, dim, rot, HINTEN);
}

function addPyramideDefSclDefRot(pos, radiusTop, radiusBottom, height, textureName, textureRepeatX, textureRepeatY) {
    addPyramideShapeWithTexture(pos, getDefaultRotating(), getDefaultScaling(), radiusTop, radiusBottom, height, getMaterialForCube(textureName, textureRepeatX, textureRepeatY))
}
function addPyramideDefSclDefRep(pos, rot, radiusTop, radiusBottom, height, textureName) {
    addPyramideDefScl(pos, rot, radiusTop, radiusBottom, height, textureName, 1, 1);
}

function addPyramideDefScl(pos, rot, radiusTop, radiusBottom, height, textureName, textureRepeatX, textureRepeatY) {
    addPyramideShapeWithTexture(pos, rot, getDefaultScaling(), radiusTop, radiusBottom, height, getMaterialForCube(textureName, textureRepeatX, textureRepeatY))
}

function addCubeDefSclDefRotDefRep(pos, dim, textureName) {
    addCubeDefScl(pos, dim, getDefaultRotating(), textureName, 1, 1);
}

function addCubeDefSclDefRot(pos, dim, textureName, textureRepeatX, textureRepeatY) {
    addCubeDefScl(pos, dim, getDefaultRotating(), textureName, textureRepeatX, textureRepeatY);
}

function addCubeDefScl(pos, dim, rot, textureName, textureRepeatX, textureRepeatY) {
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube(textureName, textureRepeatX, textureRepeatY));
}

function addCubeDefSclDefRep(pos, dim, rot, textureName) {
    addCubeShapeWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube(textureName, 1, 1));
}


function addFence() {
    var fence;
    var xPositionsColumnsFrontFence = [170, 380];

    var fenceLength = 190;
    var materials = getMaterialForCube(FENCE_FRONT_AND_BACK_SIDE, 24, 1);
    var yPosFence = 11;
    var i;

    // The front fences
    for (i = 0; i < xPositionsColumnsFrontFence.length; i++) {
        fence = new THREE.Mesh(new THREE.BoxGeometry(210, 10, 5, 2, 1, 1), materials);
        fence.position.set(xPositionsColumnsFrontFence[i], yPosFence, 10);
        addMesh(fence);

        fence = new THREE.Mesh(new THREE.BoxGeometry(210, 10, 5, 1, 1, 1), materials);
        fence.position.set(-xPositionsColumnsFrontFence[i], yPosFence, 10);
        addMesh(fence);
    }

    var xPositionsColumnsSideFence = [480, 170, 370];
    var zPositionsColumnsSideFence = [100, 300, 500];

    // The fences on the site
    for (i = 0; i < zPositionsColumnsSideFence.length; i++) {
        fence = new THREE.Mesh(new THREE.BoxGeometry(fenceLength, 10, 2, 1, 1, 1), materials);
        fence.position.set(-xPositionsColumnsSideFence[0], yPosFence, zPositionsColumnsSideFence[i]);
        fence.rotation.set(0, pi / 2, pi);
        addMesh(fence);
        //17:27 preischild e-paper einzelausgaben btutton fehlt sascha kühn

        fence = new THREE.Mesh(new THREE.BoxGeometry(fenceLength, 10, 2, 1, 1, 1), materials);
        fence.position.set(xPositionsColumnsSideFence[0], yPosFence, zPositionsColumnsSideFence[i]);
        fence.rotation.set(0, pi / 2, pi);
        addMesh(fence);
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
    var shape, column;
    var pillarBottomMaterial = getMaterialForCube(PILLAR_BOTTOM, 1, 1);
    var columnMaterial = getMaterialForCube(COLUMN, 1, 1);
    var frustumCubeMaterial = getMaterialForCube(FRUSTUM_CUBE, 1, 1);
    var cubeLevel1CubeMaterial = getMaterialForCube(COLUMN_TOP_LEVEL_1, 1, 1);
    var cubeLevel2CubeMaterial = getMaterialForCube(COLUM_TOP_LEVEL_2, 1, 1);
    var cubeLevel3CubeMaterial = getMaterialForCube(COLUMN_TOP_LEVEL_3, 1, 1);
    var cubeLevel4CubeMaterial = getMaterialForCube(COLUMN_TOP_LEVEL_4, 1, 1);

    // the column on the ground
    shape = new THREE.Mesh(new THREE.CylinderGeometry(10, 8, 10, 4, 4), pillarBottomMaterial);
    shape.position.set(columnSettings.xPosition, 10, columnSettings.zPosition);
    shape.rotation.set(pi, pi / 4, 0);
    addMesh(shape, pillarBottomMaterial);

    // the column on the frustum
    shape = new THREE.Mesh(new THREE.BoxGeometry(columnSettings.columnWidth, columnSettings.columnHeight, 10, 1, 1, 1), columnMaterial);
    shape.position.set(columnSettings.xPosition, columnSettings.columnHeight / 2 + 5, columnSettings.zPosition);
    addMesh(shape, columnMaterial);

    // the frustum on the column
    shape = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10, 1, 1, 1), cubeLevel1CubeMaterial);
    shape.position.set(columnSettings.xPosition, columnSettings.columnHeight + 10, columnSettings.zPosition);
    addMesh(shape, cubeLevel1CubeMaterial);

    shape = new THREE.Mesh(new THREE.BoxGeometry(12, 12, 12, 1, 1, 1), cubeLevel2CubeMaterial);
    shape.position.set(columnSettings.xPosition, columnSettings.columnHeight + 21, columnSettings.zPosition);
    addMesh(shape, cubeLevel2CubeMaterial);

    shape = new THREE.Mesh(new THREE.BoxGeometry(14, 14, 14, 1, 1, 1), cubeLevel3CubeMaterial);
    shape.position.set(columnSettings.xPosition, columnSettings.columnHeight + 31, columnSettings.zPosition);
    addMesh(shape, cubeLevel3CubeMaterial);

    shape = new THREE.Mesh(new THREE.BoxGeometry(16, 16, 16, 1, 1, 1), cubeLevel4CubeMaterial);
    shape.position.set(columnSettings.xPosition, columnSettings.columnHeight + 41, columnSettings.zPosition);
    addMesh(shape, cubeLevel4CubeMaterial);

    // the top frustum
    shape = new THREE.Mesh(new THREE.BoxGeometry(18, 18, 18, 1, 1, 1), frustumCubeMaterial);
    shape.position.set(columnSettings.xPosition, columnSettings.columnHeight + 41, columnSettings.zPosition);
    addMesh(shape, frustumCubeMaterial);
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
        var cubeGeometry = new THREE.BoxGeometry(cubeWidth, cubeHeight, cubeDepth, widthSegments, heightSegments, depthSegments);
        cube = new THREE.Mesh(cubeGeometry, darkMaterial);
        positionY = -1.5 + (i * -1.5);
        positionZ = -5 - (i * 10);
        cube.position.set(0, positionY, positionZ);
        addMesh(mesh);
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
