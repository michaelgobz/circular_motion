import {randomNumFromRange} from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5',
'#7ECEFD',
'#FFF6E5',
'#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth * 0.5;
  canvas.height = innerHeight * 0.5;

  init()
})

// Objects
function Particle (x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.distanceFromCenter = randomNumFromRange(50 ,120);
    this.velocity = 0.005;
    this.lastMousePosition ={
      x:x,
      y:y
    }

  this.draw = function draw(lastPoint) {
    // basically here we are trying to draw rect to move it in a circula way
    // hence  making a very nice curve
    c.beginPath()
    c.strokeStyle= this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x ,lastPoint.y);
    c.lineTo(this.x , this.y);
    c.stroke();
    c.closePath();
  }

 this.update = function  update() {
   // we get the last  point
  const lastPoint = {
    x: this.x,
    y: this.y
  }
  // The good drag way
  this.lastMousePosition.x += (mouse.x - this.lastMousePosition.x ) * 0.09;
  this.lastMousePosition.y += (mouse.y - this.lastMousePosition.y) * 0.09;
     // we create a circular model
  this.radians += this.velocity;
  this.x = this.lastMousePosition.x + Math.cos(this.radians) * this.distanceFromCenter;
  this.y = this.lastMousePosition.y + Math.sin(this.radians) * this.distanceFromCenter;
    this.draw(lastPoint)
  }

}
// Implementation
let particlesArray;
function init() {
  particlesArray = []

  for (let i = 0; i < 150; i++) {
    let radius = randomNumFromRange(0.5,1.5);
    let x = randomNumFromRange(600,600);
    let y = randomNumFromRange(600,600);
    particlesArray.push(new  Particle(x,y ,radius,'white'))
  }
  console.log(particlesArray);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle= 'rgba(0,0,0,0.05)';
  c.fillRect(0, 0, canvas.width, canvas.height)
  // we draw to the paticle
  particlesArray.forEach(particle =>
    particle.update());
}

init()
animate()
