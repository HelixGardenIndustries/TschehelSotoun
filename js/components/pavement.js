function addPavement() {
    var meshes = [];
    var dim = [2550, 1200];
    var pos = [10, -3, -200];
    var rot = [-pi / 2, 0, -pi / 2];
    meshes.push(getPlaneMeshWithDefaultScaling(pos, dim, rot));
    addMeshesToSceneWithCustomTextureRepeating(meshes, PAVEMENT, 8, 8);
}