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