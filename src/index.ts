import { loadCanvas } from "./assets"
import * as mainloop from "mainloop.js"

// start the game
function start() {
    // wanted size
    const widthWanted = 500
    const heightWanted = 400

    // load canvas
    const canvas = loadCanvas(widthWanted, heightWanted)
    const ctx = canvas.getContext("2d")

    // set up game state update and drawing
    mainloop.setUpdate((delta) => {
        // state update
    }).setDraw(() => {
        // drawing
        // background
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }).start()
}

// start the game
start()