var SPACESHIP_START_POSITION = new THREE.Vector3( 0, 0, 40 )

function putToStart( spaceship ) {

  spaceship.position.set(
    SPACESHIP_START_POSITION.x,
    SPACESHIP_START_POSITION.y,
    SPACESHIP_START_POSITION.z
  )

  if ( bodies.spaceship ) {

    bodies.spaceship.angularVelocity.x = 0
    bodies.spaceship.angularVelocity.y = 0
    bodies.spaceship.angularVelocity.z = 0

    bodies.spaceship.velocity.x = 0
    bodies.spaceship.velocity.y = 0
    bodies.spaceship.velocity.z = 0

    bodies.spaceship.position.x = SPACESHIP_START_POSITION.x
    bodies.spaceship.position.y = SPACESHIP_START_POSITION.y
    bodies.spaceship.position.z = SPACESHIP_START_POSITION.z

    bodies.spaceship.quaternion.x = 0
    bodies.spaceship.quaternion.y = 1
    bodies.spaceship.quaternion.z = 0

  }

  spaceship.rotation.set( 0, Math.PI, 0 )

}

function createSpaceship( addToScene ) {

  var loader = new THREE.JSONLoader()

  loader.load( 'models/spaceship.json', function( geometry ) {

    var spaceship = new THREE.Mesh(
      new THREE.BufferGeometry().fromGeometry( geometry ),
      new THREE.MeshPhongMaterial({
        color: '#ED8989',
        shading: THREE.FlatShading
      })
    )

    spaceship.name = 'spaceship'
    spaceship.rotation.y = Math.PI
    spaceship.geometry.computeBoundingSphere()

    putToStart( spaceship )
    addCamera( spaceship )
    addToScene( spaceship )

  })

}

function addCamera( mesh ) {

  window.spaceshipCamera = new THREE.PerspectiveCamera(
    FOV, window.innerWidth / window.innerHeight, NEAR, FAR
  )

  mesh.add( spaceshipCamera )
  mesh.rotation.y = Math.PI

  spaceshipCamera.position.z = -20
  spaceshipCamera.position.y = 8
  spaceshipCamera.lookAt( mesh.position )

  new THREE.OrbitControls( spaceshipCamera )

  if ( !DEBUG ) {
    window.currentCamera = spaceshipCamera
  } else {
    scene.add( new THREE.CameraHelper( spaceshipCamera ) )
    mesh.add( new THREE.AxisHelper( 5 ) )
  }
}
