// No sounds played in debug mode

if ( !DEBUG ) {
  backgroundMusic = new Audio('sound/OrbitalCleanup.wav')
  backgroundMusic.addEventListener('ended', function() {
      this.currentTime = 0
      this.play()
  }, false)
  backgroundMusic.play()
}

explosionSound = new Audio('sound/Explosion.wav')
function playExplosion() {
  if ( DEBUG ) {
    return
  }

  explosionSound.currentTime = 0
  explosionSound.play()
}

rubbishSound = new Audio('sound/Rubbish.wav')
function playRubbish() {
  if ( DEBUG ) {
    return
  }

  rubbishSound.currentTime = 0
  rubbishSound.play()
}
