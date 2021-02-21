function addPavement() {
    /* var meshes = [];
    var dim = [2550, 1200];
    var pos = [10, -3, -200];
    var rot = [-pi / 2, 0, -pi / 2];
    meshes.push(getPlaneMeshWithDefaultScaling(pos, dim, rot));
    addMeshesToSceneWithCustomTextureRepeating(meshes, PAVEMENT, 8, 8); */
    addBoxGeometryToScene({
        id: "pavement",
        dimension: { 'width': 2550, 'height': 1, 'depth': 1200 },
        position: { 'x': 10, 'y': -4, 'z': -850 },
        texture: {name: PAVEMENT, rpx: 1, rpy: 1}
    });
}