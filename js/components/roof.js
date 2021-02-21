function addRoof() {

  const geometry = new THREE.SphereGeometry( 50, 8, 3,10, Math.PI, 0, Math.PI/2 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide});
const sphere = new THREE.Mesh( geometry, material );
sphere.position.set(200, 50, 0);
//scene.add( sphere );



addSphereMesh({
  id: "dome",
  dimension: { radius: 1000, widthSegments: 8, heightSegments: 3, phiStart: 4, phiLength: Math.PI, thetaStart: 0, thetaLength: Math.PI/2},
  position: { x: 0, y: 275, z: 495 },
  rotation: { rx: 0, ry: pi / 4, rz: 0 },
  texture: { name: ROOF_SECTION_TWO, repeatX: 1, repeatY: 1 }
});




  addRoofSectionTop();
  addRoofSectionMiddle();
  addRoofSectionBottom(); 

}

function addRoofSectionTop() {
  addCylinderGeometryToScene({
    id: "roofSectionOnPillars",
    dimension: { radiusTop: 770, radiusBottom: 740, height: 20, radialSegments: 4, heightSegments: 4 },
    position: { x: 0, y: 295, z: 495 },
    rotation: { rx: 0, ry: pi / 4, rz: 0 },
    texture: { name: ROOF_SECTION_THREE, repeatX: 128, repeatY: 1, isTransparent: true }
  });
}

function addRoofSectionMiddle() {
  addCylinderGeometryToScene({
    id: "roofSectionOnPillars",
    dimension: { radiusTop: 740, radiusBottom: 710, height: 20, radialSegments: 4, heightSegments: 4 },
    position: { x: 0, y: 275, z: 495 },
    rotation: { rx: 0, ry: pi / 4, rz: 0 },
    texture: { name: ROOF_SECTION_TWO, repeatX: 128, repeatY: 1 }
  });
}

function addRoofSectionBottom() {
  addBoxGeometryToScene({
    id: "roofSectionOnPillars",
    dimension: { width: 1000, height: 30, depth: 1000 },
    position: { x: 0, y: 250, z: 495 },
    //texture: { name: ROOF_SECTION_ONE, repeatX: 32, repeatY: 1 }
    texture: {
      name: [ROOF_SECTION_ONE, ROOF_SECTION_ONE, null, ROOF_BOTTOM2, ROOF_SECTION_ONE, ROOF_SECTION_ONE],
      repeatX: [32, 32, 32, 4, 32, 32],
      repeatY: [1, 1, 1, 6, 1, 1]
    }
  });
}
