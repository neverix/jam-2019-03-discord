import Vector from "../vector";

declare function require<T>(file: string): T


//interfacefor a map layer
interface Layer {
    [key: string]: any
    data: Array<53 | 1>
}

//interface for a tilemap imported from tiled
interface TileMap {
    [key: string]: any
    height: number
    width: number
    layers: Layer[]
}

//main class
class MapLoader {
    //we would replace this with textures
    colors = {
        53: "blue",
        1: "yellow",
        2: "green"
    }
    //the map imported from tiled
    map: TileMap;
    //th size of a tile
    scale: Vector;
    //the distance to the walls
    size: number
    constructor(path: string, size: number) {
        //load the map
        this.map = require<any>("../maps/map1")

        //the size of the world
        this.size = 2 * size

        //the size of a tile
        this.scale = new Vector(this.size / this.map.width, this.size / this.map.height)
    }
    draw(ctx: CanvasRenderingContext2D) {
        //iterate trought all the tilse
        for (let i = 0; i < this.map.layers[0].data.length; i++) {
            //find the positions
            const x = i % this.map.width
            const y = Math.floor(i / this.map.width)

            //draw them
            ctx.fillStyle = this.colors[this.map.layers[0].data[i]]
            ctx.fillRect(x * this.scale.x - this.size / 2, y * this.scale.y - this.size / 2, this.scale.x, this.scale.y)
        }
    }
    update(delta: number) { }
}

export { MapLoader }