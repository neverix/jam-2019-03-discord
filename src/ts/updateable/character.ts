import Vector from "../vector"

export default class Character {
    // position of the character
    position: Vector

    constructor(worldSize: number, private size: Vector) {
        // position the character randomly
        this.position = new Vector(
            -worldSize + size.x + Math.random() * (worldSize - size.x) * 2,
            -worldSize + size.y + Math.random() * (worldSize - size.y) * 2)
    }

    // update the character's state
    update(delta: number) {

    }

    // draw the character
    draw(ctx: CanvasRenderingContext2D) {
        // placeholder art
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y)
    }
}