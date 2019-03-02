// fade an element in or out with the specified animation length and a frame length in milliseconds
export default function fade(
    element: HTMLElement, length: number, isFadeIn: boolean, frameLength: number = 50): Promise<void> {
    // amount of fade per frame
    const step = frameLength / length
    // opacity of the element
    let opacity = 0
    // promisify
    return new Promise((resolve, _reject) => {
        // set up initial opacity
        opacity = isFadeIn ? 0 : 1
        // start loop
        let interval = setInterval(() => {
            // set element's opacity
            element.style.opacity = opacity.toString()
            // check if the fade finished
            if (isFadeIn ? opacity >= 1 : opacity <= 0) {
                // stop the loop
                clearInterval(interval)
                // set the opacity to the target
                element.style.opacity = isFadeIn ? '1' : '0'
                // finish the promise
                resolve()
            } else {
                // change the opacity by a step
                opacity += step * (isFadeIn ? 1 : -1)
            }
        }, frameLength)
    })
}