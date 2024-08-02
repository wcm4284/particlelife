// define necessary variables here
var ctx = document.getElementById("canvas").getContext('2d')
const width = document.getElementById("canvas").width
const height = document.getElementById("canvas").height
const twoPI = Math.PI * 2
const radius = 5
const num_colors = 7
const dt = 0.02
const frictionHalfLife = 0.08
const frictionFactor = Math.pow(0.5, dt / frictionHalfLife)
const rMax = 0.05
const forceFactor = 15
var particles = []

const random = (max) => {
    return Math.random() * max
}

var forces = Array.from({length : num_colors}, () => Array.from({length : num_colors}, () => random(2) - 1))

// I'm most familiar with the ES6 class syntax, so I want to use this
class Particle {

    constructor() {
        this.x = random(1)
        this.y = random(1)
        this.vx = 0
        this.vy = 0
        this.color = Math.floor(random(num_colors))
    }

    getX() { return this.x % 1 }
    getY() { return this.y % 1 }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x * width, this.y * height, 2, 0, twoPI)
        ctx.fillStyle = `hsl(${360 * (this.color / num_colors)}, 100%, 50%)`
        ctx.fill()
        ctx.stroke()
    }
}

class Triangle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.r = Math.hypot(this.x, this.y)
    }
}

const drawBG = (x, y, color) => {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}

const create = (amt) => {
    for (let i = 0; i < amt; i++) {
        let p = new Particle()
        particles.push(p)
    }
}

const force = (r, force) => {
    const beta = 0.3
    if (r < beta) {
        console.log(r / beta - 1)
        return r / beta - 1
    } else if (r >= beta && r < 1) {
        return force * (1 - Math.abs(2 * r - 1 - beta) / (1 - beta))
    } else {
        return 0
    }
}

const distance = (particleA, particleB) => {
    let dx = particleA.x - particleB.x
    let dy = particleA.y - particleB.y
    return new Triangle(dx, dy)
}

const update = () => {
    ctx.clearRect(0, 0, width, height)
    drawBG(0, 0, "black")

    for (let i = 0; i < particles.length; i++) {
        let particleA = particles[i]

        let totalForceX = 0
        let totalForceY = 0

        // I'm gonna do this in less efficient way, because I don't
        // want to store the forces inside of the particle
        // I may change it later
        for (let j = 0; j < particles.length; j++) {
            if (i === j) { continue }
            let particleB = particles[j]

            let dst = distance(particleB, particleA)
            
            if (dst.r > 0 && dst.r < rMax) {
                const f = force(dst.r / rMax, forces[particleA.color][particleB.color])

                totalForceX += dst.x / dst.r * f
                totalForceY += dst.y / dst.r * f
            }
        }

        totalForceX *= rMax * forceFactor
        totalForceY *= rMax * forceFactor

        particleA.vx *= frictionFactor
        particleA.vy *= frictionFactor

        particleA.vx += totalForceX * dt
        particleA.vy += totalForceY * dt

        particleA.x += particleA.vx * dt
        particleA.y += particleA.vy * dt

        particleA.draw()
    }


    requestAnimationFrame(update)
}

console.log(forces)

create(1000)
update()