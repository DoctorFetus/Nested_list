import {createSlice} from "@reduxjs/toolkit";

export type TasksType = {
    title: string
    description: string
    isDone: boolean
    parentId: string
}

const slice = createSlice({
    name: 'tasks',
    initialState: {},
    reducers: {

    }
})

export const tasksReducer = slice.reducer