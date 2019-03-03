import Vector from "../vector"

export default class Camera {
    position = new Vector()
    target = new Vector()
    movementSteps = 13

    update(_delta: number) {
        this.position = this.position.add(this.target.sub(this.position).div(this.movementSteps))
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.translate(-this.position.x, -this.position.y)
    }
}