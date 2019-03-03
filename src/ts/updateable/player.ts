import Vector from "../vector"
import { fromEvent, Observable, Subscription, interval } from "rxjs"
import { Key } from "ts-keycode-enum"
import Character from "./character"
import { throttle } from "rxjs/operators";
import { Bullet } from "./bullet";

//main player class
class Player {
    //keep track of direction
    direction = new Vector(0, 0)

    //multiplied with the direction and delta to get the speed
    speedMultiplier = 0.3

    //remeber events
    subscriptions: Array<Subscription> = []

    //bullets per second
    bps: number = 3

    //remember if the mouse is or isnt pressed
    pressed = false

    //stores all bullets
    bullets: Array<Bullet> = []

    //remember last poition
    lastPosition = new Vector()

    //takes position ans size as arguments
    constructor(public position: Vector = new Vector(0, 0),
        public size: Vector = new Vector(100, 100),
        public enviromentSize: number) {

        this.bindEvents()

        //setup shooting loop
        interval(1000 / this.bps).subscribe(e => {
            if (this.pressed) this.shoot(
                this.lastPosition
            )
        })
    }

    //call in constructor and after dialog
    bindEvents() {
        //set up events
        const keydown = fromEvent(document, "keydown").subscribe((e: KeyboardEvent) => {
            if (e.which == Key.A || e.which == Key.LeftArrow) this.direction.x = -1
            else if (e.which == Key.D || e.which == Key.RightArrow) this.direction.x = 1
            else if (e.which == Key.W || e.which == Key.UpArrow) this.direction.y = -1
            else if (e.which == Key.S || e.which == Key.DownArrow) this.direction.y = 1
        })
        const keyup = fromEvent(document, "keyup").subscribe((e: KeyboardEvent) => {
            if ((e.which == Key.A || e.which == Key.LeftArrow) && this.direction.x == -1) this.direction.x = 0
            else if ((e.which == Key.D || e.which == Key.RightArrow) && this.direction.x == 1) this.direction.x = 0
            else if ((e.which == Key.W || e.which == Key.UpArrow) && this.direction.y == -1) this.direction.y = 0
            else if ((e.which == Key.S || e.which == Key.DownArrow) && this.direction.y == 1) this.direction.y = 0
        })
        const mousedown = fromEvent(document, "mousedown").subscribe(e => {
            this.pressed = true
        })
        const mouseup = fromEvent(document, "mouseup").subscribe(e => {
            this.pressed = false
        })
        const mousemove = fromEvent(document, "mousemove").subscribe((e: MouseEvent) => {
            this.lastPosition = (new Vector(e.clientX, e.clientY))
                .sub(new Vector(window.innerWidth / 2, window.innerHeight / 2))
        })

        //save events and subscriptions
        // this.events.push(keyup,keydown,mousedown,mouseup)
        this.subscriptions.push(keydown, keyup, mousedown, mousemove, mouseup)
    }

    //shoots
    shoot(delta: Vector) {
        this.bullets.push(new Bullet(this.position.add(this.size.div(2)), delta.norm(), this.enviromentSize))
        console.log(this.bullets);
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

        //update bullets
        this.bullets.forEach(val => val.update(delta))

        //remove destroyed bullets
        for (let i = 0; i < this.bullets.length; i++)
            if (this.bullets[i].destroyed)
                this.bullets.splice(i, 1)
    }
    //draws
    draw(ctx: CanvasRenderingContext2D) {
        //placeholder for art
        //also , do u know any way to make spread operator (...) work in ts?
        ctx.fillStyle = "orange"
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y)

        //draw bullets
        this.bullets.forEach(val => val.draw(ctx))
    }
    // used by characters to notify the player that a collision occured
    notifyCharacterCollision(character: Character, collision: Vector) {
        //cancel all subscriptions
        this.subscriptions.forEach((val) => val.unsubscribe())
        this.subscriptions = []

        //disable shooting
        this.pressed = false

        //reset direction
        this.direction = new Vector()

        // "push" the player out of the character
        this.position = this.position.add(collision)

        //TODO: display textbox and call bindEvents after finishing
    }
}

export { Player }