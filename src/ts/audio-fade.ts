import { interval } from "rxjs";

function audioFade(audio: HTMLAudioElement, frameCount: number, totalLength: number, start: number, end: number): Promise<number> {
    return new Promise((res, rej) => {
        // audio.volume = start
        const step = (start - end) / frameCount
        const sign = (start > end) ? -1 : 1

        let last = start

        console.log(step)

        const subscription = interval(totalLength / frameCount).subscribe(e => {
            console.log(last);

            last -= step
            if (last > 0)
                audio.volume = last

            if (last * sign > end * sign) {
                audio.volume = end
                subscription.unsubscribe()
                res(audio.volume)
            }
        })
    })
}

export { audioFade }