import Vector from "./vector"

// checks collision between rectangles
function rectCollision(p1: Vector, p2: Vector, s1: Vector, s2: Vector): boolean {
    return Math.abs(p1.x - p2.x) < s1.x / 2 + s2.x / 2
        && Math.abs(p1.y - p2.y) < s1.y / 2 + s2.y / 2
}

// checks collision between circles
function circleCollision(p1: Vector, p2: Vector, r1: number, r2: number): boolean {
    return p1.sub(p2).len < r1 / 2 + r2 / 2
}

export { rectCollision, circleCollision }