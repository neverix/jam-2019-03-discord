// load image
function loadImage(path: string): HTMLImageElement {
    const img = new Image()
    img.src = path
    return img
}

// load audio
function loadAudio(path: string): HTMLAudioElement {
    return new Audio(path)
}

// load canvas
function loadCanvas(rootElement: HTMLElement): HTMLCanvasElement {
    // create canvas if it doesn't exist
    if (document.getElementsByTagName("canvas").length == 0) {
        const canvas = <HTMLCanvasElement>document.createElement("canvas")
        canvas.id = "canvas"
        rootElement.appendChild(canvas)
    }
    // get the canvas and set it up
    const canvas = <HTMLCanvasElement>document.getElementById("canvas")
    canvas.style.display = "block"
    // position and scale the canvas
    scaleCanvas(canvas)
    // intercept resize events
    window.onresize = (_e) => {
        // rescale the canvas on resize
        scaleCanvas(canvas)
    }
    return canvas
}

// (re)scale canvas
function scaleCanvas(canvas: HTMLCanvasElement) {
    // apply the scale
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

// hide canvas
function hideCanvas(canvas: HTMLCanvasElement) {
    if (canvas) canvas.style.display = "none"
}

export { loadImage, loadAudio, loadCanvas, hideCanvas }