function addPond() {
    var dim = [800, 1000, 10];
    var pondDimensions = [800, 2000];
    addPondStructure(pondDimensions);
}

function addPondStructure(pondDimensions) {
    var pos, rot, dim = [810, 10, 10];
    var sideLength = -850;
    var pondYPosition = 1;

    var meshes = [];

    // pond wall front
    pos = [10, pondYPosition, -350];
    meshes.push(getCubeMeshDefSclDefRot(pos, dim));

    // pond wall back
    pos = [10, pondYPosition, -dim[0] - 540];
    meshes.push(getCubeMeshDefSclDefRot(pos, dim));

    // left pond wall
    dim = [1000, 10, 10];
    rot = [0, pi / 2, pi];
    pos = [410, pondYPosition, sideLength];
    meshes.push(getCubeMeshDefScl(pos, dim, rot));

    // right pond wall
    pos = [-390, pondYPosition, sideLength];
    meshes.push(getCubeMeshDefScl(pos, dim, rot));

    addMeshesToSceneWithCustomTextureRepeating(meshes, POND_TEXTURE_SIDE, 12, 1);

    // the pond ground
    var planeGeometry = new THREE.BoxGeometry(800, 1, 1000, 1);
    var planeMaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(POND_TEXTURE), color: 0xffffff, opacity: 1.0 });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(10, pondYPosition - 2, pos[2]);
    scene.add(plane);
}