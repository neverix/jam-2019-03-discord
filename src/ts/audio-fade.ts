import { interval } from "rxjs";

function audioFade(audio: HTMLAudioElement, frameCount: number, totalLength: number, start: number, end: number): Promise<number> {
    return new Promise((res, rej) => {
        if (start == 0) audio.play()

        // audio.volume = start
        const step = (start - end) / frameCount
        const sign = (start > end) ? -1 : 1

        let last = start
        
        const subscription = interval(totalLength / frameCount).subscribe(e => {
            last -= step

            //be sure it in the good range
            if (last < 0)
                audio.volume = 0
            else if (last > 1)
                audio.volume = 1
            else
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