var initArray = {};
const pi = Math.PI;
var baseMesh;
var group = new THREE.Object3D;
var mergedGeo = new THREE.Geometry();
var material = [getMaterialForCube(UMRANDUNG_DACH_UNTEN_LAYER_1, 1, 1)];
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
    drawMeshes();
    animate();

}

function addMesh(mesh) {
    material.push(mesh.material);
    mesh.matrixAutoUpdate && mesh.updateMatrix();
    mergedGeo.merge( mesh.geometry, mesh.matrix);
}

function drawMeshes(){
    mergedGeo.computeFaceNormals();
    group = new THREE.Mesh(mergedGeo, new THREE.MeshNormalMaterial());
    group.matrixAutoUpdate = false;
    group.updateMatrix();
    scene.add( group );
}

function addFundamentPalace() {
    var pos, dim;
    pos = [0, 1, initArray.planeHeight / 4];
    dim = [initArray.planeWidth / 2, initArray.fundamentHeight, initArray.planeHeight / 2];
    getCubeMeshWithTexture(pos, dim, getDefaultRotating(), getDefaultScaling(), getMaterialForCube('img/groundTexture.png', 8, 8));
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
    getCubeMeshDefSclDefRot(pos, dim, UMRADNUNG_DACH_LAYER_1, 16, 1);
}

function addRoofLayerOne() {
    var mergedGeo = getMergeParent();
    var pos, dim, rot, mesh, material = getMaterialForCube(UMRANDUNG_DACH_UNTEN_LAYER_1, 64, 1);
    // Layer 1
    pos = [0, 282, -8];
    dim = [1000, 40, 1];
    rot = [pi / -8, 0, 0];

    mesh = getCubeMeshDefScl(pos, dim, rot);
    mergedGeo = addMeshToMergeParent(mergedGeo, mesh);

    pos = [0, 282, 1008];
    dim = [1000, 40, 1];
    rot = [pi / 8, 0, 0];
    mesh = getCubeMeshDefScl(pos, dim, rot);
    mergedGeo = addMeshToMergeParent(mergedGeo, mesh);


    pos = [508, 282, 500];
    dim = [1, 40, 1000];
    rot = [0, 0, pi / -8];
    mesh = getCubeMeshDefScl(pos, dim, rot);
    mergedGeo = addMeshToMergeParent(mergedGeo, mesh);

    pos = [-508, 282, 500];
    dim = [1, 40, 1000];
    rot = [0, 0, pi / 8];
    mesh = getCubeMeshDefScl(pos, dim, rot);
    mergedGeo = addMeshToMergeParent(mergedGeo, mesh);

    pos = [1, 300, 500];
    dim = [1030, 1, 1030];
    mesh = getCubeMeshDefSclDefRot(pos, dim, UMRADNUNG_DACH_LAYER_1, 16, 1);
    mergedGeo = addMeshToMergeParent(mergedGeo, mesh);

    material = getMaterialForCube(UMRANDUNG_DACH_UNTEN_LAYER_1, 2, 1);


    addMergedGeoToScene(mergedGeo, material);

    var mergedGeo = getMergeParent();

    pos = [-500, 280, 0];
    rot = [0, pi / 4, 0];
    mesh = getPyramideMeshDefScl(pos, rot, 20, 0, 40);
    mergedGeo = addMeshToMergeParent(mergedGeo, mesh);

    pos = [-500, 280, 1000];
    rot = [0, pi / 4, 0];
    mesh = getPyramideMeshDefScl(pos, rot, 20, 0, 40);
    mergedGeo = addMeshToMergeParent(mergedGeo, mesh);

    pos = [500, 280, 1000];
    rot = [0, pi / 4, 0];
    mesh = getPyramideMeshDefSclDefRep(pos, rot, 20, 0, 40);
    mergedGeo = addMeshToMergeParent(mergedGeo, mesh);

    //addMergedGeoToScene(mergedGeo, material);
}

function addMergedGeoToScene(mergedGeo, material) {
    mergedGeo.computeFaceNormals();
    group = new THREE.Mesh(mergedGeo, material);
    group.matrixAutoUpdate = false;
    group.updateMatrix();
    scene.add(group);
}

function addMeshToMergeParent(mergeParent, mesh){
    mesh.matrixAutoUpdate && mesh.updateMatrix();
    mergeParent.merge( mesh.geometry, mesh.matrix);
    return mergeParent;
}


