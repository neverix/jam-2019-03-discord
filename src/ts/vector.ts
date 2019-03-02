export default class Vector {
    x: number
    y: number

    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }

    add(other: Vector) {
        return new Vector(this.x + other.x, this.y + other.y)
    }

    sub(other: Vector) {
        return new Vector(this.x - other.x, this.y - other.y)
    }

    mul(other: number) {
        return new Vector(this.x * other, this.y * other)
    }


    div(other: number) {
        return new Vector(this.x / other, this.y / other)
    }

    get len() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    }

    // normalize
    norm() {
        // cache length
        let len = this.len
        // check for zero division
        if (len == 0) return new Vector(0, 0)
        return this.div(this.len)
    }
}