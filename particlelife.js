// define necessary variables here
ctx = document.getElementById("canvas").getContext('2d')
width = document.getElementById("canvas").width
height = document.getElementById("canvas").height
twoPI = Math.PI * 2
particles = []

drawBG = (x, y, color) => {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}

drawCircle = (x, y, color, radius) => {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, twoPI)
    ctx.fillStyle = color
    ctx.fill()
    ctx.stroke()
}

particle = (x, y, color) => {
    return { "x" : x, "y" : y, "vx" : 0, "vy" : 0, "color" : color }
}

random = (max) => {
    console.log(max)
    return Math.random() * max
}

create = (amt, color) => {
    group = []
    for (let i = 0; i < amt; i++) {
        p = particle(random(width), random(height), color)
        group.push(p)
        particles.push(p)
    }
    return group
}

update = () => {
    ctx.clearRect(0, 0, width, height)
    drawBG(0, 0, "black")
    for (let i = 0; i < particles.length; i++) {
        drawCircle (particles[i].x,
                    particles[i].y,
                    particles[i].color,
                    5)
    }
    requestAnimationFrame(update)
}

create(10, "yellow")
update()