function getMergeParent(){
    return new THREE.Geometry();
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
    getCubeMeshDefScl(pos, dim, rot, DACH_SCHRAEG_OBEN, repeat, 1);

    pos = [0, 315, 1008];
    dim = [width, 40, 1];
    rot = [-rotx, 0, 0];
    getCubeMeshDefScl(pos, dim, rot, DACH_SCHRAEG_OBEN, repeat, 1);

    pos = [500, 315, 500];
    dim = [1, 40, width];
    rot = [0, 0, rotx];
    getCubeMeshDefScl(pos, dim, rot, DACH_SCHRAEG_OBEN, repeat, 1);

    pos = [-500, 315, 508];
    dim = [1, 40, width];
    rot = [0, 0, -rotx];
    getCubeMeshDefScl(pos, dim, rot, DACH_SCHRAEG_OBEN, repeat, 1);


    pos = [490, 316, 13];
    rot = [0, pi / 4, 0];
    getPyramideMeshDefScl(pos, rot, 0, 40, 30, DACH_SCHRAEG_OBEN, repeatPyramideX, repeatPyramideY);

    pos = [-485, 316, 13];
    rot = [0, pi / 4, 0];
    getPyramideMeshDefScl(pos, rot, 0, 40, 30, DACH_SCHRAEG_OBEN, repeatPyramideX, repeatPyramideY);

    pos = [-485, 316, 993];
    rot = [0, pi / 4, 0];
    getPyramideMeshDefScl(pos, rot, 0, 40, 30, DACH_SCHRAEG_OBEN, repeatPyramideX, repeatPyramideY);

    pos = [487, 316, 990];
    rot = [0, pi / 4, 0];
    getPyramideMeshDefScl(pos, rot, 0, 40, 30, DACH_SCHRAEG_OBEN, repeatPyramideX, repeatPyramideY);
}

function addRoofLayerThree() {
    var pos, dim, rot;
    pos = [1, 335, 500];
    dim = [980, 10, 980];
    getCubeMeshDefSclDefRot(pos, dim, DACH_BASIS_PYRAMIDE, 16, 1);

    pos = [0, 393, 500];
    rot = [0, pi / 4, 0];
    getPyramideMeshDefScl(pos, rot, 0, 600, 100, PYRAMIDE_TOP, 64, 64);
}

function getCubeMeshWithTexture(position, dimension, rotation, scaling) {
    // the column on the frustum
    var mesh = new THREE.Mesh(new THREE.BoxGeometry(dimension[0], dimension[1], dimension[2], 1, 1, 1), new THREE.MeshNormalMaterial());
    mesh.position.set(position[0], position[1], position[2]);
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    mesh.scale.set(scaling[0], scaling[1], scaling[2]);
    return mesh;
}

function addPyramideShapeWithTexture(position, rotation, scaling, radiusTop, radiusBottom, height) {
    // the column on the frustum
    var mesh = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 4, 4), new THREE.MeshNormalMaterial());
    mesh.position.set(position[0], position[1], position[2]);
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    mesh.scale.set(scaling[0], scaling[1], scaling[2]);
    return mesh;
}

function addPyramideShapeWithColor(position, rotation, scaling, radiusTop, radiusBottom, height) {
    // the column on the frustum
    var mesh = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 4, 4), new THREE.MeshNormalMaterial());
    mesh.position.set(position[0], position[1], position[2]);
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    mesh.scale.set(scaling[0], scaling[1], scaling[2]);
    return mesh;
}

function addTriangle(geometry, pos, rot, scl, materialColor) {
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geometry, new THREE.MeshNormalMaterial());
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.rotation.set(rot[0], rot[1], rot[2]);
    mesh.scale.set(scl[0], scl[1], scl[2]);
    return mesh;
}

function addSphereShape(x, y, z, radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength) {
    var mesh = THREE.SceneUtils.createMultiMaterialObject(new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength), new THREE.MeshNormalMaterial());
    mesh.position.set(x, y, z);
    mesh.scale.set(1, 1.5, 1);
    return mesh;
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
    getCubeMeshDefSclDefRotDefRep(pos, dim, FRONT_LINKS_EINGANG_HINTEN);

    pos = [-px, py, pz];
    getCubeMeshDefSclDefRotDefRep(pos, dim, FRONT_RECHTS_EINGANG_HINTEN);

    pos = [0, py, pz];
    getCubeMeshDefSclDefRotDefRep(pos, dim, FRONT_HINTEN);
    px = 142;
    pz = 665;
    dx = 150;
    ry = pi / 2;
    pos = [-px, py, pz];
    dim = [dx, dy, dz];
    rot = [0, ry, 0];
    getCubeMeshDefSclDefRep(pos, dim, rot, FRONT_RECHTS_EINGANG);

    pos = [px, py, pz];
    dim = [dx, dy, dz];
    rot = [0, ry, 0];
    getCubeMeshDefSclDefRep(pos, dim, rot, FRONT_LINKS_EINGANG);
}

