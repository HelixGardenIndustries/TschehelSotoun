function addFundamentPalace() {
    addBoxGeometryToScene({
        id: "fundament",
        dimension: { 'width': 1000, 'height': 5, 'depth': 1000 },
        position: { 'x': 0, 'y': 1, 'z': 500 },
        texture: {name: FLOOR_TEXTURE, repeatX: 8, repeatY: 8}
    });
}