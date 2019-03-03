/* View in fullscreen */
function openFullscreen(): Promise<any> {
    return new Promise((res, rej) => {
        if (document.documentElement.requestFullscreen)
            return document.documentElement.requestFullscreen().then(
                data => res(data)
            ).catch(
                data => rej(data)
            );
        else
            rej("Full screen is not avabile")
    })
}

/* Close fullscreen */
function closeFullscreen(): Promise<any> {
    return new Promise((res, rej) => {
        if (document.exitFullscreen)
            return document.exitFullscreen().then(
                data => res(data)
            ).catch(
                data => rej(data)
            )
        else
            rej("Full screen is not avabile")
    })
}

export { closeFullscreen, openFullscreen }