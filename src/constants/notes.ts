import { DH_UNABLE_TO_CHECK_GENERATOR } from 'constants'
import {colors} from './colors'

export interface Note {
    name: string
    color: string
    sharpName?: string
    sharpColor?: string
    isSharp?: boolean
}


export const noteDefs: Note[] = [
    {
        name: 'C',
        color: colors.yellow
    },
    {
        name: 'Db',
        color: colors.orange,
        sharpName: 'C#',
        sharpColor: colors.yellow
    },
    {
        name: 'D',
        color: colors.orange
    },
    {
        name: 'Eb',
        color: colors.blue,
        sharpName: 'D#',
        sharpColor: colors.orange
    },
    {
        name: 'E',
        color: colors.blue
    },
    {
        name: 'F',
        color: colors.pink
    },
    {
        name: 'Gb',
        color: colors.green,
        sharpName: 'F#',
        sharpColor: colors.pink
    },
    {
        name: 'G',
        color: colors.green
    },
    {
        name: 'Ab',
        color: colors.purple,
        sharpName: 'G#',
        sharpColor: colors.green
    },
    {
        name: 'A',
        color: colors.purple
    },
    {
        name: 'Bb',
        color: colors.brown,
        sharpName: 'A#',
        sharpColor: colors.purple
    },
    {
        name: 'B',
        color: colors.brown
    }
]