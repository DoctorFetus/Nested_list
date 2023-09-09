import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {tasksActions} from "../../features/TasksList/model/tasks-reducer.ts";

const slice = createSlice({
    name: 'app',
    initialState: {
        chooseMode: false,
        theme: 'light' as themeType
    },
    reducers: {
        setChooseMode: (state, action: PayloadAction<{isChooseMode: boolean}>) => {
            state.chooseMode = action.payload.isChooseMode
        },
        setTheme: (state, action) => {
            state.theme = (state.theme === 'light') ? 'dark' : 'light'
        }
    },
    extraReducers: builder =>
        builder.addCase(tasksActions.deleteTasks, (state, action) => {
            state.chooseMode = false
        })
})

export const appReducer = slice.reducer
export const appActions = slice.actions

export type themeType = 'dark' | 'light'