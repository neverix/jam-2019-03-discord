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
function loadCanvas(widthWanted: number, heightWanted: number): HTMLCanvasElement {
    // create canvas if it doesn't exist
    if (document.getElementsByTagName("canvas").length == 0) {
        const canvas = document.createElement("canvas")
        canvas.id = "canvas"
        document.body.appendChild(canvas)
    }
    // get the canvas and set it up
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    canvas.style.position = "absolute"
    canvas.style.display = "block"
    // position and scale the canvas
    positionAndScaleCanvas(canvas, widthWanted, heightWanted)
    // intercept resize events
    window.onresize = (e) => {
        // resize the canvas on resize
        positionAndScaleCanvas(canvas, widthWanted, heightWanted)
    }
    return canvas
}

// like getCanvasScaleAndPosition, but imperative and uses actual window size
function positionAndScaleCanvas(canvas: HTMLCanvasElement, wantedWidth: number, wantedHeight: number) {
    // get position and scale
    let { w: width, h: height, x: leftOffset, y: topOffset } = getCanvasScaleAndPosition(
        wantedWidth,
        wantedHeight,
        window.innerWidth,
        window.innerHeight
    )
    // apply the position and scale
    canvas.width = width
    canvas.height = height
    canvas.style.left = `${leftOffset}px`
    canvas.style.top = `${topOffset}px`
}

// get scale and position of canvas
function getCanvasScaleAndPosition(
    wantedWidth: number,
    wantedHeight: number,
    windowWidth: number,
    windowHeight: number): {
        w: number,
        h: number,
        x: number,
        y: number
    } {
    // calculate actual size
    let width = windowWidth
    let height = wantedHeight * width / wantedWidth
    if (height > windowHeight) {
        height = windowHeight
        width = wantedWidth * height / wantedHeight
    }
    // calculate offset
    const leftOffset = (windowWidth - width) / 2
    const topOffset = (windowHeight - height) / 2
    // format the output
    return {
        w: width,
        h: height,
        x: leftOffset,
        y: topOffset
    }
}

// hide canvas
function hideCanvas() {
    let canvas = document.getElementById("canvas")
    if (canvas) canvas.style.display = "none"
}

export { loadImage, loadAudio, loadCanvas, hideCanvas }