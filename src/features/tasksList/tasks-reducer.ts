import {createSlice} from "@reduxjs/toolkit";

export type TasksType = {
    title: string
    description: string
    isDone: boolean
    children: TasksType[] | null
    id: string
}

const initialState: TasksType[] = [
    {
        id: '1',
        title: 'Task 1',
        isDone: false,
        description: '',
        children: [
            {
                id: '2',
                title: 'Task 1.1',
                isDone: false,
                description: '',
                children: null
            },
            {
                id: '4',
                title: 'Task 1.2',
                isDone: false,
                description: '',
                children: [
                    {
                        id: '5',
                        title: 'Task 1.2.1',
                        isDone: false,
                        description: '',
                        children: null
                    }
                ]
            },
        ]
    },
    {
        id: '3',
        title: 'Task 2',
        isDone: false,
        children: null,
        description: ''
    }


]

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {

    }
})

export const tasksReducer = slice.reducer