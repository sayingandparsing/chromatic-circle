
// @ts-ignore
import * as teoria from 'teoria'
import { noteDefs } from '../constants/notes'
import { useAppDispatch } from '../store/hooks'
import { CirclePosition, updateNotes } from '../store/noteCircleSlice'

const modes = new Set(
    ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian'])

const modeAbbrevs = new Map(
    Array.from(modes)
        .map(fullname => {
            const shortened = fullname.substr(0, 3)
            return [shortened, fullname]
        })
)
    
const circleNums: Map<number, CirclePosition> = new Map([
    [0, 'primary'],
    [1, 'inner'],
    [2, 'outer']
])


interface NoteUpdates {
    primary: string[]
    inner?: string[]
    outer?: string[]
}


export function interpretInput(input: any): NoteUpdates {
    console.log(typeof input)
    console.log(input)
    const requests: string[] = input.split(',')
    const noteSets: string[][] = requests.map(processRequest)
    const updates: NoteUpdates = {primary:[]}
    noteSets.forEach((noteSet, i) => {
        if (i > 2)
            return
        // @ts-ignore
        const position: CirclePosition = circleNums.get(i)
        updates[position] = noteSet
    })
    return updates
}


function processRequest(request: string) {
    try {
        console.log('Processing: '+request)
        let isMode = false
        let prevToken: string | null = null
        let noteName: string = ''
        let modeName: string = ''
        for (let token of request.split(' ')) {
            token = token.toLowerCase().trim()
            if (token === 'chrom#') {
                return noteDefs.map(x => (x.sharpName) ? x.sharpName : x.name)
            } else if (token === 'chromb') {
                return noteDefs.map(x=>x.name)
            }
            if (modes.has(token)) {
                if (!prevToken)
                    continue
                isMode = true
                noteName = prevToken
                modeName = token
            } else if (modeAbbrevs.has(token)) {
                if (!prevToken)
                    continue
                isMode = true
                let fullname = modeAbbrevs.get(token) || token
                noteName = prevToken
                modeName = fullname
            }
            prevToken = token
        }
        if (isMode) {
            return teoria
                .note(noteName)
                .scale(modeName)
                .simple()
        }
        return teoria.chord(request.trim()).simple()
    } catch (e) {
        console.log(e)
        return []
    }
}