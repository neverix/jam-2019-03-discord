import Vector from "../vector"
import { getRandomName } from "../randomizer";
import { Player } from "./player"
import { rectCollision } from "../collision";

export default class Character {
    // position of the character
    position: Vector
    // name. you can modify the vowels and consonants to make it sound differently
    name: string
    //used to generate the name length
    randomFactor: number = 6

    constructor(worldSize: number, public size: Vector, private player: Player) {
        //i like to have the short form
        const { floor, random } = Math

        // position the character randomly
        this.position = new Vector(
            -worldSize + size.x + random() * (worldSize - size.x) * 2,
            -worldSize + size.y + random() * (worldSize - size.y) * 2)

        this.name = getRandomName("euioa".split(''), "typsdfgklzcvbnm".split(''), 5 + floor(random() * this.randomFactor) - this.randomFactor / 2)
        console.log(this.name)
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

        //display name
        ctx.fillStyle = "black"
        ctx.font = "Impact"
        ctx.textAlign = "center"
        ctx.fillText(this.name, this.position.x + this.size.x / 2, this.position.y - this.size.y / 3, this.size.x)
    }
}