function addOuterWall() {

    var pos, dim, rot;
    pos = [315, 120, 595];
    dim = [350, 235, 15];
    getCubeMeshDefSclDefRotDefRep(pos, dim, FRONT_LINKS);
    pos = [-315, 120, 595];

    dim = [350, 235, 15];
    getCubeMeshDefSclDefRotDefRep(pos, dim, FRONT_RECHTS);
    pos = [0, 120, 990];

    dim = [980, 235, 15];
    getCubeMeshDefSclDefRotDefRep(pos, dim, HINTEN);

    pos = [-480, 120, 795];
    dim = [385, 235, 15];
    rot = [0, pi / 2, 0];
    getCubeMeshDefSclDefRep(pos, dim, rot, HINTEN);

    pos = [480, 120, 795];
    dim = [385, 235, 15];
    rot = [0, pi / 2, 0];
    getCubeMeshDefSclDefRep(pos, dim, rot, HINTEN);
}

function addPyramideDefSclDefRot(pos, radiusTop, radiusBottom, height, textureName, textureRepeatX, textureRepeatY) {
    addPyramideShapeWithTexture(pos, getDefaultRotating(), getDefaultScaling(), radiusTop, radiusBottom, height, getMaterialForCube(textureName, textureRepeatX, textureRepeatY))
}
function getPyramideMeshDefSclDefRep(pos, rot, radiusTop, radiusBottom, height, textureName) {
    return getPyramideMeshDefScl(pos, rot, radiusTop, radiusBottom, height, textureName, 1, 1);
}

function getPyramideMeshDefScl(pos, rot, radiusTop, radiusBottom, height) {
    return addPyramideShapeWithTexture(pos, rot, getDefaultScaling(), radiusTop, radiusBottom, height)
}

function getCubeMeshDefSclDefRotDefRep(pos, dim, textureName) {
    return getCubeMeshDefScl(pos, dim, getDefaultRotating(), textureName, 1, 1);
}

function getCubeMeshDefSclDefRot(pos, dim, textureName, textureRepeatX, textureRepeatY) {
    return getCubeMeshDefScl(pos, dim, getDefaultRotating(), textureName, textureRepeatX, textureRepeatY);
}

function getCubeMeshDefScl(pos, dim, rot) {
    return getCubeMeshWithTexture(pos, dim, rot, getDefaultScaling());
}

function getCubeMeshDefSclDefRep(pos, dim, rot, textureName) {
    return getCubeMeshWithTexture(pos, dim, rot, getDefaultScaling(), getMaterialForCube(textureName, 1, 1));
}


