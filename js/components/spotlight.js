function addSpotLight(){
    ////////////
    // CUSTOM //
    ////////////

    // must enable shadows on the renderer
    renderer.shadowMapEnabled = true;

    // "shadow cameras" show the light source and direction

    // spotlight #1 -- yellow, dark shadow
    light = new THREE.SpotLight(0xffff00);
    light.lookAt(1000, 200, 0);
    light.position.set(0,150,-1060);
    light.shadowCameraVisible = true;
    light.shadowDarkness = 0.95;
    light.intensity = 1000;
    light.distance = 2150;
    // must enable shadow casting ability for the light
    light.castShadow = true;
    scene.add(light);

    // create "light-ball" meshes
    var sphereGeometry = new THREE.SphereGeometry( 10, 16, 8 );
    var darkMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    var wireframeMaterial = new THREE.MeshBasicMaterial(
        { color: 0xffff00, wireframe: true, transparent: true } );

    var shape = THREE.SceneUtils.createMultiMaterialObject(
        sphereGeometry, [ darkMaterial, wireframeMaterial ] );
    shape.position.set(0, 50,0);
    shape.position = light.position;
    scene.add( shape );

 }