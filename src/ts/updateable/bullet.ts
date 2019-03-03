import Vector from "../vector";

export class Bullet {
    //defines how fast it moves
    speedMultiplier = 0.5

    //the radius
    radius = 10

    //tell the player if it should destory this
    destroyed = false

    constructor(public position = new Vector(),
        public direction = new Vector(),public enviromentSize = 300) { }

    update(delta: number) {
        this.position = this.position.add(this.direction.mul(delta * this.speedMultiplier))

        //keep the object in the world
        if (this.position.x < -this.enviromentSize) this.destroyed = true
        else if (this.position.x + this.radius > this.enviromentSize) this.destroyed = true
        if (this.position.y < -this.enviromentSize) this.destroyed = true
        else if (this.position.y + this.radius > this.enviromentSize) this.destroyed = true

        if (this.destroyed){
            //play sfx
            const sfx = new Audio("../../../res/music/wall.wav")
            sfx.play()
        }
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "black"
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI)
        ctx.fill()
    }
}