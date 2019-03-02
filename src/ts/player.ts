import Vector from "./vector";
import { Observable, fromEvent } from "rxjs";
import {Key} from "ts-keycode-enum";

//main player class
class Player {
    //keep track of direction
    direction = new Vector(0,0)

    //multiplied with the direction and delta to get the speed
    speedMultiplier = 1

    //takes position ans size as arguments
    constructor(public position: Vector = new Vector(0, 0),
        public size: Vector = new Vector(100, 100)) {

        //set up events
        fromEvent(document, "keydown")
            .subscribe((e:KeyboardEvent) => {
                if (e.which == Key.A || e.which == Key.LeftArrow) this.direction.x = -1
                else if (e.which == Key.D || e.which == Key.RightArrow) this.direction.x = 1
                else if (e.which == Key.W || e.which == Key.UpArrow) this.direction.y = -1
                else if (e.which == Key.S || e.which == Key.DownArrow) this.direction.y = 1
            })
        fromEvent(document,"keyup")
            .subscribe((e:KeyboardEvent) => {
                if ((e.which == Key.A || e.which == Key.LeftArrow) && this.direction.x == -1) this.direction.x = 0
                else if ((e.which == Key.D || e.which == Key.RightArrow) && this.direction.x == 1) this.direction.x = 0
                else if ((e.which == Key.W || e.which == Key.UpArrow ) && this.direction.y == -1) this.direction.y = 0
                else if ((e.which == Key.S || e.which == Key.DownArrow) && this.direction.y == 1) this.direction.y = 0
            })
    }
    //delta passed from mainloops update
    update(delta:number){
        // console.log(this.position.x,this.direction.x);
        
        //moves the player
        this.position = this.position.add(this.direction.mul(delta * this.speedMultiplier))
    }
    //draws
    draw(ctx:CanvasRenderingContext2D){
        //placeholder for art
        //also , do u know any way to make spread operator (...) work in ts?
        ctx.fillStyle = "blue";
        ctx.fillRect(this.position.x,this.position.y,this.size.x,this.size.y);
    }

}

export {Player}