function addAmbientlight() {
    var light = new THREE.AmbientLight(0xffffff);
    light.position.set(45, 500, -63);
    scene.add(light);
}
