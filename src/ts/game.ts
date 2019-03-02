import { loadCanvas } from "./assets"
import * as mainloop from "mainloop.js"

// start the game
export function start(rootElement: HTMLElement = document.body) {
    // load canvas
    const canvas = loadCanvas(rootElement)
    const ctx = canvas.getContext("2d")

    // set up game state update and drawing
    mainloop.setUpdate((delta) => {
        // state update
    }).setDraw(() => {
        // drawing
        // move a bit
        ctx.save()
        ctx.translate(canvas.width / 2, canvas.height / 2)

        // background
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // gradient
        var grd = ctx.createLinearGradient(0, 0, canvas.width / 2, 0)
        grd.addColorStop(0, "red")
        grd.addColorStop(1, "white")

        // Fill with gradient
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // restore position
        ctx.restore()
    }).start()
}