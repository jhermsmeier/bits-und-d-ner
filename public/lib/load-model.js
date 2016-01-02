var modelLoader = new THREE.JSONLoader()

function loadModel( name, position, scale, color, availableModels ) {

  modelLoader.load('models/' + name + '.json', function( geometry ) {

    var material = new THREE.MeshPhongMaterial({
      color: color,
      shading: THREE.FlatShading
    })

    geometry = new THREE.BufferGeometry()
      .fromGeometry( geometry )

    geometry.computeBoundingSphere()

    var mesh = new THREE.Mesh(
      geometry,
      material
    )

    mesh.material.shininess = 0
    mesh.position.x = position.x
    mesh.position.y = position.y
    mesh.position.z = position.z
    mesh.scale.x = scale
    mesh.scale.y = scale
    mesh.scale.z = scale

    mesh.name = name
    availableModels.push( mesh )

  })

}
