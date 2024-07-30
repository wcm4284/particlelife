// define necessary variables here
var ctx = document.getElementById("canvas").getContext('2d')
var width = document.getElementById("canvas").width
var height = document.getElementById("canvas").height
var twoPI = Math.PI * 2
var radius = 5
var num_colors = 3
var particles = []

// I'm most familiar with the ES6 class syntax, so I want to use this
class Particle {

    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, 5, 0, twoPI)
        ctx.fillStyle = `hsl(${360 * (this.color / num_colors)}, 100%, 50%)`
        ctx.fill()
        ctx.stroke()
    }
    getX() { return this.x }
    getY() { return this.y }
}

const random = (max) => {
    return Math.random() * max
}

// create force matrix here, awkward spot but I needed it to be after
// the random function
var forces = Array.from({length : num_colors}, () => Array.from({length : num_colors}, () => random(2) - 1))

const drawBG = (x, y, color) => {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}

const create = (amt) => {
    for (let i = 0; i < amt; i++) {
        let p = new Particle(random(width), random(height), Math.floor(random(num_colors)))
        particles.push(p)
    }
}

const update = () => {
    ctx.clearRect(0, 0, width, height)
    drawBG(0, 0, "black")
    particles.forEach(particle => particle.draw())
    requestAnimationFrame(update)
}

create(10)
update()