import Character from "./character"
import Vector from "../vector"
import { Player } from "./player";

export default class Characters {
    // list of all characters in the game
    characters: Character[] = []

    constructor(
        worldSize: number, player: Player, characterNumber: number = 5, size: Vector = new Vector(30, 30)) {
        // generate characters
        for (let i = 0; i < characterNumber; i++) {
            this.characters.push(new Character(worldSize, size, player))
        }
    }

    // update all characters
    update(delta: number) {
        for (let character of this.characters) {
            character.update(delta)
        }
    }

    // render all characters
    draw(ctx: CanvasRenderingContext2D) {
        for (let character of this.characters) {
            character.draw(ctx)
        }
    }
}