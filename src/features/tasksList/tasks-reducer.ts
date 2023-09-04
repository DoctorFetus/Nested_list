import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {findTaskById} from "../../common/utils/findTaskById.ts";
import {v1, v1 as uuidv1} from 'uuid';

export type TasksType = {
    title: string
    description: string
    isDone: boolean
    children: TasksType[]
    id: string
}

type initialStateType = {
    tasks: TasksType[],
    currentTask: TasksType | null
}

const initialState: initialStateType = {
    tasks: [
        {
            id: v1(),
            title: 'Task 1',
            isDone: false,
            description: 'This is a description for Task 1',
            children: [
                {
                    id: v1(),
                    title: 'Task 1.1',
                    isDone: false,
                    description: 'This is a description for Task 1.1',
                    children: []
                },
                {
                    id: v1(),
                    title: 'Task 1.2',
                    isDone: false,
                    description: 'This is a description for Task 1.2',
                    children: [
                        {
                            id: v1(),
                            title: 'Task 1.2.1',
                            isDone: false,
                            description: 'This is a description for Task 1.2.1',
                            children: []
                        }
                    ]
                },
            ]
        },
        {
            id: v1(),
            title: 'Task 2',
            isDone: false,
            children: [],
            description: 'This is a description for Task 2'
        }


    ],
    currentTask: null
}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<{ newTitle: string, id: string | null }>) => {

            const {id, newTitle} = action.payload
            const newTask =
                {
                    id: v1(),
                    description: '',
                    title: newTitle,
                    children: [],
                    isDone: false
                }
            if (id) {
                const parentTask = findTaskById(state.tasks, id);
                if (parentTask) {
                    parentTask.children.push(newTask);

                }
            } else {
                state.tasks.push(newTask)
            }

        },

        setCurrentTask: (state, action: PayloadAction<{ id: string }>) => {
            const newCurrent = findTaskById(state.tasks, action.payload.id);
            state.currentTask = newCurrent
        },
        changeTaskStatus: (state, action: PayloadAction<{ id: string }>) => {
            const task = findTaskById(state.tasks, action.payload.id)
            if (task) task.isDone = !task.isDone
        },
        updateTask: (state, action: PayloadAction<{ title: string, descr: string, id: string }>) => {
            const {title, descr, id} = action.payload
            let task = findTaskById(state.tasks, id)
            if (task) {
                task.title = title
                task.description = descr
                state.currentTask = task
            }

        }
    }
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions