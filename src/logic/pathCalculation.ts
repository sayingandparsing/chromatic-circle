export interface SegmentAngles {
    start: number
    end: number
}

export function calculateAngles(numItems: number, centerFirst: boolean = true) {
    const segRotation = 360 / numItems
    let segStart
    if (centerFirst)
        segStart = 360 - (segRotation / 2) - 90
    else
        segStart = 360 - 90
    const angles: SegmentAngles[] = []
    for (let i = 0; i < numItems; i++) {
        let newEnd: number = segStart + segRotation
        if (newEnd > 360) {
            newEnd = newEnd - 360
        }
        let segAngles = {
            start: segStart,
            end: segStart+segRotation
        }
        angles.push(segAngles)
        segStart = newEnd
    }
    return angles
}

export interface Point {
    x: number
    y: number
}


function calculateCoords(radians: number, hypotenuse: number): Point {
    return {
        x: Math.cos(radians) * hypotenuse,
        y: Math.sin(radians) * hypotenuse
    }
}

interface SegmentVertexes {
    bottomLeft: Point
    topLeft: Point
    bottomRight: Point
    topRight: Point
}

export function calculateVertexes(
    angles: SegmentAngles, innerD: number, outerD: number
): SegmentVertexes {
    const startRad = angles.start * Math.PI / 180
    const endRad = angles.end * Math.PI / 180

    return {
        bottomLeft: calculateCoords(startRad, innerD),
        topLeft: calculateCoords(startRad, outerD),
        bottomRight: calculateCoords(endRad, innerD),
        topRight: calculateCoords(endRad, outerD)
    }
}

export function vertexesToPath(vertexes: SegmentVertexes, innerD: number, outerD: number): string {
    const str = (coord: Point) => `${coord.x},${coord.y}`
    const topArc = `A ${outerD} ${outerD} 0 0 1 ${str(vertexes.topRight)}`
    const bottomArc = `A ${innerD} ${innerD} 0 0 0 ${str(vertexes.bottomLeft)}`
    return ['M'+str(vertexes.topLeft), topArc, 'L'+str(vertexes.bottomRight), bottomArc, 'Z'].join('\n')
}

export function createPaths(numItems: number, innerD: number, outerD: number) {
    const angles = calculateAngles(numItems)
    const vertexes = angles.map(ang => calculateVertexes(ang, innerD, outerD))
    const paths = vertexes.map(vtxs => vertexesToPath(vtxs, innerD, outerD))
    return paths
}