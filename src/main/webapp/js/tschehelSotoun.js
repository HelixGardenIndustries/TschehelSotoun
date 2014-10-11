function addMeshes() {
    addFundamentPalace();
    addRoofColumns();
    addFence();
    addOuterWall();
    addInnerWall();
    addRoof();
    addStairsFundament();
    addPond();
    addPavement();
    addAmbientlight();
    addGround();
    addPointLights();
    animate();
}

function addPointLights(){
    var sphere = new THREE.SphereGeometry( 100, 256, 256);
    var light1 = new THREE.PointLight( 0xff0040, 2, 50 );
    light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
    scene.add( light1 );
}

function addGround(){

    // FLOOR
    var floorTexture = new THREE.ImageUtils.loadTexture(configurationArray.groundTexture);
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10, 10);
    var floorMaterial = new THREE.MeshLambertMaterial({ map: floorTexture, side: THREE.BackSide });
    var floorGeometry = new THREE.PlaneGeometry(configurationArray.planeWidth, configurationArray.planeHeight, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -6;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);
}

function addAmbientlight(){
    // LIGHT
    var light = new THREE.AmbientLight(0xffffff);
    //var light = new THREE.AmbientLight(0x000000);
    light.position.set(45, 500, -63);
    scene.add(light);
}

function addTree() {

    var pos, treeMeshes, treeArray, dim, leftSideTreeXPositioningLimits, rightSideTreeXPositioningLimits, zPositionLimits, yPosition, i;
    treeMeshes = [[],[],[],[],[],[],[],[]];
    treeArray = [TREE001, TREE002, TREE003, TREE004, TREE005, TREE006, TREE007, TREE008];
    dim = [250,250];
    leftSideTreeXPositioningLimits = [750, 2000-dim[0]/2];
    rightSideTreeXPositioningLimits = [-750, -1750-dim[0]/2];
    zPositionLimits = [2000-dim[0]/2, -1700-dim[0]/2];
    yPosition = dim[1]-109;


    for(i = 0; i < 250; i++){
        var randomSide = getRandomIntFromInterval(0,1);
        var randomIndex = getRandomIntFromInterval(0, treeArray.length-1);
        var randomXPosition = 0;
        var randomZPosition =  getRandomIntFromInterval(zPositionLimits[0], zPositionLimits[1]);

        if(randomSide == 0){
            randomXPosition =  getRandomIntFromInterval(leftSideTreeXPositioningLimits[0], leftSideTreeXPositioningLimits[1]);
        }else{
            randomXPosition =  getRandomIntFromInterval(rightSideTreeXPositioningLimits[0], rightSideTreeXPositioningLimits[1]);
        }

        pos = [randomXPosition, yPosition, randomZPosition];
        treeMeshes[randomIndex] = getTree(treeMeshes[randomIndex], dim, pos);
    }

    for(i = 0; i < treeMeshes.length; i++){
        addMeshesToSceneWithDefaultTextureRepeating(treeMeshes[i], treeArray[i], 1, 1);
    }
}

function getRandomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getTree(meshes, dim, pos){

    var rot = [0,0,0];
    meshes.push(getCubeMeshDefSclDefRep(pos, dim, rot));
    rot = [0,-pi/2,0];
    meshes.push(getCubeMeshDefSclDefRep(pos, dim, rot));
    return meshes;
}

function addFundamentPalace() {
    var meshes = [], pos, dim;

    pos = [0, 1, 500];
    dim = [1000, 10, 1000];
    meshes.push(getCubeMeshDefSclDefRot(pos, dim));
    addMeshesToSceneWithCustomTextureRepeating(meshes, FLOOR_TEXTURE, 8, 8);
}

function addRoof() {
    addRoofLayerThree();
    addRoofLayerTwo();
    addRoofCornersLevelTwo();
    addRoofLayerOne();
    addRoofCornersLevelOne();
    addRoofLayerZero();
}

function addRoofLayerZero() {
    var meshes = [], pos, dim;
    var a = UMRANDUNG_DACH_UNTEN_LAYER_1;
    var b = BOTTOM_TEXTURE_COLUMN_ROOF;

    pos = [1, 245, 500];
    dim = [1000, 40, 1000];
    meshes.push(getCubeMeshDefSclDefRot(pos, dim));

    var repeatX = [16, 16, 16, 5, 16, 16];
    var repeatY = [1, 1, 1, 6, 1, 1];
    var textures = [a, a, a, b, a, a];
    addMeshesToSceneWithCustomTextureRepeating(meshes, textures, repeatX, repeatY);
}

function addPond() {
    var dim = [800, 1000, 10];
    var pondDimensions = [800, 2000];
    addPondStructure(pondDimensions);
    addPondReflection(dim);
}

function addPavement(){
    var meshes = [];
    var dim = [2550, 1200];
    var pos = [10, -3, -200];
    var rot = [-pi/2, 0, -pi/2];
    meshes.push(getPlaneMeshWithDefaultScaling(pos, dim, rot));
    addMeshesToSceneWithCustomTextureRepeating(meshes, PAVEMENT, 8, 8);
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
    var planeMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture(POND_TEXTURE), color: 0xffffff, opacity: 1.0 });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(10, pondYPosition - 2, pos[2]);
    scene.add(plane);
}

function addMovingCube(reflectionCameraSize) {
    // create an array with six textures for a cool cubepng') }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('img/hinten.png') }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('img/hinten.png') }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('img/hinten.png') }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('img/hinten.png') }));
    var movingCubeMat = new THREE.MeshFaceMaterial(materialArray);
    var movingCubeGeom = new THREE.BoxGeometry(reflectionCameraSize, reflectionCameraSize, reflectionCameraSize, 1, 1, 1, materialArray);
    movingCube = new THREE.Mesh(movingCubeGeom, movingCubeMat);
    movingCube.position.set(0, 100, -300);
    movingCube.rotation.set(pi, 0, 0);
    scene.add(movingCube);
}
    var materialArray = [];
    materialArray.push(new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('img/hinten.png') }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('img/hinten.png') }));

    function addIntermediaScene() {
    // intermediate scene.
    // this solves the problem of the mirrored texture by mirroring it again.
    // consists of a camera looking at a plane with the mirrored texture on it.
    screenScene = new THREE.Scene();
    screenCamera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, -10000, 10000);
    screenCamera.position.z = 1;
    screenScene.add(screenCamera);

    var screenGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
    firstRenderTarget = new THREE.WebGLRenderTarget(512, 512, { format: THREE.RGBFormat });
    var screenMaterial = new THREE.MeshBasicMaterial({ map: firstRenderTarget, transparent: true,  opacity: 1.0});

    var quad = new THREE.Mesh(screenGeometry, screenMaterial);
    // quad.rotation.x = Math.PI / 2;
    screenScene.add(quad);
}

function addPondReflection(dim) {
    var pos, rot, reflectionCameraSize = 0;
    pos = [1, 20, -850];
    rot = [pi / 2, 0, pi];

    addMovingCube(reflectionCameraSize);
    addIntermediaScene();
    textureFromCamera = new THREE.WebGLRenderTarget(512, 512, { format: THREE.RGBFormat });

    var waterTexture = new THREE.ImageUtils.loadTexture( WATER_TEXTURE );
    waterTexture.wrapS = waterTexture.wrapT = THREE.RepeatWrapping;

    // use "this." to create global object
    this.waterUniforms = {
        baseTexture: 	{ type: "t", value: textureFromCamera },
        baseSpeed: 		{ type: "f", value: 0.1 },
        noiseTexture: 	{ type: "t", value: waterTexture },
        noiseScale:		{ type: "f", value: 0.2 },
        alpha: 			{ type: "f", value: 0.3 },
        time: 			{ type: "f", value: 1.0 }
    };

    // create custom material from the shader code above
    //   that is within specially labeled script tags
    var waterMaterial = new THREE.ShaderMaterial({uniforms: waterUniforms, vertexShader: document.getElementById('vertexShader').textContent, fragmentShader: document.getElementById('fragmentShader').textContent, side: THREE.BackSide, transparent: true});
    // apply the material to a surface
    var waterSurface = new THREE.Mesh( new THREE.PlaneGeometry( dim[0], dim[1] ), waterMaterial );
    waterSurface.position.set(pos[0], 1, pos[2]);
    waterSurface.rotation.set(rot[0], rot[1], rot[2]);
    scene.add( waterSurface );
}

function addRoofLayerOne() {
    var meshes = [], pos, dim, rot;

    // Layer 1
    pos = [0, 282, -8];
    dim = [1000, 40, 1];
    rot = [pi / -8, 0, 0];
    meshes.push(getCubeMeshDefScl(pos, dim, rot));

    pos = [0, 282, 1008];
    dim = [1000, 40, 1];
    rot = [pi / 8, 0, 0];
    meshes.push(getCubeMeshDefScl(pos, dim, rot));

    pos = [508, 282, 500];
    dim = [1, 40, 1000];
    rot = [0, 0, pi / -8];
    meshes.push(getCubeMeshDefScl(pos, dim, rot));

    pos = [-508, 282, 500];
    dim = [1, 40, 1000];
    rot = [0, 0, pi / 8];
    meshes.push(getCubeMeshDefScl(pos, dim, rot));

    pos = [1, 300, 500];
    dim = [1030, 1, 1030];
    meshes.push(getCubeMeshDefSclDefRot(pos, dim));

    addMeshesToSceneWithCustomTextureRepeating(meshes, UMRANDUNG_DACH_UNTEN_LAYER_1, 64, 1)
}

function addRoofCornersLevelOne() {
    var meshes = [], pos, rot;
    pos = [500, 280, 0];
    rot = [0, pi / 4, 0];
    meshes.push(getPyramideMeshDefScl(pos, rot, 20, 0, 40));

    pos = [-500, 280, 0];
    rot = [0, pi / 4, 0];
    meshes.push(getPyramideMeshDefScl(pos, rot, 20, 0, 40));

    pos = [-500, 280, 1000];
    rot = [0, pi / 4, 0];
    meshes.push(getPyramideMeshDefScl(pos, rot, 20, 0, 40));

    pos = [500, 280, 1000];
    rot = [0, pi / 4, 0];
    meshes.push(getPyramideMeshDefSclDefRep(pos, rot, 20, 0, 40));

    addMeshesToSceneWithCustomTextureRepeating(meshes, UMRANDUNG_DACH_UNTEN_LAYER_1, 2, 1)
}

function addRoofLayerTwo() {
    var meshes = [], pos, rot, dim, rotx = pi / 4, width = 979;
    pos = [0, 315, 0];
    dim = [width, 40, 1];
    rot = [rotx, 0, 0];
    meshes.push(getCubeMeshDefScl(pos, dim, rot));

    pos = [0, 315, 1008];
    dim = [width, 40, 1];
    rot = [-rotx, 0, 0];
    meshes.push(getCubeMeshDefScl(pos, dim, rot));

    pos = [500, 315, 500];
    dim = [1, 40, width];
    rot = [0, 0, rotx];
    meshes.push(getCubeMeshDefScl(pos, dim, rot));

    pos = [-500, 315, 508];
    dim = [1, 40, width];
    rot = [0, 0, -rotx];
    meshes.push(getCubeMeshDefScl(pos, dim, rot));

    addMeshesToSceneWithCustomTextureRepeating(meshes, DACH_SCHRAEG_OBEN, 64, 1)
}

function addRoofCornersLevelTwo() {
    var meshes = [], pos, rot;
    pos = [490, 316, 13];
    rot = [0, pi / 4, 0];
    meshes.push(getPyramideMeshDefScl(pos, rot, 0, 40, 30));

    pos = [-485, 316, 13];
    rot = [0, pi / 4, 0];
    meshes.push(getPyramideMeshDefScl(pos, rot, 0, 40, 30));

    pos = [-485, 316, 993];
    rot = [0, pi / 4, 0];
    meshes.push(getPyramideMeshDefScl(pos, rot, 0, 40, 30));

    pos = [487, 316, 990];
    rot = [0, pi / 4, 0];
    meshes.push(getPyramideMeshDefScl(pos, rot, 0, 40, 30));

    addMeshesToSceneWithCustomTextureRepeating(meshes, DACH_SCHRAEG_OBEN, 9, 16);
}

function addRoofLayerThree() {
    var meshes = [], pos, rot, dim;
    pos = [1, 335, 500];
    dim = [980, 10, 980];
    meshes.push(getCubeMeshDefSclDefRot(pos, dim));
    addMeshesToSceneWithCustomTextureRepeating(meshes, DACH_BASIS_PYRAMIDE, 16, 1);

    meshes = [];
    pos = [0, 393, 500];
    rot = [0, pi / 4, 0];
    meshes.push(getPyramideMeshDefScl(pos, rot, 0, 600, 100));
    addMeshesToSceneWithCustomTextureRepeating(meshes, PYRAMIDE_TOP, 64, 64);
}

function addInnerWall() {
    var meshes = [], pos, dim, rot, ry, px = 100, py = 120, pz = 732, dx = 100, dy = 235, dz = 15;
    dim = [dx, dy, dz];
    pos = [px, py, pz];
    meshes.push(getCubeMeshDefSclDefRotDefRep(pos, dim));
    addMeshesToSceneWithDefaultTextureRepeating(meshes, FRONT_LINKS_EINGANG_HINTEN);

    meshes = [];
    pos = [-px, py, pz];
    meshes.push(getCubeMeshDefSclDefRotDefRep(pos, dim));
    addMeshesToSceneWithDefaultTextureRepeating(meshes, FRONT_RECHTS_EINGANG_HINTEN, 1, 1);

    meshes = [];
    pos = [0, py, pz];
    meshes.push(getCubeMeshDefSclDefRotDefRep(pos, dim));
    addMeshesToSceneWithDefaultTextureRepeating(meshes, FRONT_HINTEN);

    meshes = [];
    px = 142;
    pz = 665;
    dx = 150;
    ry = pi / 2;
    pos = [-px, py, pz];
    dim = [dx, dy, dz];
    rot = [0, ry, 0];
    meshes.push(getCubeMeshDefSclDefRep(pos, dim, rot));
    addMeshesToSceneWithDefaultTextureRepeating(meshes, FRONT_RECHTS_EINGANG);

    meshes = [];
    pos = [px, py, pz];
    dim = [dx, dy, dz];
    rot = [0, ry, 0];
    meshes.push(getCubeMeshDefSclDefRep(pos, dim, rot));
    addMeshesToSceneWithDefaultTextureRepeating(meshes, FRONT_LINKS_EINGANG);
}

function addOuterWall() {

    var meshes = [], pos, dim, rot;

    pos = [315, 120, 595];
    dim = [350, 235, 15];
    meshes.push(getCubeMeshDefSclDefRotDefRep(pos, dim));
    addMeshesToSceneWithDefaultTextureRepeating(meshes, FRONT_LINKS);

    meshes = [];
    pos = [-315, 120, 595];
    dim = [350, 235, 15];
    meshes.push(getCubeMeshDefSclDefRotDefRep(pos, dim));
    addMeshesToSceneWithDefaultTextureRepeating(meshes, FRONT_RECHTS);

    pos = [0, 120, 990];
    dim = [980, 235, 15];
    meshes.push(getCubeMeshDefSclDefRotDefRep(pos, dim));

    pos = [-480, 120, 795];
    dim = [385, 235, 15];
    rot = [0, pi / 2, 0];
    meshes.push(getCubeMeshDefSclDefRep(pos, dim, rot));

    pos = [480, 120, 795];
    dim = [385, 235, 15];
    rot = [0, pi / 2, 0];
    meshes.push(getCubeMeshDefSclDefRep(pos, dim, rot));

    addMeshesToSceneWithDefaultTextureRepeating(meshes, HINTEN)
}

function addFence() {
    var meshes = [], xPositionsColumnsFrontFence = [170, 380], fenceLength = 190, yPosFence = 11, i, dim, pos, rot;

    // The front fences
    for (i = 0; i < xPositionsColumnsFrontFence.length; i++) {

        dim = [210, 10, 5];
        pos = [xPositionsColumnsFrontFence[i], yPosFence, 10];
        meshes.push(getCubeMeshDefSclDefRot(pos, dim));

        dim = [210, 10, 5];
        pos = [-xPositionsColumnsFrontFence[i], yPosFence, 10];
        meshes.push(getCubeMeshDefSclDefRot(pos, dim));
    }

    var xPositionsColumnsSideFence = [480, 170, 370];
    var zPositionsColumnsSideFence = [100, 300, 500];

    // The fences on the side
    for (i = 0; i < zPositionsColumnsSideFence.length; i++) {

        dim = [fenceLength, 10, 1];
        pos = [-xPositionsColumnsSideFence[0], yPosFence, zPositionsColumnsSideFence[i]];
        rot = [0, pi / 2, pi];
        meshes.push(getCubeMeshDefScl(pos, dim, rot));

        dim = [fenceLength, 10, 2];
        pos = [xPositionsColumnsSideFence[0], yPosFence, zPositionsColumnsSideFence[i]];
        rot = [0, pi / 2, pi];
        meshes.push(getCubeMeshDefScl(pos, dim, rot));
    }

    addMeshesToSceneWithCustomTextureRepeating(meshes, FENCE_FRONT_AND_BACK_SIDE, 24, 1);
}

/**
 This function adds the columns to the scene which are holding the roof
 */
function addRoofColumns() {

    // the frustum on the ground
    var i;
    var meshContainer = [];
    var materials = [];
    var xPositionsColumns = [480, 270, 70, -480, -270, -70];
    var heightColumnParts = [10, 200, 400, 600];
    var materialName = [PILLAR_BOTTOM, COLUMN, COLUMN_TOP_LEVEL_1, COLUMN_TOP_LEVEL_2, COLUMN_TOP_LEVEL_3, COLUMN_TOP_LEVEL_4, FRUSTUM_CUBE];

    // Initialize the arrays with defaultValues
    for (i = 0; i < 7; i++) {
        meshContainer.push([]);
        materials.push(getMaterialForCubeWithDefaultRepeating(materialName[i]))
    }

    // Add the 20 columns
    for (i = 0; i < xPositionsColumns.length; i++) {
        for (var j = 0; j < heightColumnParts.length; j++) {
            // 1. reihe
            meshContainer = addColumn(heightColumnParts[j], xPositionsColumns[i], meshContainer);
        }
    }

    for (i = 0; i < meshContainer.length; i++) {
        addMeshesToSceneWithCustomTextureRepeating(meshContainer[i], materialName[i], 1, 1)
    }
}

function addColumn(zPosition, xPosition, meshContainer) {
    var rot, pos, dim, columnHeight = 175, columnWidth = 10;
    // the frustum on the ground
    pos = [xPosition, 10, zPosition];
    dim = [10, 8, 10];
    rot = [pi, pi / 4, 0];
    meshContainer[0].push(getCylinderMeshDefSclDefRepDefRot(pos, dim, rot));

    // the column on the frustum
    pos = [xPosition, columnHeight / 2 + 5, zPosition];
    dim = [columnWidth, columnHeight, 10];
    meshContainer[1].push(getCubeMeshDefSclDefRotDefRep(pos, dim));


    for (var i = 0; i < 4; i++) {
        var d = 10 + i * 2;
        dim = [d, d, d];
        pos = [xPosition, columnHeight + (10 + i * 11), zPosition];
        meshContainer[i + 2].push(getCubeMeshDefSclDefRotDefRep(pos, dim));
    }

    // the top frustum
    pos = [xPosition, columnHeight + 41, zPosition];
    dim = [18, 18, 18];
    meshContainer[6].push(getCubeMeshDefSclDefRotDefRep(pos, dim));

    return meshContainer;
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
        addMeshesToSceneWithCustomTextureRepeating([cube], FLOOR_TEXTURE, 0.1, 0.1);
    }
}
