import Vector from "../vector"
import { fromEvent } from "rxjs"
import { Key } from "ts-keycode-enum"
import Character from "./character"

//main player class
class Player {
    //keep track of direction
    direction = new Vector(0, 0)

    //multiplied with the direction and delta to get the speed
    speedMultiplier = 0.3

    //takes position ans size as arguments
    constructor(public position: Vector = new Vector(0, 0),
        public size: Vector = new Vector(100, 100),
        public enviromentSize: number) {

        //set up events
        fromEvent(document, "keydown")
            .subscribe((e: KeyboardEvent) => {
                if (e.which == Key.A || e.which == Key.LeftArrow) this.direction.x = -1
                else if (e.which == Key.D || e.which == Key.RightArrow) this.direction.x = 1
                else if (e.which == Key.W || e.which == Key.UpArrow) this.direction.y = -1
                else if (e.which == Key.S || e.which == Key.DownArrow) this.direction.y = 1
            })
        fromEvent(document, "keyup")
            .subscribe((e: KeyboardEvent) => {
                if ((e.which == Key.A || e.which == Key.LeftArrow) && this.direction.x == -1) this.direction.x = 0
                else if ((e.which == Key.D || e.which == Key.RightArrow) && this.direction.x == 1) this.direction.x = 0
                else if ((e.which == Key.W || e.which == Key.UpArrow) && this.direction.y == -1) this.direction.y = 0
                else if ((e.which == Key.S || e.which == Key.DownArrow) && this.direction.y == 1) this.direction.y = 0
            })
    }
    //delta passed from mainloops update
    update(delta: number) {
        //moves the player
        this.position = this.position.add(this.direction.mul(delta * this.speedMultiplier))

        //keep the object in the world
        if (this.position.x < -this.enviromentSize) this.position.x = -this.enviromentSize
        else if (this.position.x + this.size.x > this.enviromentSize) this.position.x = this.enviromentSize - this.size.x
        if (this.position.y < -this.enviromentSize) this.position.y = -this.enviromentSize
        else if (this.position.y + this.size.y > this.enviromentSize) this.position.y = this.enviromentSize - this.size.y
    }
    //draws
    draw(ctx: CanvasRenderingContext2D) {
        //placeholder for art
        //also , do u know any way to make spread operator (...) work in ts?
        ctx.fillStyle = "orange"
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y)
    }
    // used by characters to notify the player that a collision occured
    notifyCharacterCollision(character: Character) {
        // "push" the player out of the character
        this.position = this.position.add(
            this.position.sub(character.position)
                .norm().mul(character.size.maxSide() / 4 + this.size.maxSide() / 4))
        // TODO, replace with disabling input and adding a textbox
        console.log(character)
    }
}

export { Player }