var modelLoader = new THREE.JSONLoader()

function loadModel( name, position, scale, color, availableModels ) {

  modelLoader.load('models/' + name + '.json', function( geometry ) {

    var mesh = new THREE.Mesh(
      new THREE.BufferGeometry().fromGeometry( geometry ),
      new THREE.MeshPhongMaterial({
        color: color,
        shading: THREE.FlatShading
      })
    )

    geometry = void 0

    mesh.name = name
    mesh.material.shininess = 0
    mesh.position.x = position.x
    mesh.position.y = position.y
    mesh.position.z = position.z
    mesh.scale.x = scale
    mesh.scale.y = scale
    mesh.scale.z = scale

    mesh.geometry.computeBoundingSphere()

    availableModels.push( mesh )

  })

}
