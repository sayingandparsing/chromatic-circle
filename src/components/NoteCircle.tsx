import { calculateAngles, createPaths } from '../util/pathCalculation'
import { Note, noteDefs } from '../constants/notes'
import { AccidentalMarkers } from './AccidentalMarkers'
import { Segment } from './Segment'
import { CirclePosition } from '../store/noteCircleSlice'
import { useAppSelector } from '../store/hooks'

export interface NoteCircleProps {
    position: CirclePosition
    innerD: number
    outerD: number
}

export function NoteCircle(props: NoteCircleProps) {
    const notes = useAppSelector(state => state.noteCircle.activeNotes[props.position])
    const isVisible = useAppSelector(state => state.noteCircle.circleVisibility[props.position])

    let allAngles = calculateAngles(noteDefs.length)
    allAngles = allAngles.map(({ start, end }) => { return { start: start + 0.4, end: end - 0.4 }})
    const innerD = props.innerD
    const outerD = props.outerD
    // const isSharp = false
    const activeSet = new Set(notes.map(x => x.toLowerCase()))
    let elem = <g></g>
    if (isVisible) {
        elem = (
            <g>
                {noteDefs.map((info, i) => {
                    let active = false
                    let isSharp = false
                    if (activeSet.has(info.name.toLowerCase())) {
                        active = true
                    }
                    else if (info.sharpName && activeSet.has(info.sharpName.toLowerCase())) {
                        active = true
                        isSharp = true
                    }
                    const angles = allAngles[i]
                    if (active && info.sharpName) {
                        return (
                            <g>
                                <Segment
                                    color={(isSharp && info.sharpColor) ? info.sharpColor : info.color}
                                    active={active}
                                    innerD={innerD}
                                    outerD={outerD}
                                    angles={angles}//.start}
                                />
                                <AccidentalMarkers
                                    isSharp={isSharp}
                                    innerD={innerD}
                                    outerD={outerD}
                                    angles={angles}
                                ></AccidentalMarkers>
                            </g>
                        )
                    } else {
                        return (<Segment
                            color={(isSharp && info.sharpColor) ? info.sharpColor : info.color}
                            active={active}
                            innerD={innerD}
                            outerD={outerD}
                            angles={angles}//.start}
                        //endAng={allAngles[i].end}
                        />)
                    }
                    // return <Dv str='boo'/>
                })}
            </g>
        )
    }
    return elem
}
