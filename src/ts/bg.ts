//placeholder for the word (bg isnt a good name, more like floor)
export function bg(size: number) {
    return {
        draw: function (ctx: CanvasRenderingContext2D) {
            ctx.fillStyle = "white"
            ctx.fillRect(-size, -size, 2 * size, 2 * size)
        },
        update:() => {}
    }
}