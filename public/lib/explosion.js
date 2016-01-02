var EXPLOSION_TIMEOUT = 1000

var explosions = []
var explosionColors = [
  '#FF7558',
  '#FF9858',
  '#FD575B',
  '#FFFF77'
]

var explosionMaterials = explosionColors.map( function( color ) {
  return new THREE.MeshPhongMaterial({
    color: color,
    shading: THREE.FlatShading
  })
})

function generateExplosion() {

  var size = 3
  var explosion = new THREE.Group()

  for( var i = 0; i < 20; i++ ) {

    var randomIndex = Math.floor(explosionMaterials.length * Math.random())
    var material = explosionMaterials[ randomIndex ]
    var shard = createSphere( 2, 0, 0, 0, material )

    // material.opacity = 0.5
    // material.transparent = true
    // material.shininess = 0

    shard.position.copy( randomSpherePoint() )
    shard.position.x *= size
    shard.position.y *= size
    shard.position.z *= size

    explosion.add( shard )

  }

  return explosion

}

function createExplosion( position ) {

  var index = Math.floor( Math.random() * explosions.length )
  var explosion = explosions[ index ]

  explosion.position.copy( position )

  scene.add( explosion )

  playExplosion()

  setTimeout( function() {
    scene.remove( explosion )
  }, EXPLOSION_TIMEOUT )

}

explosions = [
  generateExplosion(),
  generateExplosion(),
  generateExplosion(),
  generateExplosion(),
  generateExplosion(),
  generateExplosion(),
  generateExplosion(),
  generateExplosion(),
]
