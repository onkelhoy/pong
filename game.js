let canvas
let width
let height
let context

let ball
let enemy
let player
let speed = 10


window.onload = function () {
  canvas = document.querySelector('canvas')
  context = canvas.getContext('2d')
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
  canvas.onkeydown = function (e) {
    let key = e.keyCode
    if (key === 38) { // up
      player.speedy = -speed
    } else if (key === 40) { // down
      player.speedy = speed
    }
  }
  canvas.onkeyup = function (e) {
    let key = e.keyCode
    if (key === 38 || key === 40) { // down
      player.speedy = 0
    }
  }
  canvas.focus()

  load()
  gameLoop()
}

function load () {
  context.fillStyle = 'white'
  context.strokeStyle = 'white'
  context.lineWidth = 3
  ball = new Ball(width/2, height/2, 12)
  enemy = new Block(50, height/2 - 250/2)
  player = new Player(width - 90, height/2 - 250/2)
}
function update () {
  player.update(height)
  ball.update()
  if (ball.y + ball.r > height) {
    ball.y = height - ball.r
    ball.speedy *= -1
  }
  if (ball.y - ball.r < 0) {
    ball.y = ball.r
    ball.speedy *= -1
  }

  player.collision(ball)
  enemy.collision(ball)
}
function render () {
  context.clearRect(0, 0, width, height)
  ball.render(context)
  enemy.render(context)
  player.render(context)
}

function gameLoop () {
  update()
  render()

  requestAnimationFrame(gameLoop)
}
