function addGround() {
    var meshes = [];
    var pos = [0, -6, 0];
    var dim = [10000, 10000];
    var rot = [pi / 2, 0, 0];

    meshes.push(getCubeMeshDefScl(pos, dim, rot));
    addMeshesToSceneWithCustomTextureRepeating(meshes, GROUND_TEXTURE, 8, 8);
}
