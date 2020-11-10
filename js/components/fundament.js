function addFundamentPalace() {
    var meshes = [], pos, dim;
    pos = [0, 1, 500];
    dim = [1000, 10, 1000];
    meshes.push(getCubeMeshDefSclDefRot(pos, dim));
    addMeshesToSceneWithCustomTextureRepeating(meshes, FLOOR_TEXTURE, 8, 8);
}