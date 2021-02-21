const wallHeight = 260;

function addOuterWall() {
    const sideWallsDimension = { 'width': 440, 'height': wallHeight, 'depth': 15 };
    const sideWallsRotation = { 'rx': 0, 'ry': pi / 2, 'rz': 0 };
    const outerFrontWallDimension = { 'width': 350, 'height': wallHeight, 'depth': 15 };
    const zValueFrontWalls = 551;
    const xValueSideWalls = 490;
    const zValueSideWalls = 770;
    const yValueWall = 120;
    const xPositionFrontWalls = 315;
    
    addPlaneGeometryToScene({
        id: "outerFrontWallLeft",
        dimension: outerFrontWallDimension,
        position: { 'x': xPositionFrontWalls, 'y': yValueWall, 'z': zValueFrontWalls },
        texture: { name: [FRONT_LINKS, FRONT_LINKS] }
    });

    addPlaneGeometryToScene({
        id: "outerFrontWallRight",
        dimension: outerFrontWallDimension,
        position: { 'x': -xPositionFrontWalls, 'y': yValueWall, 'z': zValueFrontWalls },
        texture: { name: [FRONT_RECHTS, FRONT_RECHTS] }
    });

    addPlaneGeometryToScene({
        id: "backside",
        dimension: { 'width': 980, 'height': wallHeight, 'depth': 15 },
        position: { 'x': 0, 'y': yValueWall, 'z': 990 },
        texture: { name: [HINTEN, HINTEN] }
    });

    addPlaneGeometryToScene({
        id: "leftSide",
        dimension: sideWallsDimension,
        position: { 'x': -xValueSideWalls, 'y': yValueWall, 'z': zValueSideWalls },
        rotation: sideWallsRotation,
        texture: { name: [HINTEN, HINTEN] }
    });

    addPlaneGeometryToScene({
        id: "rightSide",
        dimension: sideWallsDimension,
        position: { 'x': xValueSideWalls, 'y': yValueWall, 'z': zValueSideWalls },
        rotation: sideWallsRotation,
        texture: { name: [HINTEN, HINTEN] }
    });
}

function addInnerWall() {

    const rotationSideWalls = { 'rx': 0, 'ry': pi / 2, 'rz': 0 };
    const dimensionInnerSideWalls = { 'width': 100, 'height': wallHeight, 'depth': 15 };
    const yEntranceValue = 120;
    const xEntranceSideWalls = 142;
    const xPositionInnerSideWalls = 100;
    const zPositionInnerSideWalls = 620;
    const zPositionrEntranceWalls = 690;
    const entranceSideWallsDimesion = { 'width': 140, 'height': wallHeight, 'depth': 15 };

    addPlaneGeometryToScene({
        id: "entranceLeftSide",
        dimension: dimensionInnerSideWalls,
        position: { 'x': xPositionInnerSideWalls, 'y': yEntranceValue, 'z': zPositionrEntranceWalls },
        texture: { name: [FRONT_LINKS_EINGANG_HINTEN, FRONT_LINKS_EINGANG_HINTEN] }
    });

    addPlaneGeometryToScene({
        id: "entranceRight",
        dimension: dimensionInnerSideWalls,
        position: { 'x': -xPositionInnerSideWalls, 'y': yEntranceValue, 'z': zPositionrEntranceWalls },
        texture: { name: [FRONT_RECHTS_EINGANG_HINTEN, FRONT_RECHTS_EINGANG_HINTEN] }
    });

    addPlaneGeometryToScene({
        id: "entrance",
        dimension: dimensionInnerSideWalls,
        position: { 'x': 0, 'y': yEntranceValue, 'z': zPositionrEntranceWalls },
        texture: { name: [FRONT_HINTEN, FRONT_HINTEN] }
    });

    addPlaneGeometryToScene({
        id: "entraceRightWall",
        dimension: entranceSideWallsDimesion,
        position: { 'x': -xEntranceSideWalls, 'y': yEntranceValue, 'z': zPositionInnerSideWalls },
        rotation: rotationSideWalls,
        texture: { name: [FRONT_RECHTS_EINGANG, FRONT_RECHTS_EINGANG] }
    });

    addPlaneGeometryToScene({
        id: "entraceLeftWall",
        dimension: entranceSideWallsDimesion,
        position: { 'x': xEntranceSideWalls, 'y': yEntranceValue, 'z': zPositionInnerSideWalls },
        rotation: rotationSideWalls,
        texture: { name: [FRONT_LINKS_EINGANG, FRONT_LINKS_EINGANG] }
    });
}