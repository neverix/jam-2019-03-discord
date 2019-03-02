import { loadCanvas } from "./assets"
import * as mainloop from "mainloop.js"
import Camera from "./camera"

// start the game
export function start(rootElement: HTMLElement = document.body) {
    // load canvas
    const canvas = loadCanvas(rootElement)
    const ctx = canvas.getContext("2d")

    // camera
    const camera = new Camera()

    // set up game state update and drawing
    mainloop.setUpdate((delta) => {
        // state update
        camera.update(delta)
    }).setDraw(() => {
        // drawing
        // clear
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // move a bit
        ctx.save()
        ctx.translate(canvas.width / 2, canvas.height / 2)

        // camera
        camera.draw(ctx)

        // background
        ctx.fillStyle = "#ffffff"
        ctx.beginPath()
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // gradient
        var grd = ctx.createLinearGradient(0, 0, canvas.width / 2, 0)
        grd.addColorStop(0, "red")
        grd.addColorStop(1, "white")

        // Fill with gradient
        ctx.beginPath()
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // restore position
        ctx.restore()
    }).start()
}