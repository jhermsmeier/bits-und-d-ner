TIMESTEP = 1 / 60

window.physics = new CANNON.World()

physics.gravity.set( 0, 0, 0 )
physics.broadphase = new CANNON.NaiveBroadphase()
physics.broadphase.useBoundingBoxes = true
physics.solver.iterations = 10

var bodies = {}

function setupPhysics() {

  bodies.planet = new CANNON.Body({ mass: 10e9 })
  bodies.planet.mesh = scene.getObjectByName( 'planet' )
  bodies.planet.addShape(
    new CANNON.Sphere(
      bodies.planet.mesh.geometry.boundingSphere.radius
    )
  )

  bodies.spaceship = new CANNON.Body({
    mass: 500,
    linearDamping: 0.8,
    angularDamping: 0.5
  })

  bodies.spaceship.mesh = scene.getObjectByName( 'spaceship' )
  bodies.spaceship.addShape(
    new CANNON.Sphere(
      bodies.spaceship.mesh.geometry.boundingSphere.radius
    )
  )

  physics.addBody( bodies.planet )
  physics.addBody( bodies.spaceship )

  bodies.planet.angularVelocity.set( 0, 0.2, 0 )

  for( var k in bodies ) {
    bodies[k].position.copy( bodies[k].mesh.position )
    bodies[k].quaternion.copy( bodies[k].mesh.quaternion )
  }

}

function resetSpaceship( collider ) {

  if( collider.mesh.name !== 'asteroid' && collider.mesh.name !== 'planet' ) {
    adjustRubbishScore( 1 )
    playRubbish()
  } else {
    movementEnabled = false
    adjustHealthScore( -1 )
    createExplosion( bodies.spaceship.position )
    setTimeout( function() {
      putToStart( spaceship )
      movementEnabled = true
    }, 1000)
  }

}

function updatePhysics() {

  physics.step( TIMESTEP )

  for( var k = 0; k < physics.bodies.length; k++ ) {
    physics.bodies[k].mesh.position
      .copy( physics.bodies[k].position )
    physics.bodies[k].mesh.quaternion
      .copy( physics.bodies[k].quaternion )
  }

  var colls = physics.narrowphase.result

  for( var i = 0; i < colls.length; i++ ) {

    if( colls[i].bj === bodies.spaceship ) {
      resetSpaceship( colls[i].bi )
      if( colls[i].bi !== bodies.planet ) {
        physics.removeBody( colls[i].bi )
        scene.remove( colls[i].bi.mesh )
      }
      break
    }

    if( colls[i].bi === bodies.spaceship ) {
      resetSpaceship( colls[i].bj )
      if( colls[i].bj !== bodies.planet ) {
        physics.removeBody( colls[i].bj )
        scene.remove( colls[i].bj.mesh )
      }
      break
    }

    if( colls[i].bi.mass < colls[i].bj.mass && colls[i].bi !== bodies.planet ) {
      physics.removeBody( colls[i].bi )
      scene.remove( colls[i].bi.mesh )
    }

    if( colls[i].bj.mass < colls[i].bi.mass && colls[i].bj !== bodies.planet ) {
      physics.removeBody( colls[i].bj )
      scene.remove( colls[i].bj.mesh )
    }

    createExplosion( colls[i].bj.position )

  }

}
