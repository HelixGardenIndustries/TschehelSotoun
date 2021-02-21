/**
 * Created by adolph on 01.09.2014.
 */

var initArray = {};
const pi = Math.PI;

function getDefaultRotating() {
    return [0, 0, 0];
}

function getDefaultScaling() {
    return [1, 1, 1];
}

function addMeshToMergeParent(mergeParent, mesh) {
    mesh.matrixAutoUpdate && mesh.updateMatrix();
    mergeParent.merge(mesh.geometry, mesh.matrix);
    return mergeParent;
}


function getMaterialForCubeWithCustomRepeating(textureName, repeatX, repeatY) {

    var textureNames = [];
    var repeatXs = [];
    var repeatYs = [];
    var materials = [];

    if (isArray(textureName)) {
        if (textureName.length != 6) {
            alert("Array must have length of 6!");
            return;
        }
        textureNames = textureName;
        repeatXs = repeatX;
        repeatYs = repeatY;
    } else {
        for (var i = 0; i < 6; i++) {
            textureNames[i] = textureName;
            repeatXs[i] = repeatX;
            repeatYs[i] = repeatY;
        }
    }

    for (var i = 0; i < textureNames.length; i++) {
        materials[i] = getMeshPhongMaterialWithDefaultColor(textureNames[i], repeatXs[i], repeatYs[i]);
    }

    if (materials.length > 0) {
        return new THREE.MeshFaceMaterial(materials);
    } else {
        alert("Materials has size 0!");
    }
}

function getMeshPhongMaterialWithDefaultColor(textureName, repeatX, repeatY) {
    return getMeshPhongMaterialWithColor(textureName, repeatX, repeatY, "white");
}

function getMeshPhongMaterialWithColor(textureName, repeatX, repeatY, color) {
    var texture = new THREE.TextureLoader().load(textureName);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    return getMeshPhongMaterial(texture, color);
}

function getMeshMaterial() {
    return getMeshPhongMaterial("", "white");
}

function getMeshPhongMaterial(texture, color) {
    return new THREE.MeshPhongMaterial({ map: texture, color: color });
}

function isArray(x) {
    return Object.prototype.toString.call(x) === '[object Array]';
}

function getMergeParent() {
    return new THREE.BoxGeometry();
}

function getCubeMesh(p) {
    const texture = getTexture(p.texture);
    const boxGeometry = new THREE.BoxGeometry(p.dimension.width, p.dimension.height, p.dimension.depth, 1, 1);
    var boxMesh = new THREE.Mesh(boxGeometry, texture);
    boxMesh.position.set(p.position.x, p.position.y, p.position.z);

    if ("rotation" in p) {
        boxMesh.rotation.set(p.rotation.rx, p.rotation.ry, p.rotation.rz);
    }

    return boxMesh;


}

function getSphereMesh(radius, position, rotation, scaling, color) {
    // the column on the frustum
    var sphereGeometry = new THREE.SphereGeometry(radius, 10, 10, 10, 10, 10);
    var sphereMesh = new THREE.Mesh(sphereGeometry, getMeshPhongMaterialWithColor(GROUND_TEXTURE, 1, 1, color));
    sphereMesh.position.set(position[0], position[1], position[2]);
    sphereMesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    sphereMesh.scale.set(scaling[0], scaling[1], scaling[2]);
    return sphereMesh;
}


function addPyramideShape(p) {
    var cylinderGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 4, 4);
    var mesh = new THREE.Mesh(cylinderGeometry, getMeshMaterial());
    mesh.position.set(position[0], position[1], position[2]);
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    mesh.scale.set(scaling[0], scaling[1], scaling[2]);
    return mesh;
}



function getPyramideMeshDefSclDefRep(pos, rot, radiusTop, radiusBottom, height) {
    return getPyramideMeshDefScl(pos, rot, radiusTop, radiusBottom, height);
}

function getPyramideMeshDefScl(pos, rot, radiusTop, radiusBottom, height) {
    return addPyramideShape(pos, rot, getDefaultScaling(), radiusTop, radiusBottom, height)
}

function getCubeMeshDefSclDefRotDefRep(pos, dim) {
    return getCubeMeshDefScl(pos, dim, getDefaultRotating());
}

function getCubeMeshDefSclDefRot(pos, dim) {
    return getCubeMeshDefScl(pos, dim, getDefaultRotating());
}

