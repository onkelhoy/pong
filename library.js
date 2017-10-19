// just a generic class that holds orignalPos, x, y and reset function
class GameObject {
  constructor (x, y) {
    this.orginalPos = {x, y}
    this.x = x
    this.y = y

    this.speedx
    this.speedy
  }

  resetPos () {
    this.x = this.orginalPos.x
    this.y = this.orginalPos.y
  }
  reset () {
    this.resetPos()
  }
}


// the Block class, that will hold the move and render function as well as a score
function AABB (a, b) {
  // console.log(a.x, a.y, a.width, a.height, b.x, b.y, b.width, b.height);
  return (a.x < b.x + b.w && a.x + a.w > b.x) && (a.y < b.y + b.h && a.y + a.h > b.y)
}
function boundary(x, y, w, h, o) {
  return {
    top: { x, y: y - o, w, h: o},
    bottom: { x, y: y + h, w, h: o},
    left: { x: x - o, y, w: o, h },
    right: { x: x + w, y, w: o, h }
  }
}
class Block extends GameObject {
  constructor (x, y) {
    super(x, y)
    this.score = 0
    this.w = 40
    this.h = 250
  }

  collision (ball) {
    // first simple AABB
    let BB = ball.boundary

    if (AABB(BB, this)) {
      let bounds = boundary(this.x, this.y, this.w, this.h, this.w)

      if (AABB(BB, bounds.top)) {
        ball.y = this.y - ball.r
        ball.speedy *= -1
      } else if (AABB(BB, bounds.bottom)) {
        ball.y = bounds.bottom.y + ball.r
        ball.speedy *= -1
      } else if (AABB(BB, bounds.right)) {
        ball.x = bounds.right.x + ball.r
        ball.speedx *= -1
      } else if (AABB(BB, bounds.left)) {
        ball.x = this.x - ball.r
        ball.speedx *= -1
      } else {
        ball.speedx *= -1
        ball.speedy *= -1
      }
    }
  }
  move (x, y) {
    this.x = x
    this.y = y
  }
  render (context) {
    context.beginPath()
      context.rect(this.x, this.y, this.w, this.h)
      context.fill()
    context.closePath()
  }
}

// the payer which has a speedy and a update function
class Player extends Block {
  constructor (x, y) {
    super(x, y)

    this.speedy = 0
  }

  update (height) {
    this.y += this.speedy

    if (this.y + this.h > height) {
      this.y = height - this.h
    }
    if (this.y < 0) this.y = 0
  }
}

// the ball
class Ball extends GameObject {
  constructor (x, y, r) {
    super (x, y)
    this.angle
    this.r = r

    this.reset(2)
  }

  get boundary () {
    return { x: this.x - this.r, y: this.y - this.r, w: this.r * 2, h: this.r * 2 }
  }
  update () {
    this.x += this.speedx
    this.y += this.speedy
  }
  render (context) {
    context.beginPath()
      context.arc(this.x, this.y, this.r, 0, Math.PI * 2)
      context.fill()
    context.closePath()
  }
  reset (level) { // we want to add new direction
    this.resetPos() // same as parent
    while (true) {
      this.angle = Math.PI * 2 * Math.random()

      if (Math.abs(Math.cos(this.angle)) < .2) continue
      if (Math.abs(Math.sin(this.angle)) < .2) continue
      break
    }

    this.speedx = Math.cos(this.angle) * 5 * level
    this.speedy = Math.sin(this.angle) * 5 * level
  }
}
