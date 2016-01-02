function createPlanet( options ) {

  // var geometry = new THREE.SphereGeometry( options.radius, options.x, options.y )
  var geometry = new THREE.IcosahedronGeometry( options.radius, 2 )

  var planet = new THREE.Mesh(
    new THREE.BufferGeometry().fromGeometry( geometry ),
    new THREE.MeshPhongMaterial({
      color: options.color,
      shading: THREE.FlatShading
    })
  )

  planet.name = 'planet'
  planet.castShadow = true
  planet.receiveShadow = true
  planet.material.shininess = 10

  if( options.atmosphere ) {

    // var geometry = new THREE.SphereGeometry( options.radius * 1.2, options.x, options.y )
    var geometry = new THREE.IcosahedronGeometry( options.radius * 1.2, 2 )

    var atmo = new THREE.Mesh(
      new THREE.BufferGeometry().fromGeometry( geometry ),
      new THREE.MeshPhongMaterial({
        color: new THREE.Color( '#AAEEFF' ),
        shading: THREE.FlatShading
      })
    )

    atmo.name = 'atmo'
    atmo.material.opacity = 0.3
    atmo.material.transparent = true
    atmo.material.shininess = 0

    planet.add( atmo )

    if( options.clouds ) {

      var cloud = null

      for( var i = 0; i < 20; i++ ) {
        cloud = createCloud()
        cloud.position.x *= options.radius * 1.1
        cloud.position.y *= options.radius * 1.1
        cloud.position.z *= options.radius * 1.1
        atmo.add( cloud )
      }

    }

  }

  return planet

}

function createSky() {

  var sky = new THREE.Group()

  for( var i = 0; i < 100; i++ ) {
    star = createStar()
    star.position.x *= 10000
    star.position.y *= 10000
    star.position.z *= 10000
    sky.add( star )
  }

  return sky

}

function createStar() {

  var r = 50

  var star = createSphere( r, 2, 2 )

  star.receiveShadow = false
  star.castShadow = false

  star.material = createStar.material
  star.position.copy( randomSpherePoint() )

  return star

}

createStar.material = new THREE.MeshBasicMaterial({
  color: new THREE.Color( 'yellow' )
})

function createCloud() {
  var cloudGroup = new THREE.Group()

  for ( var i = 0; i < 10; i++ ) {
    var r = Math.random() * 0.4
    var cloud = createSphere( r )
    cloud.position.copy( randomSpherePoint() )
    cloud.position.x *= 0.5
    cloud.position.y *= 0.5
    cloud.position.z *= 0.5
    cloudGroup.add( cloud )
  }

  cloudGroup.position.copy( randomSpherePoint() )

  return cloudGroup

}
