
import { inactiveColor } from '../constants/colors'
import { SegmentAngles, calculateVertexes, vertexesToPath } from '../util/pathCalculation'


interface SegmentProps {
    color: string
    active: boolean
    innerD: number
    outerD: number
    angles: SegmentAngles
}



export function Segment(
    props: SegmentProps
) {
// export function Segment(props: SegmentProps) {

    function createSegPath(innerD: number, outerD: number) {
        const vtxs = calculateVertexes(props.angles, innerD, outerD)
        const path = vertexesToPath(vtxs, innerD, outerD)
        return path
    }
    const mainSegPath = createSegPath(props.innerD, props.outerD)
    const elems = [
            <path d={mainSegPath} fill={(props.active) ? props.color : inactiveColor} />
    ]
    

    return (
        <g>
            {elems}
        </g>
    )
}