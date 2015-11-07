function createSpaceship( addToScene ) {
  var loader = new THREE.JSONLoader()

  loader.load('models/spaceship.json', function (geometry) {
    var material = new THREE.MeshPhongMaterial({
      color: '#ed8989',
      shading: THREE.FlatShading
    })

    mesh = new THREE.Mesh(
      geometry,
      material
    )

    mesh.scale.x = 10
    mesh.scale.y = 10
    mesh.scale.z = 10

    mesh.position.z = 500
    addToScene( mesh )
  })
}
