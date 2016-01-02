function createSphere( radius, x, y, z, material ) {

  var material = material || createSphere.material
  var geometry = new THREE.BufferGeometry()
    .fromGeometry( new THREE.IcosahedronGeometry( radius, 1 ) )

  var sphere = new THREE.Mesh( geometry, material )

  sphere.receiveShadow = true
  sphere.castShadow = true

  return sphere

}

createSphere.material = new THREE.MeshPhongMaterial({
  color: new THREE.Color( 'white' ),
  shading: THREE.FlatShading
})

function randomSpherePoint() {

   var u = Math.random()
   var v = Math.random()

   var theta = 2 * Math.PI * u
   var phi = Math.acos( 2 * v - 1 )

   var x = Math.sin( phi ) * Math.cos( theta )
   var y = Math.sin( phi ) * Math.sin( theta )
   var z = Math.cos( phi )

   return new THREE.Vector3( x, y, z )

}
