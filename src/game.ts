import { loadCanvas } from "./assets"
import * as mainloop from "mainloop.js"

// start the game
export function start(rootElement: HTMLElement = document.body) {
    // wanted size
    const widthWanted = 500
    const heightWanted = 400

    // load canvas
    const canvas = loadCanvas(widthWanted, heightWanted, rootElement = rootElement)
    const ctx = canvas.getContext("2d")

    // set up game state update and drawing
    mainloop.setUpdate((delta) => {
        // state update
    }).setDraw(() => {
        // drawing

        // set scale
        ctx.save()
        ctx.scale(canvas.width / widthWanted, canvas.height / heightWanted)

        // background
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // gradient
        var grd = ctx.createLinearGradient(0, 0, 500, 0);
        grd.addColorStop(0, "red");
        grd.addColorStop(1, "white");

        // Fill with gradient
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 500, 400);

        // restore scale
        ctx.restore()
    }).start()
}