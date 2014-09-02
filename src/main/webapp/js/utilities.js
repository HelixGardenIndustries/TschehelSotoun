/**
 * Created by adolph on 01.09.2014.
 */

var initArray = {};
const pi = Math.PI;
var group = new THREE.Object3D;

function getDefaultRotating() {
    return [0, 0, 0];
}

function getDefaultScaling() {
    return [1, 1, 1];
}

function addMergedGeoToScene(meshContainer, material) {

    meshContainer.computeFaceNormals();
    group = new THREE.Mesh(meshContainer, material);
    group.matrixAutoUpdate = false;
    group.updateMatrix();
    scene.add(group);
}

function addMeshToMergeParent(mergeParent, mesh) {
    mesh.matrixAutoUpdate && mesh.updateMatrix();
    mergeParent.merge(mesh.geometry, mesh.matrix);
    return mergeParent;
}

function getMaterialForCubeWithDefaultRepeating(textureName) {
    return getMaterialForCubeWithCustomRepeating(textureName, 1, 1);
}

function getMaterialForCubeWithCustomRepeating(textureName, repeatX, repeatY) {

    var textureNames = [];
    var repeatXs = [];
    var repeatYs = [];
    var materials = [];

    if(isVariableOfTypeArray(textureName)){
        console.log("A");
        if(textureName.length != 6){
            alert("Array must have length of 6!");
            return;
        }
        textureNames = textureName;
        repeatXs = repeatX;
        repeatYs = repeatY;
    }else{
        for(var i = 0; i < 6; i++){
            textureNames[i] = textureName;
            repeatXs[i] = repeatX;
            repeatYs[i] = repeatY;
        }
    }

    for(var i = 0; i < textureNames.length; i++){
        materials[i] = getMeshLambertMaterial(textureNames[i], repeatXs[i], repeatYs[i]);
    }

    if(materials.length > 0){
        return new THREE.MeshFaceMaterial(materials);
    }else{
        alert("Materials has size 0");
    }
}

function getMeshLambertMaterial(textureName, repeatX, repeatY){
    var floorTexture = THREE.ImageUtils.loadTexture(textureName);
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(repeatX, repeatY);
    return new THREE.MeshLambertMaterial({map: floorTexture, transparent: true, opacity: 1.0, color: 0xFFFFFF});
}

function getPlaneMesh(pos, dim, rot){
    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(dim[0], dim[1]));
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.rotation.set(rot[0], rot[1], rot[2]);
    return mesh;
}

function isVariableOfTypeArray(x){
    return Object.prototype.toString.call( x ) === '[object Array]';
}

function getMergeParent() {
    return new THREE.Geometry();
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

function getPyramideMeshDefSclDefRep(pos, rot, radiusTop, radiusBottom, height) {
    return getPyramideMeshDefScl(pos, rot, radiusTop, radiusBottom, height);
}

function getPyramideMeshDefScl(pos, rot, radiusTop, radiusBottom, height) {
    return addPyramideShapeWithTexture(pos, rot, getDefaultScaling(), radiusTop, radiusBottom, height)
}

function getCubeMeshDefSclDefRotDefRep(pos, dim) {
    return getCubeMeshDefScl(pos, dim, getDefaultRotating());
}

function getCubeMeshDefSclDefRot(pos, dim) {
    return getCubeMeshDefScl(pos, dim, getDefaultRotating());
}

function getCubeMeshDefScl(pos, dim, rot) {
    return getCubeMeshWithTexture(pos, dim, rot, getDefaultScaling());
}

function getCubeMeshDefSclDefRep(pos, dim, rot) {
    return getCubeMeshWithTexture(pos, dim, rot, getDefaultScaling());
}

function addMeshesToSceneWithDefaultTextureRepeating(meshes, textureName) {
    addMeshesToSceneWithCustomTextureRepeating(meshes, textureName, 1, 1);
}

function addMeshesToSceneWithCustomTextureRepeating(meshes, textureName, repeatX, repeatY) {

    var mergedGeo = getMergeParent();
    var material = getMaterialForCubeWithCustomRepeating(textureName, repeatX, repeatY);
    for (var i = 0; i < meshes.length; i++) {
        mergedGeo = addMeshToMergeParent(mergedGeo, meshes[i]);
    }
    addMergedGeoToScene(mergedGeo, material);
}

function getCylinderMeshDefSclDefRepDefRot(pos, dim, rot) {
    return getCylinderMeshDefScl(pos, dim, rot, getDefaultScaling());
}

function getCylinderMeshDefScl(pos, dim, rot, scl) {
    var mesh = new THREE.Mesh(new THREE.CylinderGeometry(dim[0], dim[1], dim[2], 4, 4));
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.rotation.set(rot[0], rot[1], rot[2]);
    mesh.scale.set(scl[0], scl[1], scl[2]);
    return mesh;
}


