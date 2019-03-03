import Vector from "./vector"

// checks collision between rectangles
function rectCollision(p1: Vector, p2: Vector, s1: Vector, s2: Vector): Vector | false {
    // there is a collision
    if (Math.abs(p1.x - p2.x) < s1.x / 2 + s2.x / 2
        && Math.abs(p1.y - p2.y) < s1.y / 2 + s2.y / 2) {
        // the collision is on the horizontal sides
        if (Math.abs(p1.x - p2.x) > Math.abs(p1.y - p2.y)) {
            return new Vector(p2.x / 4 - p1.x / 4)
        }
        // the collision is on the vertical sides
        return new Vector(0, p2.y / 4 - p1.y / 4)
    } else {
        // there is no collision
        return false
    }
}

// checks collision between circles
function circleCollision(p1: Vector, p2: Vector, r1: number, r2: number): boolean {
    return p1.sub(p2).len < r1 / 2 + r2 / 2
}

export { rectCollision, circleCollision }