function getSphereMeshDefSclDefRot(radius, pos, dim, color) {
    return getSphereMeshDefScl(radius, pos, dim, getDefaultRotating());
}

function getCubeMeshDefScl(pos, dim, rot) {
    return getCubeMesh(pos, dim, rot, getDefaultScaling());
}

function getSphereMeshDefScl(radius, pos, rot, color) {
    return getSphereMesh(pos, radius, rot, getDefaultScaling(), color);
}

function getCubeMeshDefSclDefRep(pos, dim, rot) {
    return getCubeMesh(pos, dim, rot, getDefaultScaling());
}

function addMeshesToSceneWithDefaultTextureRepeating(meshes, textureName) {
    addMeshesToSceneWithCustomTextureRepeating(meshes, textureName, 1, 1);
}

function getCylinderMesh(p) {
    const texture = getTexture(p.texture);
    var mesh = new THREE.Mesh(new THREE.CylinderGeometry(p.dimension.width, p.dimension.height, p.dimension.height, 4, 4), texture);
    mesh.position.set(p.position.x, p.position.y, p.position.z);
    mesh.rotation.set(p.rotation.rx, p.rotation.ry, p.rotation.rz);
    return mesh;
}

//////////////////////////// NEU ////////////////////////////

function addPlaneGeometryToScene(p) {
    var planeGeometry = new THREE.PlaneGeometry(p.dimension.width, p.dimension.height);
    var planeMaterials = getTexture(p.texture);

    for (const planeMaterial of planeMaterials) {
        addMeshToScene(p, planeGeometry, planeMaterial);
    }
}

function addBoxGeometryToScene(p) {
    var boxGeometry = new THREE.BoxGeometry(p.dimension.width, p.dimension.height, p.dimension.depth, 1);
    var boxMaterial = getTexture(p.texture);
    addMeshToScene(p, boxGeometry, boxMaterial);
}

function addCylinderGeometryToScene(p) {
    var cylinderGeometry = new THREE.CylinderGeometry(p.dimension.radiusTop, p.dimension.radiusBottom, p.dimension.height, p.dimension.radialSegments, p.dimension.heightSegments);
    var cylinderMaterial = getTexture(p.texture);
    addMeshToScene(p, cylinderGeometry, cylinderMaterial);
}

function addBoxGeometryToScene(p) {
    var boxGeometry = new THREE.BoxGeometry(p.dimension.width, p.dimension.height, p.dimension.depth, 1);
    var boxMaterial = getTexture(p.texture);
    addMeshToScene(p, boxGeometry, boxMaterial);
}

function addSphereMesh(p) {
    var sphereGeometry = new THREE.SphereGeometry(p.radius, p.widthSegments, p.heightSegments, p.phiStart, p.phiLength, p.thetaStart, p.thetaLength);
    var sphereMaterial = getTexture(p.texture);
    addMeshToScene(p, sphereGeometry, sphereMaterial);
}

function addMeshToScene(p, geometry, material) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(p.position.x, p.position.y, p.position.z);

    if ("rotation" in p) {
        mesh.rotation.set(p.rotation.rx, p.rotation.ry, p.rotation.rz);
    }

    scene.add(mesh);
}

function getTexture(p) {

    color = typeof p.color === 'undefined' ? 0xffffff : p.color;
    repeatX = "repeatX" in p ? p.repeatX : 1;
    repeatY = "repeatY" in p ? p.repeatY : 1;
    isTransparent = "isTransparent" in p ? p.isTransparent : false;

    if (typeof p.name === 'string') {

        const texture = new THREE.TextureLoader().load(p.name);
        texture.repeat.set(repeatX, repeatY);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        return new THREE.MeshBasicMaterial({
            map: texture,
            color: color,
            opacity: 1.0,
            transparent: false
        });
    } else {
        var result = p.name.map(function (textureName, index) {
            const texture = new THREE.TextureLoader().load(textureName);

            rx = typeof repeatX[index] !== 'undefined' ? repeatX[index] : 1; 
            ry = typeof repeatY[index] !== 'undefined' ? repeatY[index] : 1; 
            texture.repeat.set(rx, ry);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;

            return new THREE.MeshBasicMaterial({
                map: texture,
                color: color,
                side: THREE.DoubleSide,
                opacity: 1.0
            });
        });

        return result;
    }
}