function addFence() {
    var mesh;
    var xPositionsColumnsFrontFence = [170, 380];

    var fenceLength = 190;
    var materials = getMaterialForCube(FENCE_FRONT_AND_BACK_SIDE, 24, 1);
    var yPosFence = 11;
    var i;

    // The front fences
    for (i = 0; i < xPositionsColumnsFrontFence.length; i++) {
        mesh = new THREE.Mesh(new THREE.BoxGeometry(210, 10, 5, 2, 1, 1), materials);
        mesh.position.set(xPositionsColumnsFrontFence[i], yPosFence, 10);
        return mesh;

        mesh = new THREE.Mesh(new THREE.BoxGeometry(210, 10, 5, 1, 1, 1), materials);
        mesh.position.set(-xPositionsColumnsFrontFence[i], yPosFence, 10);
        return mesh;
    }

    var xPositionsColumnsSideFence = [480, 170, 370];
    var zPositionsColumnsSideFence = [100, 300, 500];

    // The fences on the site
    for (i = 0; i < zPositionsColumnsSideFence.length; i++) {
        mesh = new THREE.Mesh(new THREE.BoxGeometry(fenceLength, 10, 2, 1, 1, 1), materials);
        mesh.position.set(-xPositionsColumnsSideFence[0], yPosFence, zPositionsColumnsSideFence[i]);
        mesh.rotation.set(0, pi / 2, pi);
        return mesh;
        //17:27 preischild e-paper einzelausgaben btutton fehlt sascha kühn

        mesh = new THREE.Mesh(new THREE.BoxGeometry(fenceLength, 10, 2, 1, 1, 1), materials);
        mesh.position.set(xPositionsColumnsSideFence[0],   yPosFence, zPositionsColumnsSideFence[i]);
        mesh.rotation.set(0, pi / 2, pi);
        return mesh;
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
    var mesh;
    var pillarBottomMaterial = getMaterialForCube(PILLAR_BOTTOM, 1, 1);
    var columnMaterial = getMaterialForCube(COLUMN, 1, 1);
    var frustumCubeMaterial = getMaterialForCube(FRUSTUM_CUBE, 1, 1);
    var cubeLevel1CubeMaterial = getMaterialForCube(COLUMN_TOP_LEVEL_1, 1, 1);
    var cubeLevel2CubeMaterial = getMaterialForCube(COLUM_TOP_LEVEL_2, 1, 1);
    var cubeLevel3CubeMaterial = getMaterialForCube(COLUMN_TOP_LEVEL_3, 1, 1);
    var cubeLevel4CubeMaterial = getMaterialForCube(COLUMN_TOP_LEVEL_4, 1, 1);

    // the column on the ground
    mesh = new THREE.Mesh(new THREE.CylinderGeometry(10, 8, 10, 4, 4), pillarBottomMaterial);
    mesh.position.set(columnSettings.xPosition, 10, columnSettings.zPosition);
    mesh.rotation.set(pi, pi / 4, 0);
    return mesh;

    // the column on the frustum
    mesh = new THREE.Mesh(new THREE.BoxGeometry(columnSettings.columnWidth, columnSettings.columnHeight, 10, 1, 1, 1), columnMaterial);
    mesh.position.set(columnSettings.xPosition, columnSettings.columnHeight / 2 + 5, columnSettings.zPosition);
    return mesh;

    // the frustum on the column
    mesh = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10, 1, 1, 1), cubeLevel1CubeMaterial);
    mesh.position.set(columnSettings.xPosition, columnSettings.columnHeight + 10, columnSettings.zPosition);
    return mesh;

    mesh = new THREE.Mesh(new THREE.BoxGeometry(12, 12, 12, 1, 1, 1), cubeLevel2CubeMaterial);
    mesh.position.set(columnSettings.xPosition, columnSettings.columnHeight + 21, columnSettings.zPosition);
    return mesh;

    mesh = new THREE.Mesh(new THREE.BoxGeometry(14, 14, 14, 1, 1, 1), cubeLevel3CubeMaterial);
    mesh.position.set(columnSettings.xPosition, columnSettings.columnHeight + 31, columnSettings.zPosition);
    return mesh;

    mesh = new THREE.Mesh(new THREE.BoxGeometry(16, 16, 16, 1, 1, 1), cubeLevel4CubeMaterial);
    mesh.position.set(columnSettings.xPosition, columnSettings.columnHeight + 41, columnSettings.zPosition);
    return mesh;

    // the top frustum
    mesh = new THREE.Mesh(new THREE.BoxGeometry(18, 18, 18, 1, 1, 1), frustumCubeMaterial);
    mesh.position.set(columnSettings.xPosition, columnSettings.columnHeight + 41, columnSettings.zPosition);
    return mesh;
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
        return mesh;
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
            map: floorTexture, transparent: true, opacity: 1.0,color: 0xFFFFFF
        }),
        new THREE.MeshLambertMaterial({
            map: floorTexture, transparent: true, opacity: 1.0,color: 0xFFFFFF
        }),
        new THREE.MeshLambertMaterial({
            map: floorTexture, transparent: true, opacity: 1.0,color: 0xFFFFFF
        }),
        new THREE.MeshLambertMaterial({
            map: floorTexture, transparent: true, opacity: 1.0,color: 0xFFFFFF
        }),
        new THREE.MeshLambertMaterial({
            map: floorTexture, transparent: true, opacity: 1.0,color: 0xFFFFFF
        }),
        new THREE.MeshLambertMaterial({
            map: floorTexture, transparent: true, opacity: 1.0, color: 0xFFFFFF
        })
    ];

    return new THREE.MeshFaceMaterial(materials);
}
