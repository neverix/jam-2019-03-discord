import { loadCanvas } from "./assets"
import * as mainloop from "mainloop.js"
import Vector from "./vector"
import Camera from "./updateable/camera"
import { Player } from "./updateable/player"
import { bg } from "./updateable/bg"
import Characters from "./updateable/characters"
import { zipAll } from "rxjs/operators";
import { MapLoader } from "./updateable/map";

// start the game
export function start(rootElement: HTMLElement = document.body) {
    // load canvas
    const canvas = loadCanvas(rootElement)
    const ctx = canvas.getContext("2d")

    // world size
    const worldSize = 300
    // player
    const player = new Player(new Vector(), new Vector(30, 30), worldSize)
    // camera
    const camera = new Camera()
    // characters
    const characters = new Characters(worldSize, player, 5)

    const test = new MapLoader("/maps/map1.js", worldSize)

    //to update
    const updateable = [camera, bg(worldSize), test, player, characters]

    //enablt night 
    // document.getElementById("night").style.display = "block"

    // set up game state update and drawing
    mainloop.setUpdate((delta: number) => {
        for (let i of updateable) {
            if (i.update) {
                i.update(delta)
            }
        }
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
        for (let i of updateable) {
            if (i.draw) {
                i.draw(ctx)
            }
        }

        // restore position
        ctx.restore()
    }).start()
}