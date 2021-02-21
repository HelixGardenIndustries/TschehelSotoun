var pillarTopTextures = [COLUMN_TOP_LEVEL_1, COLUMN_TOP_LEVEL_2, COLUMN_TOP_LEVEL_3, COLUMN_TOP_LEVEL_4];

function addRoofPillars() {

    // the frustum on the ground
    var i;
    var meshContainer = [];
    var xPositionsColumns = [480, 300, 140, -480, -300, -140];
    var zPositionsColumn = [10, 160, 360];


    // Initialize the arrays with defaultValues
    for (i = 0; i < 7; i++) {
        meshContainer.push([]);
    }

    for (i = 0; i < xPositionsColumns.length; i++) {
        for (var j = 0; j < zPositionsColumn.length; j++) {
            meshContainer = addColumn(zPositionsColumn[j], xPositionsColumns[i], meshContainer);
        }
    }

    for (i = 0; i < meshContainer.length; i++) {
        for (var j = 0; j < meshContainer[i].length; j++) {
            scene.add(meshContainer[i][j]);
        }
    }
}

function addColumn(zPosition, xPosition, meshContainer) {
    let columnHeight = 200;
    let columnWidth = 10;

    addFrustumOnGround(xPosition, zPosition, meshContainer);
    addColumnOnFrustum(xPosition, columnHeight, zPosition, columnWidth, meshContainer);
    addCubesOnColumn(xPosition, columnHeight, zPosition, meshContainer);
    addFrustumOnTop(xPosition, columnHeight, zPosition, meshContainer);

    return meshContainer;
}

function addFrustumOnTop(xPosition, columnHeight, zPosition, meshContainer) {
    pos = [xPosition, columnHeight + 41, zPosition];
    dim = [18, 18, 18];
    const cubeMesh = getCubeMesh({
            id: "cubesOnColumn",
            dimension: { 'width': 18, 'height': 18, 'depth': 18 },
            position: { 'x': xPosition, 'y': columnHeight + 41, 'z': zPosition },
            texture: { name: FRUSTUM_CUBE }
        });
    meshContainer[6].push(cubeMesh);
    return { pos, dim };
}

function addCubesOnColumn(xPosition, columnHeight, zPosition, meshContainer) {
    for (var i = 0; i <= 3; i++) {
        var cubeDimension = 10 + i * 2;
        const cubeMesh = getCubeMesh({
            id: "cubesOnColumn",
            dimension: { 'width': cubeDimension, 'height': cubeDimension, 'depth': cubeDimension },
            position: { 'x': xPosition, 'y': columnHeight + (10 + i * 11), 'z': zPosition },
            texture: { name: pillarTopTextures[i] }
        });
        meshContainer[i + 2].push(cubeMesh);
    }
    return { dim, pos };
}

function addColumnOnFrustum(xPosition, columnHeight, zPosition, columnWidth, meshContainer) {
    pos = [xPosition, columnHeight / 2 + 5, zPosition];
    dim = [columnWidth, columnHeight, 10];

    meshContainer[1].push(getCubeMesh(
        {
            id: "columnOnFrustum",
            dimension: { 'width': columnWidth, 'height': columnHeight, 'depth': 10 },
            position: { 'x': xPosition, 'y': columnHeight / 2 + 5, 'z': zPosition },
            texture: { name: PILLAR_BOTTOM }
        }
    ));
    return { pos, dim };
}

function addFrustumOnGround(xPosition, zPosition, meshContainer) {
    meshContainer[0].push(getCylinderMesh({
        id: "frustumOnGround",
        dimension: { 'width': 10, 'height': 8, 'depth': 10 },
        position: { 'x': xPosition, 'y': 10, 'z': zPosition },
        rotation: { 'rx': pi, 'ry': pi / 4, 'rz': 0 },
        texture: { name: PILLAR_BOTTOM }
    }));
}
