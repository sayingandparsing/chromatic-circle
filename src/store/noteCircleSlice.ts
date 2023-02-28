
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export type CirclePosition = 'primary' | 'outer' | 'inner'

interface NoteCircleState {
    activeNotes: {
        primary: string[],
        outer: string[],
        inner: string[]
    }
    circleVisibility: {
        primary: boolean,
        outer: boolean,
        inner: boolean
    }
}

const initialState: NoteCircleState = {
    activeNotes: {
        primary: [],
        outer: [],
        inner: []
    },
    circleVisibility: {
        primary: true,
        outer: false,
        inner: false
    }
}



export const noteCircleSlice = createSlice({
    name: 'noteCircle',
    initialState: initialState,
    reducers: {
        updateNotes: (
            state: NoteCircleState,
            action: PayloadAction<{
                circle: CirclePosition,
                notes: string[]
            }>
        ) => {
            state.activeNotes[action.payload.circle] = action.payload.notes
            state.circleVisibility[action.payload.circle] = true
        },
        updateMultiple: (
            state: NoteCircleState,
            action: PayloadAction<{
                primary: string[],
                inner?: string[]
                outer?: string[]
            }>
        ) => {
            state.activeNotes.primary = action.payload.primary
            if (action.payload.inner) {
                state.activeNotes.inner = action.payload.inner
                state.circleVisibility.inner = true
            } else
                state.circleVisibility.inner = false
            if (action.payload.outer) {
                state.activeNotes.outer = action.payload.outer
                state.circleVisibility.outer = true
            } else
                state.circleVisibility.outer = false
        }
    }
})

export const { updateNotes, updateMultiple } = noteCircleSlice.actions

export const selectActiveNotes = (
    state: NoteCircleState,
    circle: CirclePosition
) => {
    return state.activeNotes[circle]
}

export default noteCircleSlice.reducer