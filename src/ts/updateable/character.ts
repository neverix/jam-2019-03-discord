import Vector from "../vector"
import { getRandomName } from "../randomizer";

export default class Character {
    // position of the character
    position: Vector
    // name. you can modify the vowels and consonants to make it sound differently
    name: string = getRandomName("euioa".split(''), "typsdfgklzcvbnm".split(''), 5)

    constructor(worldSize: number, private size: Vector) {
        // position the character randomly
        this.position = new Vector(
            -worldSize + size.x + Math.random() * (worldSize - size.x) * 2,
            -worldSize + size.y + Math.random() * (worldSize - size.y) * 2)
        console.log(this.name)
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