
import { configureStore } from '@reduxjs/toolkit'
import noteCircleReducer from './noteCircleSlice'

import logger from 'redux-logger'

export const store = configureStore({
    reducer: {
        noteCircle: noteCircleReducer
    },
    middleware: [logger]
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch