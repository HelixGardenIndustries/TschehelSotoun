const SIDE_WALLS_HEIGHT = 5;
const DIMENSION_WIDTH = 1000;
const DIMENSION_DEPTH = 1000;

function addPond() {
    addPondFrontSide();
    addPondBackSide();
    addPondRightSide();
    addPondLeftSide();
    addPondGround();
    //addWater();
}

function addPondGround() {
    addBoxGeometryToScene({
        id: "pondGround",
        dimension: { 'width': DIMENSION_WIDTH, 'height': 1, 'depth': 1000 },
        position: { 'x': 10, 'y': -2, 'z': -850 },
        texture: { name: POND_TEXTURE_SIDE, repeatX: 5, repeatY: 5 },
    });
}


function addPondLeftSide() {
    addBoxGeometryToScene({
        id: "pondLeftSide",
        dimension: { 'width': 10, 'height': SIDE_WALLS_HEIGHT, 'depth': 1000 },
        position: { 'x': 515, 'y': 0, 'z': -850 },
        texture: { name: POND_TEXTURE_SIDE, color: 0xffff00 },
    });
}

function addPondRightSide() {
    addBoxGeometryToScene({
        id: "pondRightSide",
        dimension: { 'width': 10, 'height': SIDE_WALLS_HEIGHT, 'depth': 1000 },
        position: { 'x': -495, 'y': 0, 'z': -850 },
        texture: { name: POND_TEXTURE_SIDE, color: 0xff0000 },
    });
}

function addPondBackSide() {
    addBoxGeometryToScene({
        id: "pondBackSide",
        dimension: { 'width': 10, 'height': SIDE_WALLS_HEIGHT, 'depth': 1020 },
        position: { 'x': 10, 'y': 0, 'z': -1355 },
        rotation: { 'rx': 0, 'ry': pi / 2, 'rz': pi },
        texture: { name: POND_TEXTURE_SIDE, color: 0xff00ff },
    });
}

function addPondFrontSide() {
    addBoxGeometryToScene({
        id: "pondBackSide",
        dimension: { 'width': DIMENSION_WIDTH + 20, 'height': SIDE_WALLS_HEIGHT, 'depth': 5 },
        position: { 'x': 10, 'y': 0, 'z': -348 },
        rotation: { 'rx': pi / 2, 'ry': 0, 'rz': pi },
        texture: { name: POND_TEXTURE_SIDE, color: 0xff0000 },
    });
}

function addWater() {
    // Water

    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

    water = new Water(
        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load(WATER, function (texture) {

                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            }),
            alpha: 1.0,
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: scene.fog !== undefined
        }
    );
}


