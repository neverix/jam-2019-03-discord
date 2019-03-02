import Vector from "./vector"

export default class Camera {
    position: Vector = new Vector()

    update(delta: number) {
        this.position.x += delta * 0.05
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.translate(this.position.x, this.position.y)
    }
}