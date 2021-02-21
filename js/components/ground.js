function addGround() {
    addBoxGeometryToScene({
        id: "ground",
        dimension: { width: 10000, height: 10000, depth: 1 },
        position: { x: 0, y: -6, z: 0 },
        rotation: { rx: pi / 2, ry: 0, rz: 0 },
        texture: { name: GROUND_TEXTURE }
    })
}
