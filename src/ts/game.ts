import { loadCanvas } from "./assets"
import * as mainloop from "mainloop.js"
import Camera from "./camera"
import Vector from "./vector";
import { Player } from "./player";

// start the game
export function start(rootElement: HTMLElement = document.body) {
    // load canvas
    const canvas = loadCanvas(rootElement)
    const ctx = canvas.getContext("2d")

    const player = new Player(new Vector(),new Vector(30,30))

    // camera
    const camera = new Camera()

    //to update
    const updateable = [camera,player];

    // set up game state update and drawing
    mainloop.setUpdate((delta:number) => {
        updateable.forEach((val) => val.update(delta));
    }).setDraw(() => {
        // drawing
        // clear
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // move to center of screen
        ctx.save()
        ctx.translate(canvas.width / 2, canvas.height / 2)

        //move the camera after the player
        camera.target = player.position

        //draw all objects wich have a draw method
        for (let i of updateable)
            if (i.draw) i.draw(ctx)

        ctx.fillStyle = "#ffff00";
        ctx.fillRect(100,100,160,150);

        // restore position
        ctx.restore()
    }).start()
}