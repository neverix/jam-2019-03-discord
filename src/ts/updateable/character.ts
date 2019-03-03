import Vector from "../vector"
import { getRandomName } from "../randomizer";
import { Player } from "./player"
import { rectCollision } from "../collision";

export default class Character {
    // position of the character
    position: Vector
    // name. you can modify the vowels and consonants to make it sound differently
    name: string = getRandomName("euioa".split(''), "typsdfgklzcvbnm".split(''), 5)

    constructor(worldSize: number, public size: Vector, private player: Player) {
        // position the character randomly
        this.position = new Vector(
            -worldSize + size.x + Math.random() * (worldSize - size.x) * 2,
            -worldSize + size.y + Math.random() * (worldSize - size.y) * 2)
    }

    // update the character's state
    update(delta: number) {
        // check for collision with a player
        if (rectCollision(this.position, this.player.position, this.size, this.player.size)) {
            this.player.notifyCharacterCollision(this)
        }
    }

    // draw the character
    draw(ctx: CanvasRenderingContext2D) {
        // placeholder art
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y)
    }
}