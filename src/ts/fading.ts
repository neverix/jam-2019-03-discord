// fade an element in or out with the specified animation length and a frame length in milliseconds
export default function fade(
    element: HTMLElement, length: number, isFadeIn: boolean, frameLength: number = 50, target: number = 0,start:number = 0): Promise<void> {
    // amount of fade per frame
    const step = frameLength / length
    // opacity of the element
    let opacity = 0
    // promisify
    return new Promise((resolve, _reject) => {
        // set up initial opacity
        opacity = isFadeIn ? start : (1 - start)
        // start loop
        let interval = setInterval(() => {
            // set element's opacity
            element.style.opacity = opacity.toString()
            // check if the fade finished
            if (isFadeIn ? opacity >= (1 - target) : opacity <= target) {
                // stop the loop
                clearInterval(interval)
                // set the opacity to the target
                element.style.opacity = isFadeIn ? `${1 - target}` : target.toString()
                // finish the promise
                resolve()
            } else {
                // change the opacity by a step
                opacity += step * (isFadeIn ? 1 : -1)
            }
        }, frameLength)
    })
}