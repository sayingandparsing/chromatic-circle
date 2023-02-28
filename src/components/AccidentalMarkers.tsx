import {calculateVertexes, vertexesToPath, SegmentAngles} from '../util/pathCalculation'
import { sharpColor, flatColor } from '../constants/colors'
import {flatSharpMarkerWidth} from '../constants/sizing'

export interface AccidentalProps {
    isSharp: boolean
    innerD: number
    outerD: number
    angles: SegmentAngles
}
export function AccidentalMarkers(props: AccidentalProps) {
    
    function createSegPath(innerD: number, outerD: number) {
        const vtxs = calculateVertexes({start: props.angles.start, end: props.angles.end}, innerD, outerD)
        const path = vertexesToPath(vtxs, innerD, outerD)
        return path
    }
    
    const topBarPath = createSegPath(props.outerD - flatSharpMarkerWidth, props.outerD)
    const bottomBarPath = createSegPath(props.innerD, props.innerD + flatSharpMarkerWidth)
    return (
        <g>
            <path d={topBarPath} fill={(props.isSharp) ? sharpColor : flatColor} />
            <path d={bottomBarPath} fill={(props.isSharp) ? sharpColor : flatColor} />
        </g>
        )

}